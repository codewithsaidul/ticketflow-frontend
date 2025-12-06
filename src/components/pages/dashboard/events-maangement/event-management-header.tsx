"use client";

import ManagementPageHeader from "@/components/shared/dashboard/management-page-header";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

const EventsManagementHeader = () => {
  const router = useRouter();

  return (
    <ManagementPageHeader
      title="My Events"
      description="Manage your listed events, seat layouts, and details"
      action={{
        label: "Create Event",
        icon: Plus,
        onClick: () => router.push("/host/events/create"),
      }}
    />
  );
};

export default EventsManagementHeader;