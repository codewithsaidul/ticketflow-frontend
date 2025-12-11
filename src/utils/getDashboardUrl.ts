import { role } from "@/constants/user.role.constants";
import { UserRole } from "@/types";

export const getDashboardUrl = (userRole: UserRole) => {
  switch (userRole) {
    case role.SUPERADMIN:
      return "/dashboard/administrator";
    case role.ADMIN:
      return "/dashboard/admin";
    case role.HOST:
      return "/dashboard/host";
    default:
      return "/";
  }
};
