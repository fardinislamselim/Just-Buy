"use client";

/**
 * @copyright 2026
 * @author Fardin Islam Selim - MERN Stack Developer
 * @license Apache-2.0
 */

import React from "react";
import { cn } from "@/lib/utils";

interface ProductPaginationProps {
  currentPage: number;
  totalPages: number;
  fromIndex: number;
  toIndex: number;
  totalCount: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function ProductPagination({
  currentPage,
  totalPages,
  fromIndex,
  toIndex,
  totalCount,
  onPageChange,
  className,
}: ProductPaginationProps) {
  if (totalCount === 0) return null;

  // Generate page numbers to display
  const getPageNumbers = () => {
    // If small number of pages, show all (or up to 9 pages matching screenshot)
    const maxVisible = 9;
    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Dynamic window centered around currentPage
    let start = Math.max(1, currentPage - 4);
    const end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    const pages: (number | string)[] = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 pb-4 border-t border-neutral-100",
        className,
      )}
      aria-label="Pagination Navigation"
    >
      {/* Left: Previous, Page Numbers, Next */}
      <div className="flex items-center space-x-1 sm:space-x-1.5 flex-wrap justify-center">
        {/* 'prev' Button */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className={cn(
            "text-xs sm:text-sm font-medium px-2 py-1 transition-colors select-none",
            currentPage <= 1
              ? "text-neutral-300 cursor-not-allowed"
              : "text-neutral-700 hover:text-brand-orange cursor-pointer",
          )}
        >
          prev
        </button>

        {/* Page numbers */}
        {pages.map((p, idx) => {
          if (typeof p === "string") {
            return (
              <span
                key={`ellipsis-${idx}`}
                className="w-7 h-7 flex items-center justify-center text-xs text-neutral-400"
              >
                ...
              </span>
            );
          }

          const isActive = p === currentPage;
          return (
            <button
              key={p}
              type="button"
              onClick={() => onPageChange(p)}
              className={cn(
                "w-7 h-7 sm:w-8 sm:h-8 rounded-sm text-xs sm:text-sm font-medium transition-all select-none flex items-center justify-center cursor-pointer",
                isActive
                  ? "bg-brand-orange text-white shadow-2xs font-semibold"
                  : "text-neutral-600 hover:text-brand-orange hover:bg-neutral-100",
              )}
              aria-current={isActive ? "page" : undefined}
            >
              {p}
            </button>
          );
        })}

        {/* 'next' Button */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className={cn(
            "text-xs sm:text-sm font-medium px-2 py-1 transition-colors select-none",
            currentPage >= totalPages
              ? "text-neutral-300 cursor-not-allowed"
              : "text-neutral-700 hover:text-brand-orange cursor-pointer",
          )}
        >
          next
        </button>
      </div>

      {/* Right: Showing X-Y from Z results */}
      <div className="text-xs sm:text-sm text-neutral-500 font-normal">
        Showing {fromIndex}-{toIndex} from {totalCount} results
      </div>
    </div>
  );
}

export default ProductPagination;
