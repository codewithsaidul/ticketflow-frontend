"use client";

import { ReusableTable } from "@/components/shared/dashboard/reusable-table";
import { IEvent } from "@/types";
import { useState } from "react";
import EventViewDetailDialog from "./event-view-detail-dialog";
import { eventColumns } from "./events-column";
import toast from "react-hot-toast";

const EventsTable = ({ events }: { events: IEvent[] }) => {
  const [viewingEvent, setViewingEvent] = useState<IEvent | null>(null);

  const handleView = (event: IEvent) => {
    setViewingEvent(event);
  };

  const handleEdit = (event: IEvent) => {
    // Navigate to edit page or open edit modal
    console.log("Edit event", event._id);
  };

  const handleDelete = (event: IEvent) => {
    // Implement delete logic with confirmation
    toast.error(`Delete requested for ${event.title}`);
  };

  return (
    <>
      <ReusableTable
        data={events}
        columns={eventColumns}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        getRowKey={(event) => event._id}
        emptyMessage="No events found"
      />

      <EventViewDetailDialog
        open={!!viewingEvent}
        onClose={() => setViewingEvent(null)}
        event={viewingEvent}
      />
    </>
  );
};

export default EventsTable;