import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { IBooking } from "@/types/bookings.types";
import { formatDate } from "@/utils/formatter";
import { CalendarClock, MapPin, Ticket } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Status Colors (Shadcn Compatible)
const statusStyles = {
  paid: "bg-green-100 text-green-700 border-green-200",
  unpaid: "bg-yellow-100 text-yellow-700 border-yellow-200",
  failed: "bg-red-100 text-red-700 border-red-200",
  cancel: "bg-orange-100 text-orange-700 border-orange-200",
};

export default function BookingCard({ booking }: { booking: IBooking }) {
  const { event, payment, seats, totalAmount, status, _id } = booking;
  const paymentStatus = payment?.status || "unpaid";

  // Fallback values
  const imageSrc =
    event.image ||
    "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=2070&auto=format&fit=crop";

  return (
    <div className="group relative w-full bg-card border border-border/60 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col md:flex-row">
      {/* Left: Image Section (Cover) */}
      <div className="relative w-full md:w-1/3 h-48 md:h-auto shrink-0 overflow-hidden">
        <Image
          src={imageSrc}
          alt={event.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />

        {/* Status Badge on Image */}
        <div className="absolute top-3 left-3">
          <Badge
            variant={status === "confirmed" ? "default" : "secondary"}
            className="shadow-md"
          >
            {status.toUpperCase()}
          </Badge>
        </div>

        {/* Price Tag on Image */}
        <div className="absolute bottom-3 left-3 text-white">
          <p className="text-xs opacity-80">Total Paid</p>
          <p className="text-xl font-bold font-jakarta">৳ {totalAmount}</p>
        </div>
      </div>

      {/* Divider (Ticket Tear Effect - Mobile Hidden) */}
      <div className="hidden md:flex flex-col justify-between py-2 bg-card relative z-10 -ml-px">
        <div className="w-4 h-4 rounded-full bg-background border border-border/60 -ml-2" />
        <div className="border-l-2 border-dashed border-border/50 h-full mx-auto" />
        <div className="w-4 h-4 rounded-full bg-background border border-border/60 -ml-2" />
      </div>

      {/* Right: Content Section */}
      <div className="flex-1 p-5 flex flex-col justify-between gap-4">
        {/* Header Info */}
        <div>
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-jakarta font-bold font-heading text-foreground line-clamp-1 mb-2 group-hover:text-primary transition-colors">
              {event.title}
            </h3>
            <div>
              <p className="text-xl font-bold font-jakarta">৳ {totalAmount}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CalendarClock className="w-4 h-4 text-primary" />
              <span>{formatDate(event.date)}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="line-clamp-1">{event.location}</span>
            </div>
          </div>
        </div>

        {/* Seat Info */}
        <div className="bg-muted/30 p-3 rounded-lg border border-border/50 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Ticket className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">
              {seats.length} Seats
            </span>
          </div>
          <div className="flex gap-1">
            {/* প্রথম ৩টা সিট লেবেল দেখাবে */}
            {seats.slice(0, 3).map((seat) => (
              <Badge
                key={seat._id}
                variant="outline"
                className="text-xs font-jakarta"
              >
                {seat.label}
              </Badge>
            ))}
            {seats.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{seats.length - 3}
              </Badge>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-border/40 mt-1">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">
              Payment Status
            </span>
            <Badge
              variant="outline"
              className={cn("mt-1 w-fit", statusStyles[paymentStatus])}
            >
              {paymentStatus.toUpperCase()}
            </Badge>
          </div>

          <div className="flex gap-2">
            {status === "confirmed" && (
              <Button
                size="sm"
                variant="default"
                asChild
                className="shadow-md shadow-primary/20"
              >
                <Link href={`/user/bookings/${_id}`}>Download Ticket</Link>
              </Button>
            )}
            {paymentStatus === "failed" && (
              <Button size="sm" variant="destructive">
                Retry
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
