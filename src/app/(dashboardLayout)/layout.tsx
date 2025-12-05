import { AppSidebar } from "@/components/shared/dashboardSIdebar/app-sidebar";
import DashboardHeader from "@/components/shared/dashboardSIdebar/dashboard-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { IChildren } from "@/types";

export default function DashboardLayout({ children }: IChildren) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <DashboardHeader />
        <div className="flex flex-1 flex-col gap-4 p-4">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
