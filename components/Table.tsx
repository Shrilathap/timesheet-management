"use client";
import React, { useState } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";

type SortDirection = "asc" | "desc";

export interface Column<T> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  render?: (item: T) => React.ReactNode;
}

interface CommonTableProps<T extends object> {
  columns: Column<T>[];
  data: T[];
  initialSort?: {
    key: keyof T | string;
    direction: SortDirection;
  };
}


export default function CommonTable<T extends object>({
  columns,
  data,
  initialSort
}: CommonTableProps<T>) {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T | string | null;
    direction: SortDirection;
  }>({     
    key: initialSort?.key ?? null,
    direction: initialSort?.direction ?? "asc",
 });

  const handleSort = (key: keyof T | string) => {
    let direction: SortDirection = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return data;

    return [...data].sort((a, b) => {
      const aVal = a[sortConfig.key as keyof T];
      const bVal = b[sortConfig.key as keyof T];

      if (aVal === undefined || aVal === null || bVal === undefined || bVal === null) return 0;

      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  //  Helper to show correct sort icon
  const renderSortIcon = (colKey: keyof T | string) => {
    if (sortConfig.key !== colKey) return  <ArrowDown className="w-4 h-4 text-black-600" />;
    if (sortConfig.direction === "asc"){
        return <ArrowUp className="w-4 h-4 text-black-600" />;
    }
    else if(sortConfig.direction === "desc"){
        return  <ArrowDown className="w-4 h-4 text-black-600" />
    }
    
  };

  return (
    <div className="bg-white shadow rounded-lg w-full overflow-x-auto">
      <table className="w-full border-collapse">
        <thead className="border-b border-b-gray-200">
          <tr className="text-left text-sm text-gray-600 bg-gray-50">
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className={`py-2 px-4 whitespace-nowrap ${
                  col.sortable ? "cursor-pointer select-none" : ""
                }`}
                onClick={() => col.sortable && handleSort(col.key)}
              >
                <div className="flex items-center gap-1">
                  {col.label}
                  {col.sortable && renderSortIcon(col.key)}
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {sortedData.length > 0 ? (
            sortedData.map((item, index) => (
              <tr
                key={index}
                className="border-b border-b-gray-200 text-sm hover:bg-gray-50 transition"
              >
                {columns.map((col) => (
                  <td
                    key={String(col.key)}
                    className="py-2 px-4 whitespace-nowrap"
                  >
                    {col.render ? col.render(item) : String(item[col.key as keyof T])}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="p-4 text-center text-gray-500"
              >
                No records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
