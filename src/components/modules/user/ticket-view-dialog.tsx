"use client";

import InfoRow from "@/components/shared/info-row";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useGetTicketDetailsQuery } from "@/redux/api/bookingApi/bookingApi";
import { ISeat } from "@/types";
import { Download, Loader2, Ticket, Calendar, MapPin } from "lucide-react";
import Image from "next/image";
import { formatDate } from "@/utils/formatter";
import toast from "react-hot-toast";

const handleDownload = (qrCodeData: string, bookingId: string) => {
  const downloadLink = document.createElement("a");
  downloadLink.href = qrCodeData;
  downloadLink.download = `Velotix_Ticket_${bookingId}.png`;

  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);

  toast.success("Simulating PDF download. A PNG of the QR code was downloaded.");
};

export default function TicketViewDialog({
  open,
  onClose,
  bookingId,
}: {
  open: boolean;
  onClose: () => void;
  bookingId: string;
}) {
  const { data, isLoading, isSuccess } = useGetTicketDetailsQuery(bookingId, {
    skip: !open || !bookingId,
  });

  if (isLoading) {
    return (
      <div className="p-8 text-center">
        <Loader2 className="animate-spin mx-auto w-6 h-6" /> Loading Ticket...
      </div>
    );
  }

  const ticketData = data?.data;
  const bookingDetails = ticketData?.bookingDetails;
  const event = bookingDetails?.event;

  const totalAmount = bookingDetails?.totalAmount.toFixed(2) || "N/A";
  const seatLabels =
    bookingDetails?.seats?.map((s: ISeat) => s.label).join(", ") || "N/A";
  const eventDate = event?.date ? formatDate(event.date) : "N/A";

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle className="flex items-center gap-2">
            <Ticket className="w-5 h-5 text-primary" /> Your E-Ticket
          </DialogTitle>
        </DialogHeader>

        {isSuccess && ticketData && (
          <div className="flex flex-col items-center p-6">
            <h3 className="text-xl font-bold mb-2">{event?.title}</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Booking ID:{" "}
              {bookingDetails?.transactionId?.slice(-6).toUpperCase()}
            </p>

            {/* QR Code Display Area */}
            <div className="p-4 border border-border/50 rounded-lg bg-card mb-6">
              <Image
                src={ticketData?.qrCodeImage}
                alt="QR Code for Ticket"
                width={200}
                height={200}
                className="w-48 h-48 mx-auto object-contain"
                // ⚠️ next/image settings need to be checked in next.config.ts
              />
            </div>

            {/* Ticket Details Summary */}
            <div className="w-full space-y-3 text-sm">
              {/* 🔥 Event Time & Place ADDED */}
              <InfoRow
                label="Date & Time"
                value={
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" /> {eventDate}
                  </span>
                }
              />
              <InfoRow
                label="Location"
                value={
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" /> {event?.location || "N/A"}
                  </span>
                }
              />
              <Separator className="my-3" />

              <InfoRow label="Seats" value={seatLabels} />
              <InfoRow label="Total Paid" value={`৳${totalAmount}`} />
              <InfoRow label="Holder" value={bookingDetails?.user?.name} />
            </div>

            <Separator className="my-6" />

            <Button
              className="w-full gap-2 cursor-pointer"
              onClick={() => handleDownload(ticketData.qrCodeImage, bookingId)} // 🔥 Download Logic
            >
              <Download className="w-4 h-4" /> Download PDF
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
