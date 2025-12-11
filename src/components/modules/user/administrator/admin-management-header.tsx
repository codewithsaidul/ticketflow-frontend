"use client";
import ManagementPageHeader from "@/components/shared/dashboard/management-page-header";
import AdminFormDialog from "./staff-form-dialog";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Plus } from "lucide-react";

const AdminManagementHeader = () => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSuccess = () => {
    startTransition(() => {
      router.refresh();
    });
  };
  return (
    <>
      <AdminFormDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSuccess={handleSuccess}
      />

      <ManagementPageHeader
        title="Platform Staff Management"
        description="Manage all platform administrators and Super Admins, update staff roles, and oversee account statuses."
        action={{
          label: "Add Admin",
          icon: Plus,
          onClick: () => setIsDialogOpen(true),
        }}
      />
    </>
  );
};

export default AdminManagementHeader;
