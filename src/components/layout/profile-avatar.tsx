"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { role } from "@/constants/user.role.constants";
import { UserRole } from "@/types";
import { getDashboardUrl } from "@/utils/getDashboardUrl";

import { LogOut, LayoutDashboard, User, Ticket } from "lucide-react";
import Link from "next/link";

interface IAvatarProps {
  name: string;
  image?: string;
  userRole: UserRole;
  logOutFn: () => void;
}

const ProfileAvatar = ({ name, image, userRole, logOutFn }: IAvatarProps) => {

  const dashboardPath = getDashboardUrl(userRole)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer border-2 border-transparent hover:border-primary transition-all">
          <AvatarImage
            src={image || "https://github.com/shadcn.png"} // ডিফল্ট ইমেজ
            alt={name}
          />
          <AvatarFallback className="font-bold text-primary">
            {name?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56 mt-2" align="end">
        {/* --- CONDITION 1: NORMAL USER --- */}
        {userRole === "user" && (
          <>
            <DropdownMenuItem asChild>
              <Link
                href="/user/my-bookings"
                className="cursor-pointer flex items-center gap-2"
              >
                <Ticket className="w-4 h-4" /> My Bookings
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link
                href="/user/profile"
                className="cursor-pointer flex items-center gap-2"
              >
                <User className="w-4 h-4" /> My Profile
              </Link>
            </DropdownMenuItem>
          </>
        )}

        {/* --- CONDITION 2: ADMIN / SUPER_ADMIN / HOST --- */}
        {(userRole === role.ADMIN ||
          userRole === role.SUPERADMIN ||
          userRole === role.HOST) && (
          <>
            <DropdownMenuItem asChild>
              <Link
                href={dashboardPath}
                className="cursor-pointer flex items-center gap-2"
              >
                <LayoutDashboard className="w-4 h-4" /> Dashboard
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link
                href="/user/profile"
                className="cursor-pointer flex items-center gap-2"
              >
                <User className="w-4 h-4" /> My Profile
              </Link>
            </DropdownMenuItem>
          </>
        )}

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={logOutFn}
          className="cursor-pointer text-red-600 focus:text-red-600 flex items-center gap-2"
        >
          <LogOut className="w-4 h-4" /> Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileAvatar;
