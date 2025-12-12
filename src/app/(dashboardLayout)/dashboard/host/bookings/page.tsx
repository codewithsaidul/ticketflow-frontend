"use client";
import BookingsManagementHeader from "@/components/pages/dashboard/booking-management/booking-management-header";
import BookingsTable from "@/components/pages/dashboard/booking-management/booking-table";
import RefreshButton from "@/components/shared/dashboard/refresh-btn";
import SearchFilter from "@/components/shared/dashboard/search-fillter";
import SelectFilter from "@/components/shared/dashboard/select-fillter";
import { TableSkeleton } from "@/components/shared/dashboard/table-skeleton";
import Loader from "@/components/shared/loader";
import SecondaryPagination from "@/components/shared/secondary-pagination";
import { Button } from "@/components/ui/button";
import { useGetHostBookingsQuery } from "@/redux/api/bookingApi/bookingApi";
import { TicketX } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useTransition } from "react";

const BOOKING_STATUS_OPTIONS = [
  { label: "Confirmed", value: "confirmed" },
  { label: "Pending", value: "pending" },
  { label: "Cancelled", value: "cancelled" },
  { label: "Expired", value: "expired" },
];

export default function BookingsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [, startTransition] = useTransition();
  const page = searchParams.get("page") || 1;
  const searchTerm = searchParams.get("searchTerm") || "";
  const status = searchParams.get("status") || "";
  const { data, isLoading, isError } = useGetHostBookingsQuery({
    page: page.toString(),
    limit: 10,
    searchTerm,
    status,
  });

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  if (isLoading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader />
      </div>
    );
  }
  if (isError) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center gap-2 text-red-500">
        <TicketX className="w-12 h-12" />
        <p className="font-medium">Failed to load bookings.</p>
        <p className="text-sm">Please try refreshing the page.</p>
        <Button
          variant="outline"
          onClick={handleRefresh}
          className="cursor-pointer"
        >
          Try again
        </Button>
      </div>
    );
  }

  const bookings = data?.data;
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
