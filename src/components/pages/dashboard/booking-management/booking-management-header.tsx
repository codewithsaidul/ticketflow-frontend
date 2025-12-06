"use client";

import ManagementPageHeader from "@/components/shared/dashboard/management-page-header";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

const BookingsManagementHeader = () => {
  const router = useRouter();
  const [, startTransition] = useTransition();

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <ManagementPageHeader
      title="Bookings Management"
      description="View and manage event bookings and reservations"
    />
  );
};

export default BookingsManagementHeader;