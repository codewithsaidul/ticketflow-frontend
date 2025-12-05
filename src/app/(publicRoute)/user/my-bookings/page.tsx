"use client";

import BookingCard from "@/components/modules/user/booking-card";
import { Button } from "@/components/ui/button";
import { useGetMyBookingsQuery } from "@/redux/api/bookingApi/bookingApi";
import { Loader2, Ticket, TicketX } from "lucide-react";
import Link from "next/link";

export default function MyBookingsPage() {
  // RTK Query Hook ব্যবহার করে ডাটা আনা
  const { data, isLoading, isError } = useGetMyBookingsQuery(undefined);

  // ১. লোডিং স্টেট
  if (isLoading) {
    return (
      <div className="h-[50vh] flex flex-col items-center justify-center gap-2">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
        <p className="text-muted-foreground">Loading your tickets...</p>
      </div>
    );
  }

  // ২. এরর স্টেট
  if (isError) {
    return (
      <div className="h-[50vh] flex flex-col items-center justify-center gap-2 text-red-500">
        <TicketX className="w-12 h-12" />
        <p className="font-medium">Failed to load bookings.</p>
        <p className="text-sm">Please try refreshing the page.</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="h-[50vh] flex flex-col items-center justify-center gap-2 text-red-500">
        <TicketX className="w-12 h-12" />
        <p className="font-medium">Failed to load bookings.</p>
        <p className="text-sm">Please try refreshing the page.</p>
      </div>
    );
  }

  const bookings = data?.data || [];

  return (
    <div className="space-y-6 container mx-auto py-20">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-heading font-bold font-jakarta">My Bookings</h1>
        <p className="text-muted-foreground">
          Manage your upcoming events and purchase history.
        </p>
      </div>

      {/* ৩. খালি স্টেট (যদি কোনো বুকিং না থাকে) */}
      {bookings?.length === 0 ? (
        <div className="h-[40vh] flex flex-col items-center justify-center gap-4 border-2 border-dashed rounded-xl bg-muted/30">
          <Ticket className="w-16 h-16 text-muted-foreground/50" />
          <div className="text-center">
            <h3 className="text-xl font-bold mb-1">No Bookings Yet</h3>
            <p className="text-muted-foreground mb-4">
              You haven&apos;t booked any events yet.
            </p>
            <Link href="/events">
              <Button>Explore Events</Button>
            </Link>
          </div>
        </div>
      ) : (
        // ৪. বুকিং লিস্ট রেন্ডারিং
        <div className="grid grid-cols-1 gap-6">
          {bookings?.map((booking) => (
            <BookingCard key={booking._id} booking={booking} />
          ))}
        </div>
      )}
    </div>
  );
}
