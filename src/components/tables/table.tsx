import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { HiChevronUp, HiChevronDown, HiSelector } from "react-icons/hi";
import { cn } from "../../utils/cn";
import { InputText } from "../input";
import Spinner from "../ui/Spinner";

export interface Column<T> {
  header: string;
  accessor: keyof T;
  render?: (row: T, index?: number) => React.ReactNode;
  filterable?: boolean;
  filterType?: "text" | "select" | "date";
  filterOptions?: { label: string; value: string | number }[];
  sortable?: boolean;
  sticky?: "left" | "right";
  className?: string;
  headerClassName?: string;
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const baseBtn =
    "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 transition disabled:text-gray-400 disabled:cursor-not-allowed";
  const maxVisible = 10;

  const getPaginationRangeWithDots = (): (number | "...")[] => {
    const range: (number | "...")[] = [];

    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const left = Math.max(1, currentPage - 2);
    const right = Math.min(totalPages, currentPage + 2);
    const showLeftDots = left > 2;
    const showRightDots = right < totalPages - 1;

    range.push(1);
    if (showLeftDots) range.push("...");
    for (let i = left; i <= right; i++) range.push(i);
    if (showRightDots) range.push("...");
    range.push(totalPages);

    return range;
  };

  return (
    <div className="inline-flex rounded overflow-hidden mt-4">
      <button
        className="flex text-sm items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 rounded-s-lg"
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
      >
        First
      </button>
      <button
        className="flex text-sm items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {getPaginationRangeWithDots().map((page, idx) =>
        page === "..." ? (
          <span key={idx} className={baseBtn}>
            ...
          </span>
        ) : (
          <button
            key={idx}
            className={cn(
              baseBtn,
              page === currentPage && "bg-gray-700 text-white font-semibold"
            )}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        )
      )}
      <button
        className="px-3 h-8 text-sm flex items-center justify-center leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
      <button
        className="px-3 h-8 text-sm border rounded-e-lg flex items-center justify-center leading-tight text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700"
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        Last
      </button>
    </div>
  );
};

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  totalPages: number;
  filterDelay?: number;
  isLoading?: boolean;
}

export function Table<T extends { id?: number | string }>({
  data,
  columns,
  totalPages,
  filterDelay = 500,
  isLoading,
}: TableProps<T>) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1");

  const sortBy = searchParams.get("sortby") || "";
  const sortDir = searchParams.get("sort") || "";

  const [filters, setFilters] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    columns.forEach((col) => {
      const val = searchParams.get(col.accessor as string);
      if (val) initial[col.accessor as string] = val;
    });
    return initial;
  });

  const handlePageChange = (page: number) => {
    searchParams.set("page", page.toString());
    setSearchParams(searchParams);
  };

  const toggleSort = (field: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    const currentSortBy = newParams.get("sortby");
    const currentSortDir = newParams.get("sort") || "asc";

    if (currentSortBy === field) {
      newParams.set("sort", currentSortDir === "asc" ? "desc" : "asc");
    } else {
      newParams.set("sortby", field);
      newParams.set("sort", "asc");
    }

    setSearchParams(newParams);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      const newParams = new URLSearchParams(searchParams.toString());

      columns.forEach((col) => {
        const key = col.accessor as string;
        const val = filters[key];
        if (val) {
          newParams.set(key, val);
        } else {
          newParams.delete(key);
        }
      });

      setSearchParams(newParams);
    }, filterDelay);

    return () => clearTimeout(handler);
  }, [filters, filterDelay]);

  const getStickyClass = (sticky?: "left" | "right") => {
    if (sticky === "left") return "sticky left-0 z-[1] bg-white";
    if (sticky === "right") return "sticky right-0 z-[1] bg-white";
    return "";
  };

  if (isLoading) {
    return (
      <div className="flex h-60 w-full justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="relative overflow-x-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
      <table className="min-w-[1000px] w-full text-sm text-left text-gray-500 table-auto">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            {columns.map((col, index) => {
              const isAsc = sortBy === col.accessor && sortDir === "asc";
              const isDesc = sortBy === col.accessor && sortDir === "desc";

              return (
                <th
                  key={index}
                  className={cn(
                    "px-6 py-3 cursor-pointer select-none whitespace-nowrap",
                    getStickyClass(col.sticky),
                    col.headerClassName
                  )}
                  onClick={() =>
                    col.sortable && toggleSort(col.accessor as string)
                  }
                >
                  <span className="flex items-center gap-1">
                    {col.header}
                    {col.sortable &&
                      (isAsc ? (
                        <HiChevronUp className="w-4 h-4" />
                      ) : isDesc ? (
                        <HiChevronDown className="w-4 h-4" />
                      ) : (
                        <HiSelector className="w-4 h-4 text-gray-300" />
                      ))}
                  </span>
                </th>
              );
            })}
          </tr>
          <tr>
            {columns.map((col, index) => (
              <th
                key={index}
                className={cn(
                  "px-6 py-2 font-light whitespace-nowrap",
                  getStickyClass(col.sticky),
                  col.headerClassName
                )}
              >
                {!col.filterable ? (
                  <div className="h-8" />
                ) : col.filterType === "select" ? (
                  <select
                    className="block h-9 w-full px-2 rounded-md border-0 py-2 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset"
                    value={filters[col.accessor as string] || ""}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        [col.accessor as string]: e.target.value,
                      }))
                    }
                  >
                    <option value="">Semua</option>
                    {col?.filterOptions?.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                ) : col.filterType === "date" ? (
                  <InputText
                    type="date"
                    value={filters[col.accessor as string] || ""}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        [col.accessor as string]: e.target.value,
                      }))
                    }
                  />
                ) : (
                  <InputText
                    value={filters[col.accessor as string] || ""}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        [col.accessor as string]: e.target.value,
                      }))
                    }
                  />
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-4 text-gray-500"
              >
                Tidak ada data
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr key={row?.id} className="bg-white border-b border-gray-200">
                {columns.map((col, colIdx) => (
                  <td
                    key={colIdx}
                    className={cn(
                      "px-6 py-4 whitespace-nowrap",
                      getStickyClass(col.sticky),
                      col.className
                    )}
                  >
                    {col.render
                      ? col.render(row, rowIndex) // ✅ gunakan index baris
                      : (row[col.accessor] as React.ReactNode)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="mt-2 flex justify-between px-2 items-end">
        <button
          onClick={() => {
            setFilters({});
            const params = new URLSearchParams();
            params.set("page", "1");
            setSearchParams(params);
          }}
          className="text-sm bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded"
        >
          Reset Filter
        </button>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
