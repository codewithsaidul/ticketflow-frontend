import { UserRole } from "@/types";
import {
  CalendarDays,
  CalendarPlus,
  CreditCard,
  LayoutDashboard,
  ListOrdered,
  Settings,
  ShieldCheck,
  Ticket,
  Users,
  LucideIcon,
} from "lucide-react";


interface MenuItem {
  title: string;
  url: string;
  icon: LucideIcon;
  isActive?: boolean;
}

interface MenuGroup {
  title: string;
  items: MenuItem[];
}

export const sidebarMenus: Record<UserRole, MenuGroup[]> = {
  superadmin: [
    {
      title: "General",
      items: [
        { title: "Dashboard", url: "/dashboard/administrator", icon: LayoutDashboard },
      ],
    },
    {
      title: "Management",
      items: [
        { title: "Manage Admins", url: "/dashboard/administrator/admins", icon: ShieldCheck },
        { title: "Manage Users", url: "/dashboard/administrator/users", icon: Users },
      ],
    },
    {
      title: "Event Control",
      items: [
        { title: "All Events", url: "/dashboard/administrator/events", icon: CalendarDays },
        { title: "All Bookings", url: "/dashboard/administrator/bookings", icon: ListOrdered },
      ],
    },
    // {
    //   title: "Finance",
    //   items: [
    //     { title: "Platform Sales", url: "/dashboard/administrator/sales", icon: CreditCard },
    //   ],
    // },
    {
      title: "My Settings",
      items: [
        { title: "Profile", url: "/dashboard/administrator/profile", icon: Settings },
      ],
    },
  ],

  admin: [
    {
      title: "General",
      items: [
        { title: "Dashboard", url: "/dashboard/admin", icon: LayoutDashboard },
      ],
    },
    {
      title: "Management",
      items: [
        { title: "Manage Users", url: "/dashboard/admin/users", icon: Users },
      ],
    },
    {
      title: "Event Control",
      items: [
        { title: "All Events", url: "/dashboard/admin/events", icon: CalendarDays },
        { title: "All Bookings", url: "/dashboard/admin/bookings", icon: ListOrdered },
      ],
    },
     {
      title: "My Settings",
      items: [
        { title: "Profile", url: "/dashboard/admin/profile", icon: Settings },
      ],
    }
  ],

  host: [
    {
      title: "General",
      items: [
        { title: "Dashboard", url: "/dashboard/host", icon: LayoutDashboard },
      ],
    },
    {
      title: "Events",
      items: [
        { title: "Create Event", url: "/dashboard/host/create-event", icon: CalendarPlus },
        { title: "My Events", url: "/dashboard/host/my-events", icon: CalendarDays },
      ],
    },
    {
      title: "Bookings",
      items: [
        { title: "My Bookings", url: "/dashboard/host/bookings", icon: Ticket },
      ],
    },
     {
      title: "My Settings",
      items: [
        { title: "Profile", url: "/dashboard/host/profile", icon: Settings },
      ],
    }
  ],

  user: []
};