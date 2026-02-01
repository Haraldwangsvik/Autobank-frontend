import React from "react";
import ReceiptRow from "./ReceiptRow";
import { Receipt_Info } from "../../api/adminReceiptAPI";
import { Oval } from "react-loader-spinner";

interface ReceiptTableProps {
  receipts: Receipt_Info[] | undefined;
  receiptsLoading: boolean;
  receiptStatus: String | undefined | null;
  setReceiptStatus: (status: string | null) => void;
}

const ReceiptTable = ({
  receipts,
  receiptsLoading,
  receiptStatus,
  setReceiptStatus,
}: ReceiptTableProps) => {
  const selectedButton =
    receiptStatus === "NONE"
      ? "active"
      : receiptStatus === "DONE"
        ? "history"
        : "none";

  const handleSetActive = () => {
    setReceiptStatus(receiptStatus === "NONE" ? null : "NONE");
  };

  const handleSetHistory = () => {
    setReceiptStatus(receiptStatus === "DONE" ? null : "DONE");
  };

  const sortedReceipts = React.useMemo(() => {
    if (!receipts) return [];
    return [...receipts].sort(
      (a, b) =>
        new Date(b.receiptCreatedAt).getTime() -
        new Date(a.receiptCreatedAt).getTime()
    );
  }, [receipts]);

  return (
    <div>
      {/* Tab Buttons */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={handleSetActive}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            selectedButton === "active"
              ? "bg-online-orange text-online-blue-900"
              : "bg-online-blue-600 text-white hover:bg-online-blue-500"
          }`}
        >
          Aktive
        </button>
        <button
          onClick={handleSetHistory}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            selectedButton === "history"
              ? "bg-online-orange text-online-blue-900"
              : "bg-online-blue-600 text-white hover:bg-online-blue-500"
          }`}
        >
          Historikk
        </button>
      </div>

      <div className="border-b border-online-blue-500/30 mb-4" />

      {/* Table Content */}
      <div className="min-h-[280px]">
        {receiptsLoading ? (
          <div className="flex justify-center items-center h-64">
            <Oval height={40} color="#F9B759" secondaryColor="#0D5474" />
          </div>
        ) : receipts && receipts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-online-blue-500/30">
                  <th className="w-12"></th>
                  <th className="text-left text-online-blue-200 text-sm font-medium py-3 hidden md:table-cell">
                    Komite
                  </th>
                  <th className="text-left text-online-blue-200 text-sm font-medium py-3">
                    Anledning
                  </th>
                  <th className="text-left text-online-blue-200 text-sm font-medium py-3 hidden lg:table-cell">
                    Type
                  </th>
                  <th className="text-left text-online-blue-200 text-sm font-medium py-3 hidden lg:table-cell">
                    Kommentar
                  </th>
                  <th className="text-center text-online-blue-200 text-sm font-medium py-3 w-24">
                    Dato
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedReceipts.map((receipt) => (
                  <ReceiptRow key={receipt.receiptId} receipt={receipt} />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex justify-center items-center h-64">
            <p className="text-online-blue-200 text-lg">
              Ingen kvitteringer a vise
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReceiptTable;
