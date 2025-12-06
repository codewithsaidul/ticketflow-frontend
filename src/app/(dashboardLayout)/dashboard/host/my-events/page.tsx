"use client";

import EventsManagementHeader from "@/components/pages/dashboard/events-maangement/event-management-header";
import EventsTable from "@/components/pages/dashboard/events-maangement/events-table";
import RefreshButton from "@/components/shared/dashboard/refresh-btn";
import SearchFilter from "@/components/shared/dashboard/search-fillter";
import SelectFilter from "@/components/shared/dashboard/select-fillter";
import { TableSkeleton } from "@/components/shared/dashboard/table-skeleton";
import SecondaryPagination from "@/components/shared/secondary-pagination";
import { useGetMyEventsQuery } from "@/redux/api/eventApi/eventApi"; // Adjust path
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export const EVENT_STATUS_OPTIONS = [
  { label: "Active", value: "active" },
  { label: "Pending", value: "pending" },
  { label: "Postponed", value: "postponed" },
  { label: "Cancelled", value: "cancelled" },
  { label: "Finished", value: "finished" },
];

// const EVENT_CATEGORY_OPTIONS = [
//   { label: "Music", value: "Music" },
//   { label: "Movie", value: "Movie" },
//   { label: "Sports", value: "Sports" },
//   { label: "Workshop", value: "Workshop" },
// ];

export default function EventsPage() {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || 1;
  const searchTerm = searchParams.get("searchTerm") || "";
  const category = searchParams.get("category") || "";
  const status = searchParams.get("status") || "";

  const { data, isLoading, isError } = useGetMyEventsQuery({
    page: page.toString(),
    limit: 10,
    searchTerm,
    category,
    status,
  });

  if (isLoading) return <div>Loading events...</div>;
  if (isError) return <div>Error loading events.</div>;

  const events = data?.data;
  const meta = data?.meta;

  return (
    <div className="space-y-6 w-full">
      <EventsManagementHeader />

      <div className="flex flex-col xl:flex-row gap-2">
        <div>
          <SearchFilter
            paramName="searchTerm"
            placeholder="Search events by title..."
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {/* <SelectFilter
            paramName="category"
            options={EVENT_CATEGORY_OPTIONS}
            placeholder="Category"
          /> */}
          <SelectFilter
            paramName="status"
            options={EVENT_STATUS_OPTIONS}
            placeholder="Status"
          />
          <RefreshButton />
        </div>
      </div>

      <Suspense fallback={<TableSkeleton columns={6} rows={10} />}>
        <EventsTable events={events || []} />
        <SecondaryPagination
          currentPage={Number(page)}
          totalPages={meta?.totalPages || 1}
        />
      </Suspense>
    </div>
  );
}