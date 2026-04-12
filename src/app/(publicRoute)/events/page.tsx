import { EventCard } from "@/components/shared/EventCard";
import FilterSelect from "@/components/shared/filltering/filter-select";
import SearchInput from "@/components/shared/filltering/search-input";
import PrimaryPagination from "@/components/shared/primary-pagination";
import { IApiResponse } from "@/types/apiresponse.types";
import { IEvent } from "@/types/events.types";
import { fetcher } from "@/utils";

type SearchParams = {
  category?: string;
  searchTerm?: string;
  page?: string;
};

const CATEGORIES = [
  { label: "Music", value: "Music" },
  { label: "Tech", value: "Tech" },
  { label: "Sports", value: "Sports" },
  { label: "Workshop", value: "Workshop" },
];

const SORT_OPTIONS = [
  { label: "Newest First", value: "-createdAt" },
  { label: "Oldest First", value: "createdAt" },
  { label: "Price: Low to High", value: "seatLayout.basePrice" },
  { label: "Price: High to Low", value: "-seatLayout.basePrice" },
];

export default async function AllEvents({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const query = new URLSearchParams(
    params as Record<string, string>
  ).toString();

  const res = await fetcher<IApiResponse<IEvent[]>>(`/events?limit=6&${query}`);
  const data = JSON.parse(JSON.stringify(res));
  const events = data?.data || [];
  const meta = data?.meta;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-row flex-wrap justify-between items-center gap-4 mb-8">
        <h1 className="text-3xl font-heading font-bold text-foreground">
          All Events
        </h1>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          {/* Reusable Search */}
          <SearchInput placeholder="Search events..." />

          {/* Reusable Filters */}
          <FilterSelect
            placeholder="Category"
            options={CATEGORIES}
            queryKey="category"
          />
          <FilterSelect
            placeholder="Sort By"
            options={SORT_OPTIONS}
            queryKey="sort"
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {events?.map((event: IEvent) => (
          <EventCard key={event._id} {...event} />
        ))}
      </div>

      {/* Pagination Component (Client Side) */}
      {meta && meta?.totalPages > 1 && (
        <div className="flex justify-center">
          <PrimaryPagination totalPages={meta?.totalPages} />
        </div>
      )}
    </div>
  );
}
