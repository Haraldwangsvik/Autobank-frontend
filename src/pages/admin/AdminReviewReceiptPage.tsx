import React from "react";
import {
  CalendarIcon,
  UserIcon,
  PaperClipIcon,
} from "@heroicons/react/24/outline";
import {
  fetchCompleteReceipt,
  postReceiptReview,
  ReceiptReview,
} from "../../api/adminReceiptAPI";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../components/universal/Spinner";
import AdminBadge from "../../components/admin/AdminBadge";
import AttachmentViewer from "../../components/receipt/AttachmentViewer";

const AdminReviewReceiptPage = () => {
  const receiptid = useParams<{ receiptid: string }>().receiptid;
  const navigate = useNavigate();

  const { data, isError, isLoading } = useQuery({
    queryKey: ["completereceipt", receiptid],
    queryFn: () => fetchCompleteReceipt(receiptid as string),
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("no", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const [newReviewStatus, setNewReviewStatus] = React.useState("");
  const [reviewComment, setReviewComment] = React.useState("");

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const receiptreview: ReceiptReview = {
      receiptId: receiptid as string,
      status: newReviewStatus,
      comment: reviewComment,
    };

    try {
      await postReceiptReview(receiptreview);
      alert("Review sendt");
      navigate("/admin/kvittering");
    } catch (error) {
      console.error(error);
      alert("Feil ved sending av review");
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <AdminBadge className="mb-4" />
          <h1 className="text-3xl font-bold text-white">Kvitteringsdetaljer</h1>
        </div>

        {isError && (
          <div className="bg-red-500/20 border border-red-500/50 text-white p-4 rounded-lg mb-6">
            Det har oppstatt en feil. Prov a logg inn og ut, eller refresh siden.
          </div>
        )}

        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Spinner size={4} color="blue" />
            <p className="mt-4 text-online-blue-200">Laster...</p>
          </div>
        )}

        {data && (
          <div className="space-y-6">
            {/* Main Info Card */}
            <div className="bg-online-blue-600/30 backdrop-blur-sm rounded-xl border border-online-blue-500/30 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoField label="Kvittering ID" value={data.receiptId} />
                <InfoField label="Belop" value={`kr ${data.amount.toFixed(2)}`} />
                <InfoField label="Anledning" value={data.receiptName} />
                <InfoField label="Komite" value={data.committeeName} />
              </div>

              <div className="mt-6">
                <label className="block text-online-blue-200 text-sm mb-2">
                  Beskrivelse
                </label>
                <div className="bg-online-blue-700/50 rounded-lg p-4 text-white min-h-[80px]">
                  {data.receiptDescription || "Ingen beskrivelse"}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <label className="block text-online-blue-200 text-sm mb-2">
                    Sendt inn
                  </label>
                  <div className="flex items-center gap-2 bg-online-blue-700/50 rounded-lg p-4 text-white">
                    <CalendarIcon className="w-5 h-5 text-online-blue-300" />
                    <span>{formatDate(data.receiptCreatedAt)}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-online-blue-200 text-sm mb-2">
                    Bruker
                  </label>
                  <div className="flex items-center gap-2 bg-online-blue-700/50 rounded-lg p-4 text-white">
                    <UserIcon className="w-5 h-5 text-online-blue-300" />
                    <span>{data.userFullname}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <label className="block text-online-blue-200 text-sm mb-2">
                    Betalingstype
                  </label>
                  <div className="bg-online-blue-700/50 rounded-lg p-4 text-white">
                    <p className="font-semibold mb-1">
                      {data.paymentOrCard === "Card" ? "Onlinekort" : "Utlegg"}
                    </p>
                    {data.paymentOrCard === "Card" ? (
                      <p className="text-online-blue-200 text-sm">
                        Kortnummer: {data.cardCardNumber}
                      </p>
                    ) : (
                      <p className="text-online-blue-200 text-sm">
                        Kontonummer: {data.paymentAccountNumber}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-online-blue-200 text-sm mb-2">
                    Navarende status
                  </label>
                  <div className="bg-online-blue-700/50 rounded-lg p-4">
                    {data.latestReviewStatus && data.latestReviewCreatedAt ? (
                      <div>
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-2 ${
                            data.latestReviewStatus === "APPROVED"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {data.latestReviewStatus === "APPROVED"
                            ? "Godkjent"
                            : "Ikke godkjent"}
                        </span>
                        <p className="text-online-blue-200 text-sm">
                          {formatDate(data.latestReviewCreatedAt)}
                        </p>
                        {data.latestReviewComment && (
                          <p className="text-white text-sm mt-2">
                            "{data.latestReviewComment}"
                          </p>
                        )}
                      </div>
                    ) : (
                      <span className="text-online-orange">Ikke besvart</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Attachments */}
            {data.attachmentCount > 0 && (
              <div className="bg-online-blue-600/30 backdrop-blur-sm rounded-xl border border-online-blue-500/30 p-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Vedlegg ({data.attachmentCount})
                </h3>
                <div className="space-y-4">
                  {data.attachments.map((attachment, index) => {
                    const fileType = attachment.split(".")[0].replace(":", "/");
                    const base64 = attachment.split(".")[1];

                    if (fileType === "application/pdf") {
                      return (
                        <AttachmentViewer
                          key={index}
                          type="pdf"
                          src={`data:application/pdf;base64,${base64}`}
                        />
                      );
                    } else if (fileType.includes("image")) {
                      return (
                        <AttachmentViewer
                          key={index}
                          type="image"
                          src={`data:${fileType};base64,${base64}`}
                        />
                      );
                    } else {
                      return (
                        <a
                          href={`data:${fileType};base64,${base64}`}
                          key={index}
                          download
                          className="flex items-center gap-2 text-online-orange hover:text-online-orange-300"
                        >
                          <PaperClipIcon className="h-5 w-5" />
                          <span>Last ned vedlegg</span>
                        </a>
                      );
                    }
                  })}
                </div>
              </div>
            )}

            {/* Review Form */}
            <div className="bg-online-blue-600/30 backdrop-blur-sm rounded-xl border border-online-blue-500/30 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                Ny vurdering
              </h3>
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                  <label className="block text-online-blue-200 text-sm mb-2">
                    Status
                  </label>
                  <select
                    value={newReviewStatus}
                    onChange={(e) => setNewReviewStatus(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white text-online-blue-900 focus:ring-2 focus:ring-online-orange focus:outline-none"
                    required
                  >
                    <option value="">Velg status</option>
                    <option value="APPROVED">Godkjent</option>
                    <option value="DENIED">Ikke godkjent</option>
                  </select>
                </div>
                <div>
                  <label className="block text-online-blue-200 text-sm mb-2">
                    Kommentar
                  </label>
                  <textarea
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg bg-white text-online-blue-900 placeholder-gray-400 focus:ring-2 focus:ring-online-orange focus:outline-none resize-none"
                    placeholder="Legg til en kommentar..."
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-online-orange text-online-blue-900 py-3 rounded-lg font-semibold hover:bg-online-orange-400 transition-colors"
                >
                  Send vurdering
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

interface InfoFieldProps {
  label: string;
  value: string;
}

function InfoField({ label, value }: InfoFieldProps) {
  return (
    <div>
      <label className="block text-online-blue-200 text-sm mb-2">{label}</label>
      <div className="bg-online-blue-700/50 rounded-lg px-4 py-3 text-white">
        {value}
      </div>
    </div>
  );
}

export default AdminReviewReceiptPage;
