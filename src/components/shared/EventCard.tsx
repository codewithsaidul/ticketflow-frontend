"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin } from "lucide-react";
import Image from "next/image";
import { IEvent } from "@/types/events.types";
import Link from "next/link";
import { formatDate } from "@/utils/formatter";

export function EventCard({
  title,
  slug,
  date,
  location,
  seatLayout,
  image,
  category,
}: IEvent) {
  const price = seatLayout.basePrice;
  return (
    <div className="group relative overflow-hidden rounded-lg glass hover:border-primary/50 transition-all duration-300 h-full flex flex-col">
      {/* Image Container */}
      <div className="relative h-48 sm:h-64 overflow-hidden">
        <Link href={`/events/${slug}`} className="cursor-pointer">
          <Image
            src={
              image ||
              "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            alt={title}
            fill
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </Link>
        <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <Badge className="absolute top-3 right-3 bg-primary/80 text-primary-foreground">
          {category}
        </Badge>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <Link href={`/events/${slug}`} className="cursor-pointer">
          <h3 className="text-lg font-semibold text-foreground hover:text-primary transition-all hover:underline line-clamp-2">
            {title} ggfdgfd
          </h3>
        </Link>

        <div className="space-y-2 my-3 flex-1 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(date)}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span className="truncate">{location}</span>
          </div>
        </div>

        {/* Price & Button */}
        <div className="flex items-center justify-between pt-4 border-t border-primary/10">
          <div className="flex items-center gap-1">
            <span className="text-2xl font-bold text-primary">৳{price}</span>
          </div>
          <Button
            size="sm"
            className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer"
          >
            <Link href={`/booking/${slug}`}>Book Now</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
