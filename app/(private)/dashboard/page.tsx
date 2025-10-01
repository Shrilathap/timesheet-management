"use client";
import { useBreadcrumbs } from "@/context/breadcrumb";
import { Timesheet } from "@/app/api/timesheets/route";
import { useEffect, useMemo, useState } from "react";
import { TimesheetFilters } from "@/types";
import CustomSelect from "@/components/Select";
import Pagination from "@/components/Pagination";
// import AddEntryModal from "@/components/Modal";

export default function Dashboard() {
  const [data, setData] = useState<Timesheet[]>([]);
  const { setBreadcrumbs } = useBreadcrumbs();
  //  const [showModal, setShowModal] = useState(false);
  //    const [entry, setEntry] = useState({
  //   projectName: "",
  //   typeOfWork: "Bug fixes",
  //   taskDescription: "",
  //   hours: 1,
  // });

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [filters, setFilters] = useState({
    status: "",
    dateRange: "",
  });

  const dateOptions = [
    { label: "This Week", value: "This Week" },
    { label: "Last Week", value: "Last Week" },
    { label: "This Month", value: "This Month" },
    { label: "Last Month", value: "Last Month" },
    { label: "Last 3 Month", value: "Last 3 Month" },
  ];

  const statusOptions = [
    { label: "Completed", value: "COMPLETED" },
    { label: "Incomplete", value: "INCOMPLETE" },
    { label: "Missing", value: "MISSING" },
  ];

  const pageOptions = [
    { label: "5 per page", value: 5 },
    { label: "10 per page", value: 10 },
    { label: "25 per page", value: 25 },
  ];

  const parseRowDate = (dateStr: string): Date => {
    try {
      const parts = dateStr.split(" ");
      const day = parts[0];
      const month = parts[3].replace(",", "");
      const year = parts[4];
      return new Date(`${day} ${month} ${year}`);
    } catch (err) {
      return new Date(""); // Always return a Date object
    }
  };

  const filteredData = useMemo(() => {
    return data.filter((row) => {
      let match = true;

      if (filters.status && row.status !== filters.status) {
        match = false;
      }

      if (filters.dateRange) {
        const today = new Date();
        const rowDate: Date = parseRowDate(row.date);

        if (isNaN(rowDate.getTime())) {
          return false;
        }

        if (filters.dateRange === "Today") {
          match = match && rowDate.toDateString() === today.toDateString();
        } else if (filters.dateRange === "This Week") {
          const weekStart = new Date(today);
          weekStart.setDate(today.getDate() - today.getDay());
          weekStart.setHours(0, 0, 0, 0);

          const weekEnd = new Date(weekStart);
          weekEnd.setDate(weekStart.getDate() + 6);
          weekEnd.setHours(23, 59, 59, 999);

          match = match && rowDate >= weekStart && rowDate <= weekEnd;
        } else if (filters.dateRange === "This Month") {
          match =
            match &&
            rowDate.getMonth() === today.getMonth() &&
            rowDate.getFullYear() === today.getFullYear();
        }
      }

      return match;
    });
  }, [filters, data]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  useEffect(() => {
    setBreadcrumbs([{ label: "Home", href: "/" }, { label: "Dashboard" }]);
  }, [setBreadcrumbs]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/timesheets");
      const data: Timesheet[] = await res.json();
      setData(data);
    };
    fetchData();
  }, []);

  const getStatusBadge = (status: Timesheet["status"]) => {
    const colors: Record<Timesheet["status"], string> = {
      COMPLETED: "bg-green-100 text-green-700",
      INCOMPLETE: "bg-yellow-100 text-yellow-700",
      MISSING: "bg-pink-100 text-pink-700",
    };
    return (
      <span
        className={`px-2 py-1 rounded text-xs font-medium ${colors[status]}`}
      >
        {status}
      </span>
    );
  };

  const handlePageLimitChange = (value: number) => {
    setRowsPerPage(value);
    setCurrentPage(1);
  };

  const handleFilter = (newFilters: Partial<TimesheetFilters>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }));
    setCurrentPage(1);
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 md:w-3/4 w-full">
      <h2 className="text-2xl font-bold mb-4">Your Timesheets</h2>

      {/* Filters */}
      <div className="flex gap-[10px] mb-4 md:flex-row flex-col">
        <CustomSelect
          value={""}
          options={dateOptions}
          placeholder="Date range"
          onChange={(value: string) => handleFilter({ dateRange: value })}
        />
        <CustomSelect
          value={""}
          options={statusOptions}
          placeholder="Status"
          onChange={(value: string) => handleFilter({ status: value })}
        />
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-lg w-full overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="border-b border-b-gray-200">
            <tr className="text-left text-sm text-gray-600 bg-gray-50">
              <th className="py-2 px-4 whitespace-nowrap">WEEK #</th>
              <th className="py-2 px-4">DATE</th>
              <th className="py-2 px-4">STATUS</th>
              <th className="py-2">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((item) => (
              <tr
                key={item.week}
                className="border-b border-b-gray-200 text-sm"
              >
                <td className="py-2 px-4">{item.week}</td>
                <td className="py-2 whitespace-nowrap px-4">{item.date}</td>
                <td className="py-2 px-4">{getStatusBadge(item.status)}</td>
                <td className="py-2">
                  {item.status === "COMPLETED" ? (
                    <button className="text-blue-600 hover:underline">
                      View
                    </button>
                  ) : item.status === "INCOMPLETE" ? (
                    <button className="text-blue-600 hover:underline">
                      Update
                    </button>
                  ) : (
                    <button className="text-blue-600 hover:underline">
                      Create
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredData.length === 0 && (
          <div className="p-4 text-center text-gray-500">
            No timesheets found.
          </div>
        )}
      </div>

      {/* Pagination */}

      <div className="flex justify-between items-center pt-4 pb-4 md:flex-row flex-col gap-2">
        <div className="inline-flex items-center gap-4">
          <CustomSelect
            value={rowsPerPage}
            options={pageOptions}
            placeholder=""
            onChange={(value: number) => handlePageLimitChange(value)}
          />
          {/* <p className="text-sm text-gray-500">
            Showing {currentRows.length} of {filteredData.length} entries
          </p> */}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(p: number) => setCurrentPage(p)}
        />
      </div>
      {/* <AddEntryModal
        isOpen={showModal}
        formData={entry}
        onChange={(data) => setEntry(data)} // 2-way binding
        onClose={() => setShowModal(false)}
      /> */}
    </div>
  );
}
