import ProfileCard from "../components/profile/ProfileCard";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { fetchAllUserReceipts } from "../api/userAPI";
import ReceiptTable from "../components/receipt/ReceiptTable";
import { Pagination } from "@mui/material";

const ProfilePage = () => {
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>();
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  const [receiptStatus, setReceiptStatus] = useState<string | null>("NONE");

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const { data: receiptData, isLoading: receiptDataLoading } = useQuery({
    queryKey: [
      "receipts_user",
      page - 1,
      rowsPerPage,
      receiptStatus,
      debouncedSearchTerm,
    ],
    queryFn: () => fetchAllUserReceipts(page - 1, rowsPerPage, receiptStatus),
  });

  useEffect(() => {
    setPage(1);
  }, [debouncedSearchTerm, receiptStatus]);

  return (
    <div className="min-h-screen py-8 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Min side</h1>
          <p className="text-online-blue-200">
            Se dine innsendte kvitteringer og deres status
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Profile Card - Hidden on mobile */}
          <div className="hidden md:block lg:w-72 flex-shrink-0">
            <ProfileCard />
          </div>

          {/* Receipts Table */}
          <div className="flex-1">
            <div className="bg-online-blue-600/30 backdrop-blur-sm rounded-xl border border-online-blue-500/30 p-4 md:p-6">
              <ReceiptTable
                receipts={receiptData?.receipts}
                receiptsLoading={receiptDataLoading}
                setReceiptStatus={setReceiptStatus}
                receiptStatus={receiptStatus}
              />
              {receiptData && receiptData.total > 0 && (
                <div className="flex justify-center mt-6">
                  <Pagination
                    count={Math.ceil(receiptData.total / rowsPerPage)}
                    page={page}
                    onChange={handleChangePage}
                    sx={{
                      "& .MuiPaginationItem-root": {
                        color: "white",
                        borderColor: "rgba(255,255,255,0.2)",
                      },
                      "& .Mui-selected": {
                        backgroundColor: "#F9B759 !important",
                        color: "#0D5474 !important",
                      },
                      "& .MuiPaginationItem-root:hover": {
                        backgroundColor: "rgba(255,255,255,0.1)",
                      },
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
