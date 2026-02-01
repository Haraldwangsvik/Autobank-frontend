import { useLocation, useNavigate } from "react-router-dom";
import { Receipt_Info } from "../../api/adminReceiptAPI";
import { CheckCircleIcon, XCircleIcon, EnvelopeIcon } from "@heroicons/react/24/solid";

interface ReceiptOverviewProps {
  receipt: Receipt_Info;
}

const ReceiptRow = ({ receipt }: ReceiptOverviewProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    const linkBase = location.pathname.includes("/admin")
      ? "/admin/kvittering/"
      : "/minside/";
    const fullLink = `${linkBase}${receipt.receiptId}`;
    navigate(fullLink);
  };

  const getStatusIcon = () => {
    if (receipt.latestReviewStatus === "APPROVED") {
      return <CheckCircleIcon className="w-6 h-6 text-green-500" />;
    } else if (receipt.latestReviewStatus === "DENIED") {
      return <XCircleIcon className="w-6 h-6 text-red-500" />;
    }
    return <EnvelopeIcon className="w-6 h-6 text-online-orange" />;
  };

  const getStatusText = () => {
    if (receipt.latestReviewStatus === "APPROVED") return "Godkjent";
    if (receipt.latestReviewStatus === "DENIED") return "Avvist";
    return "Ubesvart";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
  };

  return (
    <tr
      onClick={handleClick}
      className="hover:bg-online-blue-500/30 cursor-pointer transition-colors group"
    >
      <td className="py-4 pl-2">
        <div className="relative">
          {getStatusIcon()}
          <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-online-blue-800 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            {getStatusText()}
          </span>
        </div>
      </td>
      <td className="py-4 text-white font-medium hidden md:table-cell">
        {receipt.committeeName}
      </td>
      <td className="py-4 text-white">{receipt.receiptName}</td>
      <td className="py-4 text-online-blue-200 hidden lg:table-cell">
        {receipt.paymentOrCard === "Payment" ? "Utlegg" : "Kort"}
      </td>
      <td className="py-4 text-online-blue-200 max-w-[150px] truncate hidden lg:table-cell">
        {receipt.receiptDescription.slice(0, 60)}
        {receipt.receiptDescription.length > 60 ? "..." : ""}
      </td>
      <td className="py-4 text-center text-online-blue-200 text-sm">
        {formatDate(receipt.receiptCreatedAt)}
      </td>
    </tr>
  );
};

export default ReceiptRow;
