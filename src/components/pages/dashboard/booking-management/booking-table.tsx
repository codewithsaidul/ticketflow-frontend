"use client";
import { ReusableTable } from "@/components/shared/dashboard/reusable-table";
import { IBooking } from "@/types/bookings.types";
import { useState } from "react";
import BookingViewDetailDialog from "./booking-view-detail-dialog";
import { bookingColumns } from "./booking.column";

const BookingsTable = ({ bookings }: { bookings: IBooking[] }) => {
  const [viewingBooking, setViewingBooking] = useState<IBooking | null>(null);

  const handleView = (booking: IBooking) => {
    setViewingBooking(booking);
  };

  const handleDelete = (booking: IBooking) => {
    console.log("Delete booking", booking._id);
  };

  return (
    <>
      <ReusableTable
        data={bookings}
        columns={bookingColumns}
        onView={handleView}
        onDelete={handleDelete}
        getRowKey={(booking) => booking._id}
        emptyMessage="No bookings found"
      />

      {/* View Booking Detail Dialog */}
      <BookingViewDetailDialog
        open={!!viewingBooking}
        onClose={() => setViewingBooking(null)}
        booking={viewingBooking}
      />
    </>
  );
};

export default BookingsTable;
