"use client";

import { DateCell } from "@/components/shared/dashboard/cell/date-cell";
import { Column } from "@/components/shared/dashboard/reusable-table";
import { Badge } from "@/components/ui/badge";
import { IBooking } from "@/types/bookings.types";
import { cn } from "@/lib/utils"; // Assuming you have a class merger
import { MapPin, Ticket } from "lucide-react";
import Image from "next/image";

export const bookingColumns: Column<IBooking>[] = [
  {
    header: "Event Info",
    accessor: (booking) => (
      <div className="flex items-center gap-3">
        {booking.event.image && (
          <Image
            src={booking.event.image} 
            alt={booking.event.title}
            fill
            className="h-10 w-10 rounded-md object-cover"
          />
        )}
        <div className="flex flex-col">
          <span className="font-medium text-sm">{booking.event.title}</span>
          <div className="flex items-center text-xs text-muted-foreground gap-1">
            <MapPin className="h-3 w-3" />
            <span className="truncate max-w-[150px]">{booking.event.location}</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    header: "Customer",
    accessor: (booking) => (
      <div className="flex flex-col">
        <span className="text-base text-muted-foreground truncate max-w-[100px]">
          {booking.user.name}
        </span>
      </div>
    ),
  },
  {
    header: "Seats",
    accessor: (booking) => (
      <div className="flex items-center gap-1">
        <Ticket className="h-4 w-4 text-blue-500" />
        <span className="text-sm font-medium">
          {booking.seats?.length || 0}
        </span>
      </div>
    ),
  },
  {
    header: "Amount",
    accessor: (booking) => (
      <span className="text-sm font-semibold text-green-600">
        ${booking.totalAmount}
      </span>
    ),
  },
  {
    header: "Payment",
    accessor: (booking) => {
      const status = booking.payment?.status;
      return (
        <Badge
          variant="outline"
          className={cn(
            "capitalize",
            status === "paid" && "bg-green-100 text-green-800 border-green-200",
            status === "unpaid" && "bg-yellow-100 text-yellow-800 border-yellow-200",
            status === "failed" && "bg-red-100 text-red-800 border-red-200"
          )}
        >
          {status}
        </Badge>
      );
    },
  },
  {
    header: "Booking Status",
    accessor: (booking) => {
      const status = booking.status;
      return (
        <Badge
          className={cn(
            "capitalize",
            status === "confirmed" && "bg-blue-600 hover:bg-blue-700",
            status === "pending" && "bg-yellow-500 hover:bg-yellow-600",
            status === "cancelled" && "bg-red-500 hover:bg-red-600",
            status === "expired" && "bg-gray-500 hover:bg-gray-600"
          )}
        >
          {status}
        </Badge>
      );
    },
  },
  {
    header: "Booked On",
    accessor: (booking) => <DateCell date={booking.event.date} />, // Or booking createdAt if available
  },
];