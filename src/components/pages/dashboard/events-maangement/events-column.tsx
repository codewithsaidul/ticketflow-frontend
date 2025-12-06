"use client";

import { DateCell } from "@/components/shared/dashboard/cell/date-cell";
import { Column } from "@/components/shared/dashboard/reusable-table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { IEvent } from "@/types";
import { MapPin, Users } from "lucide-react";
import Image from "next/image";

export const eventColumns: Column<IEvent>[] = [
  {
    header: "Event",
    accessor: (event) => (
      <div className="flex items-center gap-3">
        <div className="relative h-12 w-16 rounded-md overflow-hidden bg-muted">
          {event.image ? (
            <Image
              src={event.image}
              alt={event.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center bg-gray-200 text-xs text-gray-500">
              No Img
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <span
            className="font-medium text-sm truncate max-w-[180px]"
            title={event.title}
          >
            {event.title}
          </span>
          <span className="text-xs text-muted-foreground">
            {event.category}
          </span>
        </div>
      </div>
    ),
  },
  {
    header: "Location",
    accessor: (event) => (
      <div className="flex items-center gap-1 text-sm text-muted-foreground">
        <MapPin className="h-3 w-3" />
        <span className="truncate max-w-[150px]" title={event.location}>
          {event.location}
        </span>
      </div>
    ),
  },
  {
    header: "Date",
    accessor: (event) => <DateCell date={event.date} />,
  },
  {
    header: "Capacity",
    accessor: (event) => (
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1 text-sm">
          <Users className="h-3 w-3 text-blue-500" />
          <span>{event.maxParticipants}</span>
        </div>
        {event.mode === "ASSIGNED" && (
          <Badge
            variant="secondary"
            className="text-[10px] px-1 py-0 h-4 w-fit"
          >
            Seated
          </Badge>
        )}
      </div>
    ),
  },
  {
    header: "Base Price",
    accessor: (event) => (
      <span className="text-sm font-semibold text-green-600">
        ${event.seatLayout?.basePrice || 0}
      </span>
    ),
  },
  {
    header: "Status",
    accessor: (event) => (
      <Badge
        className={cn(
          "capitalize",
          event.status === "active" && "bg-green-600 hover:bg-green-700",
          event.status === "draft" && "bg-gray-500 hover:bg-gray-600",
          event.status === "completed" && "bg-blue-600 hover:bg-blue-700",
          event.isDeleted && "bg-destructive hover:bg-destructive/90"
        )}
      >
        {event.isDeleted ? "Deleted" : event.status}
      </Badge>
    ),
  },
];
