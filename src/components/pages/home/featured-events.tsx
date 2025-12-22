import { Button } from "@/components/ui/button";
import { IApiResponse } from "@/types/apiresponse.types";
import { IEvent } from "@/types/events.types";
import { fetcher } from "@/utils";
import Link from "next/link";
import FeaturedSlider from "./featured-slider";

export default async function FeaturedEvents() {
  const events = await fetcher<IApiResponse<IEvent[]>>("/events?limit=6");
  const rawEvents = events?.data || [];
  const actualEvents = JSON.parse(JSON.stringify(rawEvents));

  return (
    <section className="relative w-full py-20 px-4 lg:px-0">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-12 space-y-4">
          <div className="inline-block">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">
              Featured
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground">
            Trending <span className="gradient-text">Now</span>
          </h2>
          <p className="text-lg text-muted-foreground w-full max-w-2xl">
            Discover the hottest events happening this season. Book your tickets
            before they sell out.
          </p>
        </div>

        {/* Carousel */}
        <FeaturedSlider events={actualEvents} />

        <div className="flex justify-center mt-12">
          <Button asChild size="lg" className="cursor-pointer text-center min-h-12 mx-auto">
            <Link href="/events">Browse Events</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
