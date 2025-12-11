"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useCreateAdminMutation,
  useUpdateAdminMutation,
} from "@/redux/api/adminApi/adminApi";
import { IApiErrorResponse } from "@/types";
import { IUser, UserRole } from "@/types/user.types";
import { adminFormSchema, AdminFormValues } from "@/validation/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface IAdminFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  targetUser?: IUser;
}

const AdminFormDialog = ({
  open,
  onClose,
  onSuccess,
  targetUser,
}: IAdminFormDialogProps) => {
  const isEdit = !!targetUser;

  const [createAdmin, { isLoading: isCreating }] = useCreateAdminMutation();
  const [updateAdmin, { isLoading: isUpdating }] = useUpdateAdminMutation();
  const isLoading = isCreating || isUpdating;
    const [imageFile, setImageFile] = useState<File | null>(null);

  const form = useForm<AdminFormValues>({
    resolver: zodResolver(adminFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      role: UserRole.ADMIN,
      password: "",
      confirmPassword: "",
      profileImg: ""
    },
  });

  useEffect(() => {
    if (isEdit && targetUser && open) {
      form.reset({
        name: targetUser.name,
        email: targetUser.email,
        phone: targetUser.phone,
        role: targetUser.role as AdminFormValues["role"],
      });
    } else if (!isEdit && open) {
      form.reset();
    }
  }, [open, isEdit, targetUser, form]);

  const onSubmit = async (data: AdminFormValues) => {
    const formData = new FormData();

    formData.append("file", imageFile as File)
    formData.append("data", JSON.stringify(data))
    try {
      const res = isEdit
        ? await updateAdmin({ id: targetUser!._id, body: formData }).unwrap()
        : await createAdmin(formData).unwrap();

      if (res.success) {
        toast.success(
          isEdit ? "Admin updated successfully!" : "New Admin created!"
        );
        onSuccess();
        onClose();
      }
    } catch (error) {
      const err = error as IApiErrorResponse;
      toast.error(err.data.message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle>
            {isEdit ? "Edit Staff Information" : "Add New Admin/Staff"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col flex-1 min-h-0"
          >
            <div className="flex-1 overflow-y-auto px-6 space-y-4 pb-4">
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Staff Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="staff@platform.com"
                        {...field}
                        disabled={isEdit}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Phone */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Number</FormLabel>
                    <FormControl>
                      <Input placeholder="+880..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Role Selector */}
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full cursor-pointer">
                          <SelectValue placeholder="Select Staff Role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {[UserRole.ADMIN].map((r) => (
                          <SelectItem
                            key={r}
                            value={r}
                            className="cursor-pointer"
                          >
                            {r.toUpperCase()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password (Create/Optional Update) */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Password {isEdit ? "(Leave blank to keep old)" : "*"}
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Confirm Password (Create/Optional Update) */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirm password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="profileImg"
                render={() => (
                  <FormItem>
                    <FormLabel>Event Banner Image</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          setImageFile(e.target.files?.[0] || null)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Footer Actions */}
            <div className="flex justify-end gap-2 px-6 py-4 border-t bg-gray-50 dark:bg-gray-800">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isLoading}
                className="cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="cursor-pointer"
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : isEdit ? (
                  "Update Staff"
                ) : (
                  "Create Staff"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AdminFormDialog;
