"use client";

import SeatMap from "@/components/pages/booking/seat-map";
import { useCreateBookingMutation } from "@/redux/api/bookingApi/bookingApi";
import { useGetSingleEventQuery } from "@/redux/api/eventApi/eventApi";
import { useGetEventSeatsQuery } from "@/redux/api/seatApi/seatApi";
import { IApiErrorResponse } from "@/types/apiresponse.types";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import OrderSummary from "./order-summary";
import { ISeat } from "@/types";

export default function Booking({ slug }: { slug: string }) {
  const {
    data: eventData,
    isLoading: isEventLoading,
    refetch,
  } = useGetSingleEventQuery(slug);
  const { data: seatData, isLoading: isSeatLoading } = useGetEventSeatsQuery(
    eventData?._id,
    {
      pollingInterval: 30000,
    }
  );

  const [createBooking, { isLoading: isBookingLoading }] =
    useCreateBookingMutation();
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const event = eventData;
  const seats = seatData?.data || [];
  const meta = seatData?.meta;

  const handleSeatClick = (seatId: string) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats((prev) => prev.filter((id) => id !== seatId));
    } else {
      if (selectedSeats.length >= 4) {
        toast.error("You can only book up to 4 seats at a time.");
        return;
      }
      setSelectedSeats((prev) => [...prev, seatId]);
    }
  };

  const basePrice = meta?.basePrice || 0;
  const totalPrice = selectedSeats.length * basePrice;
  const vat = totalPrice * 0.05; // 5% VAT (Optional)
  const grandTotal = totalPrice + vat;

  const handleCheckout = async () => {
    try {
      const res = await createBooking({
        eventId: eventData._id,
        seatIds: selectedSeats,
      }).unwrap();

      toast.success("Booking initiated! Redirecting to payment...");

      if (res.data?.paymentUrl) {
        window.location.href = res.data.paymentUrl; // SSLCommerz Redirect
      }
    } catch (error) {
      const err = error as IApiErrorResponse;
      toast.error(err.data?.message || "Booking failed. Please try again.");
    }
  };

  if (isEventLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="animate-spin w-10 h-10 text-primary" />
      </div>
    );
  }

  const displaySeats = seats
    .filter((seat: ISeat) => {
      return selectedSeats.includes(seat._id);
    })
    .map((seat: ISeat) => {
      return {
        id: seat._id,
        label: seat.label,
        price: seat.price || meta?.basePrice,
        lockedBy: seat?.lockedBy || ""
      };
    });

  return (
    <div className="bg-muted/10 min-h-screen py-10">
      <div className="container mx-auto px-4">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-foreground">
            Complete Your Booking
          </h1>
          <p className="text-muted-foreground">
            Select your preferred seats and proceed to payment.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-8">
          {/* 🔥 LEFT SIDE: SEAT MAP (2 Columns) */}
          <div className="lg:col-span-2 space-y-6">
            <SeatMap
              eventId={eventData?._id}
              refetch={refetch}
              isLoading={isSeatLoading}
              seats={seats}
              meta={meta}
              selectedSeats={selectedSeats}
              onSeatClick={handleSeatClick}
            />
          </div>

          {/* 🔥 RIGHT SIDE: BOOKING SUMMARY (Sticky) */}
          <div className="lg:col-span-1">
            <OrderSummary
              eventTitle={event?.title}
              eventImage={event?.image}
              eventDate={event?.date}
              eventLocation={event?.location}
              selectedSeats={displaySeats}
              unitPrice={basePrice}
              totalPrice={totalPrice}
              vat={vat}
              grandTotal={grandTotal}
              isLoading={isBookingLoading}
              onProceed={handleCheckout}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
