import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { IEvent } from "@/types/events.types";
import { Ticket } from "lucide-react";
import Link from "next/link";

export default function EventBookingCard({ event }: { event: IEvent }) {
  const price = event.seatLayout?.basePrice || event.zones?.[0]?.price || 0;
  const isAvailable = event.status === "active";

  return (
    <Card className="shadow-lg border-primary/10 overflow-hidden">
      <CardHeader className="bg-muted/50 pb-4">
        <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">
          Starting From
        </p>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold text-primary">৳ {price}</span>
          <span className="text-muted-foreground">/ person</span>
        </div>
      </CardHeader>
      
      <CardContent className="pt-6 space-y-4">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Mode</span>
          <span className="font-medium">{event.mode}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Availability</span>
          <span className="text-green-600 font-bold">Selling Fast!</span>
        </div>
      </CardContent>

      <CardFooter>
        {isAvailable ? (
          <Link href={`/dashboard/user/book-event/${event._id}`} className="w-full">
            <Button size="lg" className="w-full text-lg font-bold gap-2">
              <Ticket className="w-5 h-5" />
              Book Tickets Now
            </Button>
          </Link>
        ) : (
          <Button size="lg" disabled className="w-full">
            Event Unavailable
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}