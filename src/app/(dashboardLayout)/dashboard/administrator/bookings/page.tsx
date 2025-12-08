"use client";
import BookingsManagementHeader from "@/components/pages/dashboard/booking-management/booking-management-header";
import BookingsTable from "@/components/pages/dashboard/booking-management/booking-table";
import RefreshButton from "@/components/shared/dashboard/refresh-btn";
import SearchFilter from "@/components/shared/dashboard/search-fillter";
import SelectFilter from "@/components/shared/dashboard/select-fillter";
import { TableSkeleton } from "@/components/shared/dashboard/table-skeleton";
import SecondaryPagination from "@/components/shared/secondary-pagination";
import { useGetAllBookingsQuery } from "@/redux/api/bookingApi/bookingApi";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const BOOKING_STATUS_OPTIONS = [
  { label: "Confirmed", value: "confirmed" },
  { label: "Pending", value: "pending" },
  { label: "Cancelled", value: "cancelled" },
  { label: "Expired", value: "expired" },
];

export default function BookingsPage() {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || 1;
  const searchTerm = searchParams.get("searchTerm") || "";
  const status = searchParams.get("status") || "";
  const { data, isLoading, isError } = useGetAllBookingsQuery({
    page: page.toString(),
    limit: 10,
    searchTerm,
    status,
  });

  if (isLoading) return <div>Loading bookings...</div>;
  if (isError) return <div>Error loading bookings.</div>;

  const bookings = data?.data;
  console.log("🚀 ~ BookingsPage ~ bookings:", bookings)
  const meta = data?.meta;

  return (
    <div className="space-y-6 w-full">
      <BookingsManagementHeader />

      <div className="flex flex-col sm:flex-row gap-2">
        <div className="">
          <SearchFilter
            paramName="searchTerm"
            placeholder="Search by user or event..."
          />
        </div>
        <div className="flex gap-2">
          <SelectFilter
            paramName="status"
            options={BOOKING_STATUS_OPTIONS}
            placeholder="Filter by Status"
          />
          <RefreshButton />
        </div>
      </div>

      <Suspense fallback={<TableSkeleton columns={7} rows={10} />}>
        <BookingsTable bookings={bookings || []} />
        <SecondaryPagination
          currentPage={Number(page)}
          totalPages={meta.totalPages || 1}
        />
      </Suspense>
    </div>
  );
}
