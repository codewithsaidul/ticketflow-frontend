"use client";
import { ReusableTable } from "@/components/shared/dashboard/reusable-table";
import DeleteConfirmationDialog from "@/components/shared/delete-confirm-dialog";
import { useDeleteUserMutation } from "@/redux/api/userApi/userApi";
import { IUser } from "@/types/user.types";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import toast from "react-hot-toast";
import { usersColumns } from "./user-column";
import UserEditStatusDialog from "./user-edit-status-dialog";
import UserViewDetailDialog from "./user-view-detail-dialog";

interface AdminTableProps {
  admins: IUser[];
}

const AdminTable = ({ admins }: AdminTableProps) => {
  const router = useRouter();
  const [deleteUser] = useDeleteUserMutation();
  const [, startTransition] = useTransition();
  const [editingAdmin, setEditingAdmin] = useState<IUser | null>(null);
  const [viewingAdmin, setViewingAdmin] = useState<IUser | null>(null);
  const [deletingAdmin, setDeletingAdmin] = useState<IUser | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEdit = (admin: IUser) => {
    setEditingAdmin(admin);
  };

  const handleView = (admin: IUser) => {
    setViewingAdmin(admin);
  };

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const confirmDelete = async () => {
    if (!deletingAdmin) return;

    setIsDeleting(true);
    const result = await deleteUser(deletingAdmin._id!).unwrap();
    setIsDeleting(false);

    if (result.success) {
      toast.success(result.message || "User deleted successfully");
      setDeletingAdmin(null);
      handleRefresh();
    } else {
      toast.error(result.message || "Failed to delete user");
    }
  };

  return (
    <>
      <ReusableTable
        data={admins}
        columns={usersColumns}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={(admin) => setDeletingAdmin(admin)}
        getRowKey={(admin) => admin._id!}
        emptyMessage="No users found"
      />

      {/* Edit User Form Dialog (For Role/Status Change) */}
      <UserEditStatusDialog
        open={!!editingAdmin}
        onClose={() => setEditingAdmin(null)}
        user={editingAdmin!}
        onSuccess={() => {
          setEditingAdmin(null);
          handleRefresh();
        }}
      />

      {/* View User Detail Dialog */}
      <UserViewDetailDialog
        open={!!viewingAdmin}
        onClose={() => setViewingAdmin(null)}
        user={viewingAdmin}
      />

      {/* Delete/Status Change Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={!!deletingAdmin}
        onOpenChange={(open) => !open && setDeletingAdmin(null)}
        onConfirm={confirmDelete}
        title="Delete Event"
        description={`Are you sure you want to delete ${deletingAdmin?.name}? This action cannot be undone.`}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default AdminTable;
