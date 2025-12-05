import EventBookingCard from "@/components/pages/eventDetails/event-booking-card";
import EventDetailsHeader from "@/components/pages/eventDetails/event-details-header";
import EventDetailsInfo from "@/components/pages/eventDetails/event-details-info";
import { IApiResponse } from "@/types/apiresponse.types";
import { IEvent } from "@/types/events.types";
import { fetcher } from "@/utils";
import { notFound } from "next/navigation";

export default async function EventDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {

  const slug = (await params).slug;

  const res = await fetcher<IApiResponse<IEvent>>(`/events/${slug}`);
  const event = JSON.parse(JSON.stringify(res.data));

  if (!event) return notFound();
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* 1. Hero / Header Section */}
      <EventDetailsHeader event={event} />

      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 2. Main Content (Left Side - 2 Cols) */}
          <div className="lg:col-span-2 space-y-8">
            <EventDetailsInfo event={event} />
          </div>

          {/* 3. Booking Sidebar (Right Side - 1 Col) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <EventBookingCard event={event} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
