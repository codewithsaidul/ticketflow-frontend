import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";

export default function StatsCard ( { kpi } ) {
  return (
    <Card className="shadow-lg border-primary/10">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
        <kpi.icon className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold mb-1">{kpi.value}</div>
        <p className="text-xs text-muted-foreground">
          <ArrowUpRight className="inline h-3 w-3 text-green-500 mr-1" />{" "}
          {kpi.change} since last month
        </p>
      </CardContent>
    </Card>
  );
}
