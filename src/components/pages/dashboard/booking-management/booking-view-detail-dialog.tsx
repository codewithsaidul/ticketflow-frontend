"use client";

import InfoRow from "@/components/shared/info-row";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ISeat } from "@/types";
import { IBooking } from "@/types/bookings.types";
import { formatDate } from "@/utils/formatter";
import {
  Calendar,
  CreditCard,
  Hash,
  MapPin,
  Ticket,
  User,
  Clock,
} from "lucide-react";
import Image from "next/image";

interface IBookingViewDialogProps {
  open: boolean;
  onClose: () => void;
  booking: IBooking | null;
}

const BookingViewDetailDialog = ({
  open,
  onClose,
  booking,
}: IBookingViewDialogProps) => {
  if (!booking) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>

      <DialogContent className="w-[95vw] sm:max-w-4xl max-h-[85vh] flex flex-col p-0 overflow-hidden">
        <DialogHeader className="px-4 py-4 sm:px-6 sm:pt-6 sm:pb-4 shrink-0">
          <DialogTitle>Booking Details</DialogTitle>
        </DialogHeader>

        <ScrollArea className="flex-1 w-full h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="px-4 pb-4 sm:px-6 sm:pb-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 p-4 sm:p-6 bg-linear-to-br from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950 rounded-lg mb-6">
              
              {/* Added 'relative' because Next/Image fill requires it */}
              <div className="relative h-24 w-36 shrink-0 rounded-lg overflow-hidden border-2 border-white shadow-lg">
                {booking.event.image ? (
                  <Image
                    src={booking.event.image}
                    alt={booking.event.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                    <Calendar className="h-8 w-8 text-gray-400" />
                  </div>
                )}
              </div>
  
              <div className="flex-1 text-center sm:text-left w-full">
                <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-2 sm:gap-0">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold mb-1">
                      {booking.event.title}
                    </h2>
                    <p className="text-muted-foreground mb-2 flex items-center justify-center sm:justify-start gap-2 text-sm sm:text-base">
                      <MapPin className="h-4 w-4" />
                      {booking.event.location}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 items-center sm:items-end w-full sm:w-auto">
                    <Badge
                      variant={
                        booking.status === "confirmed" ? "default" : "secondary"
                      }
                      className="text-sm sm:text-base px-4 py-1 capitalize"
                    >
                      {booking.status}
                    </Badge>
                    <span className="text-[10px] sm:text-xs text-muted-foreground font-mono break-all">
                      ID: {booking._id}
                    </span>
                  </div>
                </div>
              </div>
            </div>
  
            {/* Information Grid */}
            <div className="space-y-6">
              {/* Payment & Transaction Info */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <CreditCard className="h-5 w-5 text-green-600" />
                  <h3 className="font-semibold text-lg">Payment Information</h3>
                </div>
                {/* Changed grid-cols-1 for mobile to ensure long text doesn't break layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                  <div className="flex items-start gap-3 overflow-hidden">
                    <Hash className="h-4 w-4 mt-1 text-muted-foreground shrink-0" />
                    <InfoRow
                      label="Transaction ID"
                      value={
                        booking.payment?.transactionId ||
                        booking.transactionId ||
                        "N/A"
                      }
                      // Optional: Pass a class to truncate long IDs if InfoRow supports it
                    />
                  </div>
                  <div className="flex items-start gap-3">
                    <CreditCard className="h-4 w-4 mt-1 text-muted-foreground shrink-0" />
                    <InfoRow
                      label="Amount Paid"
                      value={`$${booking.totalAmount}`}
                    />
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="h-4 w-4 mt-1 text-muted-foreground shrink-0" />
                    <InfoRow
                      label="Payment Status"
                      value={booking.payment?.status as string}
                    />
                  </div>
                  <div className="flex items-start gap-3">
                    <User className="h-4 w-4 mt-1 text-muted-foreground shrink-0" />
                    {/* Handle object vs string safely just in case */}
                    <InfoRow 
                      label="User Name" 
                      value={typeof booking.user === 'object' ? booking.user.name : booking.user} 
                    />
                  </div>
                </div>
              </div>
  
              <Separator />
  
              {/* Seat Information */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Ticket className="h-5 w-5 text-blue-600" />
                  <h3 className="font-semibold text-lg">
                    Reserved Seats ({booking.seats.length})
                  </h3>
                </div>
  
                {booking.seats && booking.seats.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {booking.seats.map((seat: ISeat, index: number) => (
                      <div
                        key={index}
                        className="flex flex-col p-3 border rounded-md bg-card shadow-sm text-center sm:text-left"
                      >
                        <span className="text-xs text-muted-foreground uppercase">
                          Seat
                        </span>
                        <span className="font-bold text-lg">
                          {seat.label || `Seat #${index + 1}`}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 bg-muted/50 rounded-lg text-center text-muted-foreground">
                    No specific seat data available.
                  </div>
                )}
              </div>
  
              <Separator />
  
              {/* Event Timing */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="h-5 w-5 text-purple-600" />
                  <h3 className="font-semibold text-lg">Schedule</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Calendar className="h-4 w-4 mt-1 text-muted-foreground shrink-0" />
                    <InfoRow
                      label="Event Date"
                      value={formatDate(booking.event.date)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default BookingViewDetailDialog;