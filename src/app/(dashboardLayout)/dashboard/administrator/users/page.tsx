"use client";
import { Suspense, useTransition } from "react";
import { UserRole } from "@/types/user.types";
import UserManagementHeader from "@/components/modules/user/administrator/user-management-header";
import SearchFilter from "@/components/shared/dashboard/search-fillter";
import SelectFilter from "@/components/shared/dashboard/select-fillter";
import RefreshButton from "@/components/shared/dashboard/refresh-btn";
import { TableSkeleton } from "@/components/shared/dashboard/table-skeleton";
import UsersTable from "@/components/modules/user/administrator/user-table";
import { useRouter, useSearchParams } from "next/navigation";
import { useGetAllUsersQuery } from "@/redux/api/userApi/userApi";
import SecondaryPagination from "@/components/shared/secondary-pagination";
import Loader from "@/components/shared/loader";
import { TicketX } from "lucide-react";
import { Button } from "@/components/ui/button";

const userStatus = [
  {
    label: "Active",
    value: "active",
  },
  {
    label: "Pending",
    value: "pending",
  },
  {
    label: "Blocked",
    value: "blocked",
  },
];

export default function UserManagementPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [, startTransition] = useTransition();
  const page = searchParams.get("page") || 1;
  const searchTerm = searchParams.get("searchTerm") || "";
  const role = searchParams.get("role") || "";
  const status = searchParams.get("status") || "";

  const { data, isLoading, isError } = useGetAllUsersQuery({
    page: page.toString(),
    limit: 10,
    searchTerm,
    role,
    status,
  });

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  if (isLoading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader />
      </div>
    );
  }
  if (isError) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center gap-2 text-red-500">
        <TicketX className="w-12 h-12" />
        <p className="font-medium">Failed to load bookings.</p>
        <p className="text-sm">Please try refreshing the page.</p>
        <Button
          variant="outline"
          onClick={handleRefresh}
          className="cursor-pointer"
        >
          Try again
        </Button>
      </div>
    );
  }

  const users = data?.data;
  const meta = data?.meta;

  const userRoles = [UserRole.USER, UserRole.HOST];

  return (
    <div className="space-y-6 w-full">
      <UserManagementHeader />

      <div className="flex space-x-2">
        <SearchFilter
          paramName="searchTerm"
          placeholder="Search users by name or email..."
        />

        <SelectFilter
          paramName="role"
          options={userRoles.map((role) => ({
            label: role.toUpperCase(),
            value: role,
          }))}
          placeholder="Filter by role"
        />

        <SelectFilter
          paramName="status"
          options={userStatus}
          placeholder="Filter by status"
        />
        <RefreshButton />
      </div>

      <Suspense fallback={<TableSkeleton columns={6} rows={10} />}>
        <UsersTable users={users} />

        <SecondaryPagination
          currentPage={meta.page}
          totalPages={meta.totalPages}
        />
      </Suspense>
    </div>
  );
}
