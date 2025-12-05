import React, { useEffect, useState, useRef } from "react";
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
    for (let i = left; i <= right; i++) {
      if (i !== 1 && i !== totalPages) {
        range.push(i);
      }
    }
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

  // Track which input has focus
  const activeInputRef = useRef<string | null>(null);
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, filterDelay]);

  // Restore focus after render
  useEffect(() => {
    if (activeInputRef.current && inputRefs.current[activeInputRef.current]) {
      const input = inputRefs.current[activeInputRef.current];
      if (input && document.activeElement !== input) {
        input.focus();
        // Restore cursor position to end
        const length = input.value.length;
        input.setSelectionRange(length, length);
      }
    }
  });

  const getStickyClass = (sticky?: "left" | "right") => {
    if (sticky === "left") return "sticky left-0 z-[1] bg-white shadow-[4px_0_24px_rgba(0,0,0,0.02)]";
    if (sticky === "right") return "sticky right-0 z-[1] bg-white shadow-[-4px_0_24px_rgba(0,0,0,0.02)]";
    return "";
  };

  if (isLoading) {
    return (
      <div className="flex h-60 w-full justify-center items-center bg-white rounded-xl border border-gray-100">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="relative overflow-x-auto rounded-xl border border-gray-100 bg-white shadow-sm">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="text-xs font-semibold text-gray-500 uppercase bg-gray-50/50 border-b border-gray-100">
            <tr>
              {columns.map((col, index) => {
                const isAsc = sortBy === col.accessor && sortDir === "asc";
                const isDesc = sortBy === col.accessor && sortDir === "desc";

                return (
                  <th
                    key={index}
                    className={cn(
                      "px-6 py-4 cursor-pointer select-none whitespace-nowrap transition-colors hover:bg-gray-50",
                      getStickyClass(col.sticky),
                      col.headerClassName
                    )}
                    onClick={() =>
                      col.sortable && toggleSort(col.accessor as string)
                    }
                  >
                    <div className="flex items-center gap-2">
                      {col.header}
                      {col.sortable && (
                        <div className="flex flex-col">
                          {isAsc ? (
                            <HiChevronUp className="w-3 h-3 text-blue-600" />
                          ) : isDesc ? (
                            <HiChevronDown className="w-3 h-3 text-blue-600" />
                          ) : (
                            <HiSelector className="w-4 h-4 text-gray-300" />
                          )}
                        </div>
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
            <tr>
              {columns.map((col, index) => (
                <th
                  key={index}
                  className={cn(
                    "px-6 py-2 bg-gray-50/30 border-b border-gray-100",
                    getStickyClass(col.sticky),
                    col.headerClassName
                  )}
                >
                  {!col.filterable ? (
                    <div className="h-9" />
                  ) : col.filterType === "select" ? (
                    <div className="relative">
                      <select
                        className="block w-full h-9 pl-2 pr-2 rounded-lg border-gray-200 bg-white text-xs text-gray-600 focus:border-blue-500 focus:ring-blue-500/20 transition-all"
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
                    </div>
                  ) : col.filterType === "date" ? (
                    <InputText
                      type="date"
                      className="h-9 text-xs border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500/20"
                      value={filters[col.accessor as string] || ""}
                      ref={(el) => {
                        inputRefs.current[col.accessor as string] = el;
                      }}
                      onFocus={() => {
                        activeInputRef.current = col.accessor as string;
                      }}
                      onBlur={() => {
                        if (activeInputRef.current === col.accessor as string) {
                          activeInputRef.current = null;
                        }
                      }}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          [col.accessor as string]: e.target.value,
                        }))
                      }
                    />
                  ) : (
                    <InputText
                      className="h-9 text-xs border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500/20 placeholder:text-gray-400"
                      placeholder={`Cari ${col.header}...`}
                      value={filters[col.accessor as string] || ""}
                      ref={(el) => {
                        inputRefs.current[col.accessor as string] = el;
                      }}
                      onFocus={() => {
                        activeInputRef.current = col.accessor as string;
                      }}
                      onBlur={() => {
                        if (activeInputRef.current === col.accessor as string) {
                          activeInputRef.current = null;
                        }
                      }}
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
          <tbody className="divide-y divide-gray-50">
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-12 text-center text-gray-400 text-sm"
                >
                  <div className="flex flex-col items-center gap-2">
                    <svg className="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                    <span>Tidak ada data ditemukan</span>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((row, rowIndex) => (
                <tr 
                  key={row?.id} 
                  className="bg-white hover:bg-gray-50/80 transition-colors duration-150 group"
                >
                  {columns.map((col, colIdx) => (
                    <td
                      key={colIdx}
                      className={cn(
                        "px-6 py-4 whitespace-nowrap text-sm text-gray-600 group-hover:text-gray-900",
                        getStickyClass(col.sticky),
                        col.className
                      )}
                    >
                      {col.render
                        ? col.render(row, rowIndex)
                        : (row[col.accessor] as React.ReactNode)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-4 px-2">
        <button
          onClick={() => {
            setFilters({});
            const params = new URLSearchParams();
            params.set("page", "1");
            setSearchParams(params);
          }}
          className="text-xs font-medium text-gray-500 hover:text-blue-600 transition-colors flex items-center gap-1"
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
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
