import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { fetchCommittees } from "../api/baseAPI";
import FileUpload from "../components/form/FileUpload";
import { fileToBase64 } from "../utils/fileutils";

import { submitReceipt } from "../api/formsAPI";

import { useNavigate } from "react-router-dom";
import { useAuth } from "react-oidc-context";

interface Committee {
  id: string;
  name: string;
}

interface Receipt {
  amount: number;
  committee_id: string;
  name: string;
  description: string;
  id: 0;
}

interface FormData {
  amount: number;
  committee_id: string;
  name: string;
  description: string;
  card_number?: string;
  account_number?: string;
  id: 0;
}

interface PaymentInformation {
  usedOnlineCard: boolean;
  accountnumber?: string;
  cardnumber?: string;
}

interface ReceiptRequestBody {
  receipt: Receipt;
  attachments: string[];
  receiptPaymentInformation?: PaymentInformation;
}

const ReceiptPage = () => {
  const navigate = useNavigate();

  const [usedOnlineCard, setUsedOnlineCard] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [amountInput, setAmountInput] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [cardNumber, setCardNumber] = useState("");

  const [attachments, setAttachments] = useState<File[]>([]);
  const allowedTypes = ["application/pdf", "image/png", "image/jpeg", "image/jpg"];

  const auth = useAuth();
  const { user } = auth;

  const { data, isError } = useQuery({
    queryKey: ["committees"],
    queryFn: () => fetchCommittees(),
  });

  const onFileChange = async (files: File[]) => {
    const validFiles = files.filter((file) => allowedTypes.includes(file.type));
    const invalidFiles = files.filter((file) => !allowedTypes.includes(file.type));

    if (invalidFiles.length > 0) {
      alert("Bare PDF eller bildefiler (JPG, PNG, JPEG) er tillatt. Ugyldige filer ble ignorert.");
    }

    setAttachments(validFiles);
  };

  const [formdata, setFormdata]: [FormData, any] = useState({
    amount: 0,
    committee_id: "",
    name: "",
    description: "",
    id: 0,
    card_number: "",
    account_number: "",
  });

  const [errors, setErrors] = useState({
    amount: "",
    account_number: "",
    card_number: "",
    name: "",
    committee_id: "",
    attachments: "",
  });

  const validateForm = () => {
    const newErrors: typeof errors = {
      amount: "",
      account_number: "",
      card_number: "",
      name: "",
      committee_id: "",
      attachments: "",
    };

    if (!usedOnlineCard) {
      if (!/^\d{11}$/.test(formdata.account_number || "")) {
        newErrors.account_number = "Kontonummer ma vaere 11 sifre";
      }
    }

    if (usedOnlineCard) {
      const cardNumber = formdata.card_number || "";
      if (!/^\d{16}$/.test(cardNumber)) {
        newErrors.card_number = "Kortnummer ma vaere 16 sifre";
      }
    }

    if (formdata.name.trim() === "") {
      newErrors.name = "Vennligst skriv anledning";
    }

    if (!formdata.committee_id) {
      newErrors.committee_id = "Velg en ansvarlig enhet";
    }

    if (attachments.length === 0) {
      newErrors.attachments = "Last opp minst en kvittering/vedlegg";
    }

    setErrors(newErrors);

    return Object.values(newErrors).every((e) => e === "");
  };

  const formatAccountNumber = (value: string) => {
    const digits = value.replace(/\D/g, "");
    const parts: string[] = [];

    if (digits.length > 0) parts.push(digits.substring(0, 4));
    if (digits.length > 4) parts.push(digits.substring(4, 6));
    if (digits.length > 6) parts.push(digits.substring(6, 11));

    return parts.join(" ");
  };

  const formatCardNumber = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim();
  };

  const submitform = async () => {
    if (!validateForm()) return;

    const numericAmount = parseFloat(amountInput);
    const updatedFormData = { ...formdata, amount: numericAmount };

    setDisableSubmit(true);
    const paymentInfo: PaymentInformation = {
      usedOnlineCard: usedOnlineCard,
      accountnumber: usedOnlineCard ? "" : formdata.account_number,
      cardnumber: usedOnlineCard ? formdata.card_number : "",
    };
    const receipt: Receipt = {
      amount: formdata.amount,
      committee_id: formdata.committee_id,
      name: formdata.name,
      description: formdata.description,
      id: 0,
    };
    const body: ReceiptRequestBody = {
      receipt: updatedFormData,
      attachments: await Promise.all(
        [...attachments].map(async (file) => await fileToBase64(file))
      ),
      receiptPaymentInformation: paymentInfo,
    };

    try {
      await submitReceipt(body);
      alert("Kvittering sendt inn!");
      navigate("/?receiptsubmittedsuccess=1");
    } catch (e) {
      alert("Noe gikk galt, prov igjen senere");
    }

    setDisableSubmit(false);
  };

  return (
    <div className="min-h-screen pb-24">
      <div className="max-w-2xl mx-auto px-6">
        {/* Header */}
        <div className="text-center pt-12 pb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Kvitteringsskjema
          </h1>
          <p className="text-online-blue-200">
            Fyll ut informasjonen under for a sende inn din kvittering
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-online-blue-600/30 backdrop-blur-sm rounded-xl border border-online-blue-500/30 p-6 md:p-8">
          {/* Card Type Selection */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">
              Kort brukt til kjopet
            </h2>
            <div className="flex gap-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="receiptcard"
                  defaultChecked
                  onClick={() => setUsedOnlineCard(false)}
                  className="w-5 h-5 accent-online-orange"
                />
                <span className="text-white">Eget kort</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="receiptcard"
                  onClick={() => setUsedOnlineCard(true)}
                  className="w-5 h-5 accent-online-orange"
                />
                <span className="text-white">Onlines bankkort</span>
              </label>
            </div>
          </div>

          {/* Own Card Form */}
          <div className={usedOnlineCard ? "hidden" : ""}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Kontonummer
                </label>
                <input
                  type="text"
                  placeholder="2345 XX XXXXX"
                  className="w-full px-4 py-3 rounded-lg bg-white text-online-blue-900 placeholder-gray-400 focus:ring-2 focus:ring-online-orange focus:outline-none"
                  value={formatAccountNumber(accountNumber)}
                  maxLength={13}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/\D/g, "");
                    setAccountNumber(raw);
                    setFormdata({ ...formdata, account_number: raw });
                  }}
                />
                {errors.account_number && (
                  <p className="text-online-orange text-sm mt-1">{errors.account_number}</p>
                )}
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Belop (kr)
                </label>
                <input
                  type="text"
                  placeholder="530"
                  className="w-full px-4 py-3 rounded-lg bg-white text-online-blue-900 placeholder-gray-400 focus:ring-2 focus:ring-online-orange focus:outline-none"
                  onChange={(e) => {
                    const raw = e.target.value.replace(/\D/g, "");
                    const value = raw.slice(0, 6);
                    setAmountInput(value);
                  }}
                  value={amountInput}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Anledning
                </label>
                <input
                  placeholder="Arbeidskveld"
                  className="w-full px-4 py-3 rounded-lg bg-white text-online-blue-900 placeholder-gray-400 focus:ring-2 focus:ring-online-orange focus:outline-none"
                  onChange={(e) => {
                    setFormdata({ ...formdata, name: e.target.value });
                  }}
                />
                {errors.name && (
                  <p className="text-online-orange text-sm mt-1">{errors.name}</p>
                )}
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Ansvarlig enhet
                </label>
                <select
                  className="w-full px-4 py-3 rounded-lg bg-white text-online-blue-900 focus:ring-2 focus:ring-online-orange focus:outline-none"
                  onChange={(e) => {
                    setFormdata({ ...formdata, committee_id: e.target.value });
                  }}
                >
                  <option value="">Velg enhet</option>
                  {data && data.length
                    ? data.map((committee: any) => (
                        <option key={committee.id} value={committee.id}>
                          {committee.name}
                        </option>
                      ))
                    : null}
                </select>
                {errors.committee_id && (
                  <p className="text-online-orange text-sm mt-1">{errors.committee_id}</p>
                )}
              </div>
            </div>
          </div>

          {/* Online Card Form */}
          <div className={!usedOnlineCard ? "hidden" : ""}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Kortnummer
                </label>
                <input
                  type="text"
                  placeholder="2345 XXXX XXXX XXXX"
                  className="w-full px-4 py-3 rounded-lg bg-white text-online-blue-900 placeholder-gray-400 focus:ring-2 focus:ring-online-orange focus:outline-none"
                  value={formatCardNumber(cardNumber)}
                  maxLength={19}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/\D/g, "");
                    setCardNumber(raw);
                    setFormdata({ ...formdata, card_number: raw });
                  }}
                />
                {errors.card_number && (
                  <p className="text-online-orange text-sm mt-1">{errors.card_number}</p>
                )}
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Belop (kr)
                </label>
                <input
                  type="text"
                  placeholder="530"
                  className="w-full px-4 py-3 rounded-lg bg-white text-online-blue-900 placeholder-gray-400 focus:ring-2 focus:ring-online-orange focus:outline-none"
                  onChange={(e) => {
                    const raw = e.target.value.replace(/\D/g, "");
                    const value = raw.slice(0, 6);
                    setAmountInput(value);
                  }}
                  value={amountInput}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Anledning
                </label>
                <input
                  placeholder="Arbeidskveld"
                  className="w-full px-4 py-3 rounded-lg bg-white text-online-blue-900 placeholder-gray-400 focus:ring-2 focus:ring-online-orange focus:outline-none"
                  onChange={(e) => {
                    setFormdata({ ...formdata, name: e.target.value });
                  }}
                />
                {errors.name && (
                  <p className="text-online-orange text-sm mt-1">{errors.name}</p>
                )}
              </div>
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Ansvarlig enhet
                </label>
                <select
                  className="w-full px-4 py-3 rounded-lg bg-white text-online-blue-900 focus:ring-2 focus:ring-online-orange focus:outline-none"
                  onChange={(e) => {
                    setFormdata({ ...formdata, committee_id: e.target.value });
                  }}
                >
                  <option value="">Velg enhet</option>
                  {data && data.length
                    ? data.map((committee: any) => (
                        <option key={committee.id} value={committee.id}>
                          {committee.name}
                        </option>
                      ))
                    : null}
                </select>
                {errors.committee_id && (
                  <p className="text-online-orange text-sm mt-1">{errors.committee_id}</p>
                )}
              </div>
            </div>
          </div>

          {/* Attachments Section */}
          <div className="border-t border-online-blue-500/30 pt-6 mt-6">
            <h2 className="text-xl font-semibold text-white mb-2">
              Vedlegg / Kvitteringer
            </h2>
            <p className="text-online-blue-200 text-sm mb-4">
              Last opp et tydelig bilde/scan av kvitteringen. Husk at kvitteringen
              ma vaere gyldig for at den skal godkjennes.{" "}
              <a href="/faq" className="text-online-orange hover:underline">
                Se retningslinjer
              </a>
            </p>
            <FileUpload files={attachments} onFileChange={onFileChange} />
            {errors.attachments && (
              <p className="text-online-orange text-sm mt-2">{errors.attachments}</p>
            )}
          </div>

          {/* Comments Section */}
          <div className="mt-6">
            <label className="block text-white text-sm font-medium mb-2">
              Kommentarer (valgfritt)
            </label>
            <textarea
              className="w-full px-4 py-3 rounded-lg bg-white text-online-blue-900 placeholder-gray-400 focus:ring-2 focus:ring-online-orange focus:outline-none h-28 resize-none"
              placeholder="Legg til eventuelle kommentarer..."
              onChange={(e) => {
                setFormdata({ ...formdata, description: e.target.value });
              }}
            />
          </div>

          {/* Submit Button */}
          <div className="mt-8 text-center">
            <button
              disabled={disableSubmit}
              onClick={submitform}
              className="bg-online-orange text-online-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-online-orange-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {disableSubmit ? "Sender..." : "Send inn kvittering"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceiptPage;
