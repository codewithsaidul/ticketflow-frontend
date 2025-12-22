import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { EventCard } from "@/components/shared/EventCard";
import { IEvent } from "@/types/events.types";

export default function FeaturedSlider({ events }: { events: IEvent[] }) {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
        active: true
      }}
      className="w-full"
    >
      <CarouselContent className="-ml-4">
        {events.map((event) => (
          <CarouselItem key={event._id} className="pl-4 md:basis-1/2 lg:basis-1/4">
            <div className="p-1">
              <EventCard {...event} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="left-4 bg-background/80 backdrop-blur-sm cursor-pointer" />
      <CarouselNext className="right-4 bg-background/80 backdrop-blur-sm cursor-pointer" />
    </Carousel>
  );
}