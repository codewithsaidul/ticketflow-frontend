"use client";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useLogOut } from "@/hooks/useLogOut";
import { useAppSelector } from "@/redux/hooks";
import { getInitialsName } from "@/utils";
import { Avatar } from "@radix-ui/react-avatar";
import { Bell, LogOut, User } from "lucide-react";
import Link from "next/link";

export default function DashboardHeader() {
  const { user, isLoggedIn } = useAppSelector((state) => state.auth);
  const { logout } = useLogOut();

  return (
    <header className="bg-background/95 sticky top-0 z-50 flex h-16 w-full shrink-0 items-center gap-2 border-b backdrop-blur transition-[width,height] ease-linear ">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="/">Velotix</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage><span className="capitalize">{user?.role}</span> Dashboard</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="ml-auto flex items-center gap-2 px-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Bell className="h-4 w-4" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex hover:bg-transparent! hover:border-0! items-center gap-2 px-2 cursor-pointer"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    className="rounded-full"
                    src={
                      user?.profileImg ||
                      "/https://res.cloudinary.com/dz1fy2tof/image/upload/v1762199296/qaznemalr49d2rap3ijf.png"
                    }
                    alt="Michał Kowalski"
                  />
                  <AvatarFallback className="bg-primary/50 text-white">
                    {isLoggedIn &&
                      user &&
                      getInitialsName(user?.name || user?.email || "DF")}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem className="cursor-pointer">
                <Link href={`/dashboard/${user?.role}/profile`} className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  Profile Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={logout}
                className="text-foreground cursor-pointer"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
