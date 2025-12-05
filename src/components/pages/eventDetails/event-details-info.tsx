import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IEvent } from "@/types/events.types";

export default function EventDetailsInfo({ event }: { event: IEvent }) {
  return (
    <div className="space-y-8">
      {/* Description */}
      <section>
        <h2 className="text-2xl font-bold font-heading mb-4">About This Event</h2>
        <p className="text-muted-foreground leading-relaxed text-lg">
          {event.description || "No description provided."}
        </p>
      </section>

      {/* Organizer Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Organized By</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center gap-4">
          <Avatar className="h-12 w-12 border-2 border-primary/20">
            <AvatarImage src={event.organizer?._id} />
            <AvatarFallback>{event.organizer?.name?.[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-bold text-foreground">{event.organizer?.name}</p>
            <p className="text-sm text-muted-foreground">{event.organizer?.email}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}