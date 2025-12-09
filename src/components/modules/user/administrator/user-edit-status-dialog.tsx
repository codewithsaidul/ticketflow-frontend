// src/components/modules/Admin/UserManagement/UserEditStatusDialog.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUpdateUserStatusMutation } from "@/redux/api/userApi/userApi";
import { IApiErrorResponse } from "@/types";
import { IUser } from "@/types/user.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

interface UserEditStatusDialogProps {
  open: boolean;
  onClose: () => void;
  user: IUser;
  onSuccess: () => void;
}

// Zod Schema for Role/Status update only
const StatusUpdateSchema = z.object({
  status: z.enum(["active", "inactive", "blocked"], {
    error: "Status is required.",
  }),
});

type StatusUpdateValues = z.infer<typeof StatusUpdateSchema>;

const UserEditStatusDialog = ({
  open,
  onClose,
  user,
  onSuccess,
}: UserEditStatusDialogProps) => {
    const [updateUserStatus, { isLoading }] = useUpdateUserStatusMutation();

  const form = useForm<StatusUpdateValues>({
    resolver: zodResolver(StatusUpdateSchema),
    defaultValues: {
      status: "active",
    },
  });

  useEffect(() => {
    if (user && open) {
      form.reset({
        status: user.status as "active" | "inactive" | "blocked",
      });
    }
  }, [open, user, form]);

  const onSubmit = async (data: StatusUpdateValues) => {
    try {
      // 💡 Important: Use the user's _id to update only the role and status fields
        const res = await updateUserStatus({ userId: user._id, status: data }).unwrap();

        if (res.success) {
            toast.success(res.message);
            onSuccess();
            onClose();
        }
    } catch (error) {
      const err = error as IApiErrorResponse;
      toast.error(err.data?.message || "Failed to update user.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Role & Status: {user?.name}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 py-4"
          >
            {/* Status Selector */}
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={isLoading}
                  >
                    <FormControl>
                      <SelectTrigger className="cursor-pointer w-full">
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {["active", "inactive", "blocked"].map((status) => (
                        <SelectItem
                          key={status}
                          value={status}
                          className="cursor-pointer"
                        >
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <DialogFooter>
          <Button onClick={onClose} variant="outline" disabled={isLoading}>
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={form.handleSubmit(onSubmit)}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Save Changes"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserEditStatusDialog;
