"use client";
import AdminManagementHeader from "@/components/modules/user/administrator/admin-management-header";
import UsersTable from "@/components/modules/user/administrator/user-table";
import RefreshButton from "@/components/shared/dashboard/refresh-btn";
import SearchFilter from "@/components/shared/dashboard/search-fillter";
import SelectFilter from "@/components/shared/dashboard/select-fillter";
import { TableSkeleton } from "@/components/shared/dashboard/table-skeleton";
import Loader from "@/components/shared/loader";
import SecondaryPagination from "@/components/shared/secondary-pagination";
import { Button } from "@/components/ui/button";
import { useGetAllAdminsQuery } from "@/redux/api/adminApi/adminApi";
import { UserRole } from "@/types/user.types";
import { TicketX } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useTransition } from "react";

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

export default function AdminManagementPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || 1;
  const searchTerm = searchParams.get("searchTerm") || "";
  const role = searchParams.get("role") || "";
  const status = searchParams.get("status") || "";
  const [, startTransition] = useTransition();

  const { data, isLoading, isError } = useGetAllAdminsQuery({
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
        <p className="font-medium">Failed to load admins data.</p>
        <p className="text-sm">Please try refreshing the page.</p>
        <Button variant="outline" onClick={handleRefresh} className="cursor-pointer">
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
      <AdminManagementHeader />

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
