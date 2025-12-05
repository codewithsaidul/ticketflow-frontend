import { sidebarMenus } from "@/data/sidebar-data";
import { UserRole } from "@/types";


export function useSidebarMenus(role: UserRole) {
  const menus = sidebarMenus[role] || [];

  return menus;
}