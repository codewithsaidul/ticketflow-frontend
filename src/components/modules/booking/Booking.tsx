"use client";

import SeatMap from "@/components/pages/booking/seat-map";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCreateBookingMutation } from "@/redux/api/bookingApi/bookingApi";
import { useGetSingleEventQuery } from "@/redux/api/eventApi/eventApi";
import { useGetEventSeatsQuery } from "@/redux/api/seatApi/seatApi";
import { IApiErrorResponse } from "@/types/apiresponse.types";
import { Calendar, Loader2, MapPin, Ticket } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Booking({ slug }: { slug: string }) {
  const { data: eventData, isLoading: isEventLoading } = useGetSingleEventQuery(slug);
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
        const err = error as IApiErrorResponse
      console.log("🚀 ~ handleCheckout ~ err:", err)
      toast.error(err.data?.message || "Booking failed. Please try again.");
    }
  };

if (isEventLoading) {
    return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin w-10 h-10 text-primary" /></div>;
  }

  return (
    <div className="bg-muted/10 min-h-screen py-10">
      <div className="container mx-auto px-4">
        
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-foreground">
            Complete Your Booking
          </h1>
          <p className="text-muted-foreground">Select your preferred seats and proceed to payment.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* 🔥 LEFT SIDE: SEAT MAP (2 Columns) */}
          <div className="lg:col-span-2 space-y-6">
            <SeatMap
              isLoading={isSeatLoading}
              seats={seats}
              meta={meta}
              selectedSeats={selectedSeats}
              onSeatClick={handleSeatClick}
            />
          </div>

          {/* 🔥 RIGHT SIDE: BOOKING SUMMARY (Sticky) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              
              {/* Event Info Card */}
              <Card className="p-6 border-l-4 border-l-primary shadow-sm">
                <h3 className="text-xl font-bold mb-2 font-heading">{event?.title}</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(event?.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{event?.location}</span>
                  </div>
                </div>
              </Card>

              {/* Cost Calculation Card */}
              <Card className="p-6 shadow-lg border-primary/10">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Ticket className="w-5 h-5 text-primary" /> Order Summary
                </h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {selectedSeats.length} x Seat (৳{basePrice})
                    </span>
                    <span className="font-medium">৳ {totalPrice}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">VAT (5%)</span>
                    <span className="font-medium">৳ {vat}</span>
                  </div>
                  <div className="border-t pt-3 flex justify-between items-center">
                    <span className="font-bold text-lg">Total</span>
                    <span className="font-bold text-2xl text-primary">
                      ৳ {grandTotal}
                    </span>
                  </div>
                </div>

                <Button
                  size="lg"
                  className="w-full text-lg font-bold shadow-lg shadow-primary/25"
                  disabled={selectedSeats.length === 0 || isBookingLoading}
                  onClick={handleCheckout}
                >
                  {isBookingLoading ? (
                    <Loader2 className="animate-spin mr-2" />
                  ) : (
                    "Pay Now"
                  )}
                </Button>
                
                <p className="text-xs text-center text-muted-foreground mt-3">
                  Clicking &quot;Pay Now&quot; will lock your seats for 5 minutes.
                </p>
              </Card>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
