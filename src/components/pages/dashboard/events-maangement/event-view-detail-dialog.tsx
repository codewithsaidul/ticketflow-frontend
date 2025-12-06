"use client";

import InfoRow from "@/components/shared/info-row";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { IEvent } from "@/types";
import { formatDate } from "@/utils/formatter"; // Adjust path
import {
  Armchair,
  Calendar,
  DollarSign,
  Grid3X3,
  Layers,
  MapPin,
  Tag,
  Users,
} from "lucide-react";
import Image from "next/image";

interface IEventViewDialogProps {
  open: boolean;
  onClose: () => void;
  event: IEvent | null;
}

const EventViewDetailDialog = ({
  open,
  onClose,
  event,
}: IEventViewDialogProps) => {
  if (!event) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] sm:max-w-4xl max-h-[85vh] flex flex-col p-0 overflow-hidden">
        <DialogHeader className="px-4 py-4 sm:px-6 sm:pt-6 sm:pb-4 shrink-0">
          <DialogTitle>Event Details</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-4 pb-4 sm:px-6 sm:pb-6">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 p-4 sm:p-6 bg-linear-to-br from-indigo-50 to-blue-50 dark:from-indigo-950 dark:to-blue-950 rounded-lg mb-6">
            <div className="relative h-32 w-full sm:w-48 shrink-0 rounded-lg overflow-hidden border-2 border-white shadow-lg">
              {event.image ? (
                <Image
                  src={event.image}
                  alt={event.title}
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
                    {event.title}
                  </h2>
                  <p className="text-muted-foreground mb-3 flex items-center justify-center sm:justify-start gap-2 text-sm sm:text-base">
                    <MapPin className="h-4 w-4" />
                    {event.location}
                  </p>
                  <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                    <Badge variant="outline">{event.category}</Badge>
                    <Badge variant="secondary" className="capitalize">
                      Mode: {event.mode.toLowerCase()}
                    </Badge>
                  </div>
                </div>
                <div className="flex flex-col gap-2 items-center sm:items-end w-full sm:w-auto mt-2 sm:mt-0">
                  <Badge
                    className={
                      event.status === "active" ? "bg-green-600" : "bg-gray-500"
                    }
                  >
                    {event.status.toUpperCase()}
                  </Badge>
                  <span className="text-[10px] sm:text-xs text-muted-foreground font-mono">
                    Created: {formatDate(event.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Tag className="h-5 w-5 text-blue-600" />
                <h3 className="font-semibold text-lg">General Info</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <Calendar className="h-4 w-4 mt-1 text-muted-foreground shrink-0" />
                  <InfoRow label="Date" value={formatDate(event.date)} />
                </div>
                <div className="flex items-start gap-3">
                  <Users className="h-4 w-4 mt-1 text-muted-foreground shrink-0" />
                  <InfoRow
                    label="Participants"
                    value={`${event.minParticipants} - ${event.maxParticipants}`}
                  />
                </div>
                <div className="flex items-start gap-3 md:col-span-2">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    <span className="font-medium text-foreground block mb-1">
                      Description:
                    </span>
                    {event.description}
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Seating & Pricing */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Armchair className="h-5 w-5 text-purple-600" />
                <h3 className="font-semibold text-lg">Seating & Pricing</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <DollarSign className="h-4 w-4 mt-1 text-muted-foreground shrink-0" />
                  <InfoRow
                    label="Base Price"
                    value={`$${event.seatLayout.basePrice}`}
                  />
                </div>
                {event.mode === "ASSIGNED" && (
                  <>
                    <div className="flex items-start gap-3">
                      <Grid3X3 className="h-4 w-4 mt-1 text-muted-foreground shrink-0" />
                      <InfoRow
                        label="Grid Size"
                        value={`${event.seatLayout.rows} Rows x ${event.seatLayout.cols} Cols`}
                      />
                    </div>
                    <div className="flex items-start gap-3">
                      <Layers className="h-4 w-4 mt-1 text-muted-foreground shrink-0" />
                      <InfoRow
                        label="Matrix Configured"
                        value={
                          event.seatLayout.matrix.length > 0 ? "Yes" : "No"
                        }
                      />
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Zones (If any) */}
            {event.zones && event.zones.length > 0 && (
              <>
                <Separator />
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Layers className="h-5 w-5 text-orange-600" />
                    <h3 className="font-semibold text-lg">Zones</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {event.zones.map((zone, idx) => (
                      <div
                        key={idx}
                        className="p-3 border rounded-md bg-card shadow-sm"
                      >
                        <div className="font-medium">{zone.name}</div>
                        <div className="text-sm text-muted-foreground">
                          Cap: {zone.capacity} | Sold: {zone.sold}
                        </div>
                        <div className="text-sm font-semibold text-green-600 mt-1">
                          ${zone.price}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventViewDetailDialog;