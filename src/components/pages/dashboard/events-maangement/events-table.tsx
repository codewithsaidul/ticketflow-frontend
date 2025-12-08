"use client";

import { ReusableTable } from "@/components/shared/dashboard/reusable-table";
import { IEvent } from "@/types";
import { useState, useTransition } from "react";
import EventViewDetailDialog from "./event-view-detail-dialog";
import { eventColumns } from "./events-column";
import toast from "react-hot-toast";
import EventEditDialog from "./event-edit-dialog";
import { useDeleteEventMutation } from "@/redux/api/eventApi/eventApi";
import DeleteConfirmationDialog from "@/components/shared/delete-confirm-dialog";
import { useRouter } from "next/navigation";

const EventsTable = ({ events }: { events: IEvent[] }) => {
  const [viewingEvent, setViewingEvent] = useState<IEvent | null>(null);
  const [editEvent, setEditEvent] = useState<IEvent | null>(null);
  const [deletingEvent, setDeletingEvent] = useState<IEvent | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [deleteEvent] = useDeleteEventMutation();

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleView = (event: IEvent) => {
    setViewingEvent(event);
  };

  const handleEdit = (event: IEvent) => {
    setEditEvent(event);
  };

    const handleDelete = (event: IEvent) => {
    setDeletingEvent(event);
  };

  const confirmDelete = async () => {
    if (!deletingEvent) return;

    setIsDeleting(true);
    const result = await deleteEvent(deletingEvent._id!).unwrap();
    setIsDeleting(false);

    if (result.success) {
      toast.success(result.message || "Event deleted successfully");
      setDeletingEvent(null);
      handleRefresh();
    } else {
      toast.error(result.message || "Failed to delete event");
    }
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

      <EventEditDialog
        open={!!editEvent}
        onClose={() => setEditEvent(null)}
        event={editEvent}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={!!deletingEvent}
        onOpenChange={(open) => !open && setDeletingEvent(null)}
        onConfirm={confirmDelete}
        title="Delete Event"
        description={`Are you sure you want to delete ${deletingEvent?.title}? This action cannot be undone.`}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default EventsTable;
