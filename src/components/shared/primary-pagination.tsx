"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface PrimaryPaginationProps {
  totalPages: number;
  queryKey?: string;
}

export default function PrimaryPagination({
  totalPages,
  queryKey = "page",
}: PrimaryPaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get(queryKey)) || 1;

  const handlePageChange = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(queryKey, pageNumber.toString());
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const siblingCount = 1;
  const totalPageNumbers = siblingCount * 2 + 5;
  const isDisabled = currentPage === 1;

  const range = (start: number, end: number) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
  };

  // --- Logic for small page count ---
  if (totalPages <= totalPageNumbers) {
    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) handlePageChange(currentPage - 1);
              }}
              aria-disabled={isDisabled}
              // 🔥 FIX: 'text-muted' সরিয়ে দিয়েছি
              className={cn("cursor-pointer", {
                "pointer-events-none opacity-50": isDisabled,
              })}
            />
          </PaginationItem>

          {range(1, totalPages).map((p) => (
            <PaginationItem key={p}>
              <PaginationLink
                isActive={p === currentPage}
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(p);
                }}
                className="cursor-pointer"
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPages) handlePageChange(currentPage + 1);
              }}
              aria-disabled={currentPage === totalPages}
              // 🔥 FIX: 'text-muted' সরিয়ে দিয়েছি
              className={cn("cursor-pointer", {
                "pointer-events-none opacity-50": currentPage === totalPages,
              })}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  }

  // --- Logic for large page count (Ellipsis) ---
  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

  const shouldShowLeftEllipsis = leftSiblingIndex > 2;
  const shouldShowRightEllipsis = rightSiblingIndex < totalPages - 1;

  const firstPageIndex = 1;
  const lastPageIndex = totalPages;

  const pages: (number | string)[] = [];

  if (!shouldShowLeftEllipsis && shouldShowRightEllipsis) {
    const leftItemCount = 3 + 2 * siblingCount;
    const leftRange = range(1, leftItemCount);
    pages.push(...leftRange);
    pages.push("right-ellipsis");
    pages.push(totalPages);
  } else if (shouldShowLeftEllipsis && !shouldShowRightEllipsis) {
    const rightItemCount = 3 + 2 * siblingCount;
    const rightRange = range(totalPages - rightItemCount + 1, totalPages);
    pages.push(firstPageIndex);
    pages.push("left-ellipsis");
    pages.push(...rightRange);
  } else if (shouldShowLeftEllipsis && shouldShowRightEllipsis) {
    const middleRange = range(leftSiblingIndex, rightSiblingIndex);
    pages.push(firstPageIndex);
    pages.push("left-ellipsis");
    pages.push(...middleRange);
    pages.push("right-ellipsis");
    pages.push(lastPageIndex);
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) handlePageChange(currentPage - 1);
            }}
            aria-disabled={isDisabled}
            // 🔥 FIX: Updated class
            className={cn("cursor-pointer", {
              "pointer-events-none opacity-50": isDisabled,
            })}
          />
        </PaginationItem>

        {pages.map((p, idx) => {
          if (p === "left-ellipsis" || p === "right-ellipsis") {
            return (
              <PaginationItem key={p + idx}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          return (
            <PaginationItem key={p}>
              <PaginationLink
                isActive={p === currentPage}
                onClick={(e) => {
                  e.preventDefault();
                  if (typeof p === "number") handlePageChange(p);
                }}
                className="cursor-pointer"
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationNext
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) handlePageChange(currentPage + 1);
            }}
            aria-disabled={currentPage === totalPages}
            className={cn("cursor-pointer", {
              "pointer-events-none opacity-50": currentPage === totalPages,
            })}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}