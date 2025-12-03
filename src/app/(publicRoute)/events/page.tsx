import { EventCard } from "@/components/shared/EventCard";
import PrimaryPagination from "@/components/shared/primary-pagination";
import { IApiResponse } from "@/types/apiresponse.types";
import { IEvent } from "@/types/events.types";
import { fetcher } from "@/utils";

type SearchParams = {
  category?: string;
  searchTerm?: string;
  page?: string;
};

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
      <h1 className="text-3xl font-heading font-bold mb-8">All Events</h1>

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
