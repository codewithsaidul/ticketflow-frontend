"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useAppSelector } from "@/redux/hooks";
import { role } from "@/constants/user.role.constants";

interface ChartData {
    name: string;      // Month Name (Jan, Feb, Mar)
    Revenue: number;   // Total Revenue for the month
    Tickets: number;   // Total Tickets Sold for the month
}

export default function SalesChart({ data }: { data?: ChartData[] }) {
    // ডাটা না থাকলে খালি অ্যারে বা ডামি ডাটা দিয়ে দিন
    const chartData = data && data.length > 0 ? data : [
        { name: 'Jan', Revenue: 0, Tickets: 0 },
        { name: 'Feb', Revenue: 0, Tickets: 0 },
    ]; 
    
    // User role check is done primarily for label display
    const { user } = useAppSelector(state => state.auth);
    const isHost = user?.role === role.HOST;
    
    return (
        <ResponsiveContainer width="100%" height={300}>
            <AreaChart
                data={chartData} // 🔥 এখানে লাইভ ডাটা আসছে
                margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
            >
                {/* Custom Gradient for Clean Area Fill */}
                <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="var(--primary)" stopOpacity={0.05} />
                    </linearGradient>
                    <linearGradient id="colorTickets" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.6} />
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1} />
                    </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" className="dark:stroke-border" />
                <XAxis dataKey="name" stroke="#888888" fontSize={12} />
                
                {/* Left Axis (Revenue) */}
                <YAxis 
                    yAxisId="left" 
                    stroke="var(--primary)" 
                    fontSize={12} 
                    tickFormatter={(value) => `৳${value.toLocaleString()}`}
                />
                
                {/* Right Axis (Tickets Sold) */}
                <YAxis 
                    yAxisId="right" 
                    orientation="right" 
                    stroke="#EF4444" // Red for tickets (volume)
                    fontSize={12} 
                    tickFormatter={(value) => `${value}`}
                />
                
                <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)', borderRadius: '8px', padding: '10px' }}
                    formatter={(value, name) => [name === 'Revenue (BDT)' ? `৳${value.toLocaleString()}` : value, name]}
                />
                
                <Legend iconType="circle" />

                {/* 1. Revenue Area */}
                <Area
                    yAxisId="left"
                    type="monotone"
                    dataKey="Revenue"
                    stroke="var(--primary)"
                    fill="url(#colorRevenue)"
                    name={isHost ? "My Revenue" : "Platform Revenue (BDT)"}
                    activeDot={{ r: 5 }}
                />
                
                {/* 2. Tickets Sold Area */}
                <Area
                    yAxisId="right"
                    type="monotone"
                    dataKey="Tickets"
                    stroke="#EF4444"
                    fill="url(#colorTickets)"
                    name={isHost ? "My Tickets Sold" : "Total Tickets Sold"}
                    activeDot={{ r: 5 }}
                />
            </AreaChart>
        </ResponsiveContainer>
    );
}