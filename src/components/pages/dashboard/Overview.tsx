"use client";

import Loader from "@/components/shared/loader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { role } from "@/constants/user.role.constants";
import { useGetDashboardStatsQuery } from "@/redux/api/statsApi/statsApi";
import { useAppSelector } from "@/redux/hooks";
import { UserRole } from "@/types";
import { IStats } from "@/types/stats.types";
import { CalendarDays, DollarSign, Ticket, Users } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";

const DynamicSalesChart = dynamic(() => import("./sales-chart"), {
  loading: () => (
    <div className="h-[300px] flex items-center justify-center">
      Loading Chart...
    </div>
  ),
  ssr: false,
});

const mapStatsToKPIs = (stats: IStats, UserRole: UserRole) => {
  const isHost = UserRole === role.HOST;
  const totalUsers = stats.totalUsers || 0;

  return [
    {
      title: isHost ? "My Revenue" : "Total Revenue",
      value: `৳ ${(stats.totalRevenue || 0).toLocaleString()}`,
      icon: DollarSign,
      color: "text-green-500",
      description: isHost
        ? `From ${stats.totalEvents} events`
        : "Platform Earnings",
    },
    {
      title: isHost ? "Tickets Sold" : "Global Tickets Sold",
      value: (stats.totalTicketsSold || 0)?.toLocaleString(),
      icon: Ticket,
      color: "text-primary",
      description: isHost
        ? `${stats.totalBookings} total bookings`
        : "Confirmed Tickets",
    },
    {
      title: isHost ? "My Events" : "Total Users",
      value: (isHost ? stats.totalEvents : totalUsers)?.toLocaleString(),
      icon: isHost ? CalendarDays : Users,
      color: "text-purple-500",
      description: isHost ? "Total events hosted" : "Active users/hosts",
    },
  ];
};

export default function DashboardOverviewPage() {
  const { user } = useAppSelector((state) => state.auth);
  const { data: statsResponse, isLoading } = useGetDashboardStatsQuery(
    user?.role,
    { skip: !user?.role, refetchOnMountOrArgChange: true }
  );

  const stats = statsResponse?.data || {};
  const UserRole = user?.role as UserRole;
  const kpis = mapStatsToKPIs(stats, UserRole);

  // Chart Data is expected in the stats object (monthlySalesData)
  const chartData = stats.monthlySalesData || [];

  if (isLoading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!stats)
    return (
      <div className="p-8 text-red-500">Failed to load dashboard data.</div>
    );

  return (
    <div className="p-4 md:p-8 space-y-8 bg-muted/10 min-h-screen">
      <h1 className="text-3xl font-bold font-heading text-foreground">
        {UserRole === role.HOST ? "Host Overview" : "Platform Administration"}
      </h1>

      {/* 1. KPI Cards (Metrics) */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {kpis.map((kpi, index) => (
          <Card
            key={index}
            className="shadow-lg border-primary/10 transition-transform hover:scale-[1.02]"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              <kpi.icon className={`h-5 w-5 ${kpi.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-1">{kpi.value}</div>
              <p className="text-xs text-muted-foreground">{kpi.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 2. Charts and Activity Grid */}
      <div className="grid gap-6 lg:grid-cols-7">
        {/* Sales Performance Chart (Main Focus) */}
        <Card className="lg:col-span-4 shadow-xl">
          <CardHeader>
            <CardTitle>Revenue & Ticket Sales (Last 6 Months)</CardTitle>
          </CardHeader>
          <CardContent className="h-[350px]">
            {/* 🔥 Live Data Chart Render */}
            <DynamicSalesChart data={chartData} />
          </CardContent>
        </Card>

        {/* Recent Activity/Logs */}
        <Card className="lg:col-span-3 shadow-xl">
          <CardHeader>
            <CardTitle>Recent System Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Note: This section requires a separate API call to fetch logs/recent orders, 
                  but for design, we show placeholders. */}
            <div className="text-muted-foreground">Log data goes here...</div>
            <Separator />
            <p className="text-xs text-muted-foreground">
              Last updated: {new Date().toLocaleTimeString()}
            </p>
            <Link
              href="/dashboard/admin/bookings"
              className="text-sm text-primary font-medium flex justify-end"
            >
              View All Bookings
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
