"use client";
import { useBreadcrumbs } from "@/context/breadcrumb";
import { Timesheet } from "@/app/api/timesheets/route";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { TimesheetFilters } from "@/types";

export default function Dashboard() {
  const [data, setData] = useState<Timesheet[]>([]);
  const { setBreadcrumbs } = useBreadcrumbs();

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [filters, setFilters] = useState({
    status: "",
    dateRange: "",
  });


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

  const handlePageLimitChange = (value: string) => {
    const limit = parseInt(value);
    setRowsPerPage(limit);
    setCurrentPage(1);
  };

  const getButtonClasses = (
    pageNum: number,
    isActive: boolean = false,
    isDisabled: boolean = false
  ) => {
    const buttonClassName =
      "px-3 py-1 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";
    const activeButtonClassName = "bg-blue-600 text-white";
    const disabledButtonClassName = "opacity-50 cursor-not-allowed";
    let classes = buttonClassName;

    if (isActive) {
      classes += ` ${activeButtonClassName}`;
    } else {
      classes += " text-gray-700 hover:bg-gray-100";
    }

    if (isDisabled) {
      classes += ` ${disabledButtonClassName}`;
    }
    console.log(classes)

    return classes;
  };

  const handleFilter = (newFilters: Partial<TimesheetFilters>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }));
    setCurrentPage(1);
  };

  const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= maxVisiblePages; i++) {
          pages.push(i);
        }
      } else if (currentPage >= totalPages - 2) {
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pages.push(i);
        }
      }
    }

    return pages;
  };

  const pageNumbers = generatePageNumbers();
  const showEllipsis = totalPages > 5 && currentPage < totalPages - 2;


  return (
    <div className="bg-white shadow rounded-lg p-6 md:w-3/4 w-full">
      <h2 className="text-2xl font-bold mb-4">Your Timesheets</h2>

      {/* Filters */}
      <div className="flex gap-[10px] mb-4 md:flex-row flex-col">
        <div className="relative inline-block">
          <select
            id="date-range"
            value={filters.dateRange}
            onChange={(e) => handleFilter({ dateRange: e.target.value })}
            className="appearance-none w-full font-normal text-sm border border-gray-300 rounded-lg px-4 py-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300 pr-10"
          >
            <option value="">Date Range</option>
            <option value="This Week">This Week</option>
            <option value="Last Week">Last Week</option>
            <option value="Last Month">Last Month</option>
            <option value="Last 3 Month">Last 3 Month</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <Image
              src="/images/down-arrow.svg"
              alt="Dropdown icon"
              width={24}
              height={24}
              className="text-gray-400"
            />
          </div>
        </div>

        <div className="relative inline-block">
          <select
            id="status"
            value={filters.status}
            onChange={(e) => handleFilter({ status: e.target.value })}
            className="appearance-none w-full font-normal text-sm border border-gray-300 rounded-lg px-4 py-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300 pr-10"
          >
            <option value="">Status</option>
            <option value="COMPLETED">Completed</option>
            <option value="INCOMPLETE">Incomplete</option>
            <option value="MISSING">Missing</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <Image
              src="/images/down-arrow.svg"
              alt="Dropdown icon"
              width={24}
              height={24}
              className="text-gray-400"
            />
          </div>
        </div>
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
          <div className="relative inline-block">
            <select
              id="rows-per-page"
              className="appearance-none border border-gray-300 rounded-xl px-4 py-1 text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300 pr-10"
              value={rowsPerPage}
              onChange={(e) => handlePageLimitChange(e.target.value)}
            >
              <option value={5}>5 per page</option>
              <option value={10}>10 per page</option>
              <option value={25}>25 per page</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <Image
                src="/images/down-arrow.svg"
                alt="Dropdown icon"
                width={24}
                height={24}
                className="text-gray-400"
              />
            </div>
          </div>
          <p className="text-sm text-gray-500">
            Showing {currentRows.length} of {filteredData.length} entries
          </p>
        </div>

        <div className="flex flex-wrap items-center border border-gray-300 rounded-md">
          {/* Previous button */}
          <button
            onClick={() => setCurrentPage((p) => p - 1)}
            disabled={currentPage === 1}
            className={`${getButtonClasses(
              0,
              !(currentPage === 1),
              false
            )} border-r border-gray-300`}
          >
            Previous
          </button>

          {/* Page numbers */}
          {pageNumbers.map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => setCurrentPage(pageNum)}
              className={`${getButtonClasses(
                pageNum,
                pageNum === currentPage
              )} border-r border-gray-300`}
            >
              {pageNum}
            </button>
          ))}

          {/* Ellipsis and last page */}
          {showEllipsis && (
            <>
              <span className="px-3 py-1 text-sm text-gray-500 border-r border-gray-300">
                ...
              </span>
              <button
                onClick={() => setCurrentPage(totalPages)}
                className={`${getButtonClasses(
                  totalPages
                )} border-r border-gray-300`}
              >
                {totalPages}
              </button>
            </>
          )}

          {/* Next button */}
          <button
            onClick={() => setCurrentPage((p) => p + 1)}
            disabled={currentPage === totalPages}
            className={getButtonClasses(
              0,
              !(currentPage === totalPages),
              false,
            )}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
