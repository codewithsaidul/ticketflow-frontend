"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calendar, CreditCard, Loader2, Lock, MapPin } from "lucide-react";
import Image from "next/image";

// 🔥 ইন্টারফেস আপডেট
interface SelectedSeat {
  id: string;
  label: string;
  price: number;
}

interface OrderSummaryProps {
  eventTitle: string;
  eventImage: string;
  eventDate: string;
  eventLocation: string;

  selectedSeats: SelectedSeat[]; // 🔥 এখন এটা অবজেক্টের অ্যারে

  unitPrice: number;
  totalPrice: number;
  vat: number;
  grandTotal: number;
  isLoading: boolean;
  onProceed: () => void;
}

export default function OrderSummary({
  eventTitle,
  eventImage,
  eventDate,
  eventLocation,
  selectedSeats,
  unitPrice,
  totalPrice,
  vat,
  grandTotal,
  isLoading,
  onProceed,
}: OrderSummaryProps) {
  return (
    <Card className="w-full pt-0 shadow-xl border-primary/20 overflow-hidden sticky top-24">
      {/* Header Image */}
      <div className="relative h-32 w-full">
        <Image
          src={eventImage || "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
          alt="Event Cover"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <h3 className="text-white font-bold text-xl px-4 text-center font-heading">
            Booking Summary
          </h3>
        </div>
      </div>

      <CardContent className="p-6 space-y-6">
        {/* Event Details */}
        <div className="space-y-2">
          <h2 className="font-bold text-lg leading-tight line-clamp-2">
            {eventTitle}
          </h2>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4 text-primary" />
            <span>{new Date(eventDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="line-clamp-1">{eventLocation}</span>
          </div>
        </div>

        <Separator />

        {/* Seat Details (Updated Loop) */}
        <div>
          <p className="text-sm font-medium mb-3 text-muted-foreground">
            Selected Seats
          </p>
          {selectedSeats.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {selectedSeats.map((seat) => (
                <Badge
                  key={seat.id}
                  variant="secondary"
                  className="px-3 py-1 font-mono font-bold bg-primary/10 text-primary border-primary/20"
                >
                  {seat.label}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-sm text-yellow-600 italic flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
              </span>
              Please select seats from the map
            </p>
          )}
        </div>

        <Separator />

        {/* Billing */}
        <div className="space-y-3 text-sm">
          <div className="flex justify-between font-medium">
            <span className="text-muted-foreground">Unit Price</span>
            <span>৳ {unitPrice}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">
              Subtotal ({selectedSeats.length} seats)
            </span>
            <span>৳ {totalPrice}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">
              Service Charge & VAT (5%)
            </span>
            <span>৳ {vat.toFixed(2)}</span>
          </div>

          <div className="flex justify-between items-center pt-2 text-lg font-bold text-primary border-t">
            <span>Total Payable</span>
            <span>৳ {grandTotal.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>

      {/* Action Footer */}
      <CardFooter className="flex-col gap-3 bg-muted/20 p-6 pt-0">
        <Button
          size="lg"
          className="w-full text-md font-bold shadow-lg shadow-primary/20 cursor-pointer"
          disabled={selectedSeats.length === 0 || isLoading}
          onClick={onProceed}
        >
          {isLoading ? (
            <Loader2 className="animate-spin mr-2" />
          ) : (
            <>
              Proceed to Payment <CreditCard className="ml-2 w-4 h-4" />
            </>
          )}
        </Button>
        <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
          <Lock className="w-3 h-3" />
          <span>Secure transaction via SSLCommerz</span>
        </div>
      </CardFooter>
    </Card>
  );
}
