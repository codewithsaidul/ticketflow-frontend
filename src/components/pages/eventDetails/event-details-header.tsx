import { Badge } from "@/components/ui/badge";
import { IEvent } from "@/types/events.types";
import { Calendar, MapPin } from "lucide-react";
import Image from "next/image";

export default function EventDetailsHeader({ event }: { event: IEvent }) {
  return (
    <div className="relative h-[400px] w-full">
      {/* Background Image with Overlay */}
      <Image
        src={event.image || "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
        alt={event.title}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-transparent" />

      {/* Content Overlay */}
      <div className="absolute bottom-0 left-0 w-full p-8 container mx-auto">
        <div className="max-w-4xl space-y-4">
          <Badge className="bg-primary text-white hover:bg-primary/90">
            {event.category}
          </Badge>

          <h1 className="text-4xl md:text-6xl font-heading font-bold text-foreground">
            {event.title}
          </h1>

          <div className="flex flex-wrap gap-6 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              <span className="text-lg font-medium">
                {new Date(event.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              <span className="text-lg font-medium">{event.location}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
