"use client";
import { Suspense } from "react";
import { UserRole } from "@/types/user.types";
import UserManagementHeader from "@/components/modules/user/administrator/user-management-header";
import SearchFilter from "@/components/shared/dashboard/search-fillter";
import SelectFilter from "@/components/shared/dashboard/select-fillter";
import RefreshButton from "@/components/shared/dashboard/refresh-btn";
import { TableSkeleton } from "@/components/shared/dashboard/table-skeleton";
import UsersTable from "@/components/modules/user/administrator/user-table";
import { useSearchParams } from "next/navigation";
import { useGetAllUsersQuery } from "@/redux/api/userApi/userApi";
import SecondaryPagination from "@/components/shared/secondary-pagination";

const userStatus = [
    {
        label: "Active",
        value: "active"
    },
    {
        label: "Pending",
        value: "pending"
    },
    {
        label: "Blocked",
        value: "blocked"
    },
]

export default function UserManagementPage() {
  const searchParams = useSearchParams();
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

  if (isLoading) return <div>Loading events...</div>;
  if (isError) return <div>Error loading events.</div>;

  const users = data?.data;
  const meta = data?.meta;

  const userRoles = [
    UserRole.USER,
    UserRole.HOST,
  ];

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
