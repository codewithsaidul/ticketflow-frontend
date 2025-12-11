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
import { IApiErrorResponse } from "@/types";

interface UsersTableProps {
  users: IUser[];
}

const UsersTable = ({ users }: UsersTableProps) => {
  const router = useRouter();
  const [deleteUser] = useDeleteUserMutation();
  const [, startTransition] = useTransition();
  const [editingUser, setEditingUser] = useState<IUser | null>(null);
  const [viewingUser, setViewingUser] = useState<IUser | null>(null);
  const [deletingUser, setDeletingUser] = useState<IUser | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEdit = (user: IUser) => {
    setEditingUser(user);
  };

  const handleView = (user: IUser) => {
    setViewingUser(user);
  };

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const confirmDelete = async () => {
    if (!deletingUser) return;
    setIsDeleting(true);

    try {
      const res = await deleteUser(deletingUser._id!).unwrap();
      if (res.success) {
        toast.success(res.message || "Admin deleted successfully");
        setDeletingUser(null);
        handleRefresh();
        setIsDeleting(false)
      }
    } catch (error) {
      const err = error as IApiErrorResponse;
      toast.error(err.data.message);
      setIsDeleting(false)
    }
  };

  return (
    <>
      <ReusableTable
        data={users}
        columns={usersColumns}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={(user) => setDeletingUser(user)}
        getRowKey={(user) => user._id!}
        emptyMessage="No users found"
      />

      {/* Edit User Form Dialog (For Role/Status Change) */}
      <UserEditStatusDialog
        open={!!editingUser}
        onClose={() => setEditingUser(null)}
        user={editingUser!}
        onSuccess={() => {
          setEditingUser(null);
          handleRefresh();
        }}
      />

      {/* View User Detail Dialog */}
      <UserViewDetailDialog
        open={!!viewingUser}
        onClose={() => setViewingUser(null)}
        user={viewingUser}
      />

      {/* Delete/Status Change Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={!!deletingUser}
        onOpenChange={(open) => !open && setDeletingUser(null)}
        onConfirm={confirmDelete}
        title="Delete Admin"
        description={`Are you sure you want to delete ${deletingUser?.name}? This action cannot be undone.`}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default UsersTable;
