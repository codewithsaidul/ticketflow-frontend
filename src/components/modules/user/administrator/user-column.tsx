"use client";

import { DateCell } from "@/components/shared/dashboard/cell/date-cell";
import { UserInfoCell } from "@/components/shared/dashboard/cell/user-info-cell";
import { Column } from "@/components/shared/dashboard/reusable-table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { IUser } from "@/types/user.types";

export const usersColumns: Column<IUser>[] = [
  {
    header: "User Details",
    accessor: (user) => (
      <UserInfoCell
        name={user.name}
        email={user.email}
        photo={user.profileImg}
      />
    ),
  },
  {
    header: "Contact",
    accessor: (user) => (
      <div className="flex flex-col">
        <span className="text-sm">{user.phone ? user.phone : "N/A"}</span>
      </div>
    ),
  },
  {
    header: "Role",
    accessor: (user) => (
      <Badge
        className={`capitalize font-medium ${
          user.role === "admin"
            ? "bg-red-500 hover:bg-red-600"
            : user.role === "host"
            ? "bg-yellow-500 hover:bg-yellow-600"
            : "bg-green-500 hover:bg-green-600"
        }`}
      >
        {user.role}
      </Badge>
    ),
  },
  {
    header: "Interests",
    accessor: (user) => (
      <div className="flex flex-wrap gap-1">
        {user.interests && user.interests.length > 0 ? (
          user.interests.slice(0, 2).map((interest, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
            >
              {interest}
            </span>
          ))
        ) : (
          <span className="text-base text-gray-300">None listed</span>
        )}
      </div>
    ),
  },
  {
    header: "Status",
    accessor: (user) => (
      <Badge
        className={cn(
          "capitalize",
          user.status === "active" && "bg-green-600 hover:bg-green-700",
          user.status === "pending" && "bg-amber-600 hover:bg-amber-700",
          user.status === "blocked" && "bg-red-600 hover:bg-rose-700",
          user.isDeleted && "bg-destructive hover:bg-destructive/90"
        )}
      >
        {user.isDeleted ? "Deleted" : user.status}
      </Badge>
    ),
  },
  {
    header: "Joined",
    accessor: (user) => <DateCell date={user.createdAt} />,
  },
];
