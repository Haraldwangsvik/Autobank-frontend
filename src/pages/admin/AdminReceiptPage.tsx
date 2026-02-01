import React, { useState, useEffect, useMemo } from "react";
import { fetchAllReceipts, Receipt_Info } from "../../api/adminReceiptAPI";
import { useQuery } from "@tanstack/react-query";
import { fetchCommittees, Committee } from "../../api/baseAPI";
import {
  Checkbox,
  FormControl,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Pagination,
} from "@mui/material";
import ReceiptTable from "../../components/receipt/ReceiptTable";
import debounce from "lodash.debounce";
import AdminBadge from "../../components/admin/AdminBadge";
import { MagnifyingGlassIcon, FunnelIcon } from "@heroicons/react/24/outline";

const AdminReceiptPage = () => {
  const [selectedCommittees, setSelectedCommittees] = useState<string[]>([]);
  const [receiptStatus, setReceiptStatus] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>();

  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const debouncedSetSearchTerm = useMemo(
    () => debounce((value: string) => setDebouncedSearchTerm(value), 500),
    []
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSetSearchTerm(value);
  };

  useEffect(() => {
    return () => {
      debouncedSetSearchTerm.cancel();
    };
  }, [debouncedSetSearchTerm]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearchTerm, selectedCommittees, receiptStatus]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const {
    data: receiptData,
    isLoading: receiptDataLoading,
    isError,
  } = useQuery({
    queryKey: [
      "receipts_admin",
      page - 1,
      rowsPerPage,
      receiptStatus,
      debouncedSearchTerm,
      selectedCommittees.join(","),
    ],
    queryFn: () =>
      fetchAllReceipts(
        page - 1,
        rowsPerPage,
        receiptStatus,
        debouncedSearchTerm,
        selectedCommittees.join(",")
      ),
  });

  const { data: committeeData } = useQuery({
    queryKey: ["committees"],
    queryFn: () => fetchCommittees(),
  });

  const handleCommitteeChange = (event: any) => {
    const value = event.target.value;
    setSelectedCommittees(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <div className="min-h-screen py-8 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <AdminBadge className="mb-4" />
          <h1 className="text-3xl font-bold text-white mb-2">
            Alle kvitteringer
          </h1>
          <p className="text-online-blue-200">
            Administrer og godkjenn innsendte kvitteringer
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1 max-w-xs">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Sok pa anledning..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white text-online-blue-900 placeholder-gray-400 focus:ring-2 focus:ring-online-orange focus:outline-none"
            />
          </div>

          <FormControl sx={{ minWidth: 200 }}>
            <Select
              multiple
              value={selectedCommittees}
              onChange={handleCommitteeChange}
              input={<OutlinedInput notched={false} />}
              displayEmpty
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return <span className="text-gray-500">Filtrer komite...</span>;
                }
                return selected.join(", ");
              }}
              sx={{
                backgroundColor: "white",
                borderRadius: "0.5rem",
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  border: "2px solid #F9B759",
                },
              }}
            >
              {committeeData?.map((committee: Committee) => (
                <MenuItem key={committee.id} value={committee.name}>
                  <Checkbox
                    checked={selectedCommittees.includes(committee.name)}
                    sx={{
                      color: "#0D5474",
                      "&.Mui-checked": { color: "#F9B759" },
                    }}
                  />
                  {committee.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {/* Table */}
        <div className="bg-online-blue-600/30 backdrop-blur-sm rounded-xl border border-online-blue-500/30 p-4 md:p-6">
          {(receiptData || receiptDataLoading) && (
            <ReceiptTable
              receipts={receiptData?.receipts}
              receiptsLoading={receiptDataLoading}
              receiptStatus={receiptStatus}
              setReceiptStatus={setReceiptStatus}
            />
          )}

          {receiptData && receiptData.total > 0 && (
            <div className="flex justify-center mt-6">
              <Pagination
                count={Math.ceil(receiptData?.total / rowsPerPage)}
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
  );
};

export default AdminReceiptPage;
