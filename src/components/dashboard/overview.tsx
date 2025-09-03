import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { overviewMetrics, performanceData, services } from "@/lib/data";
import { Users, BarChart, AlertTriangle, Briefcase, Activity } from "lucide-react";
import Performance from "./performance";

export default function Overview() {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overviewMetrics.activeUsers.value}</div>
            <p className="text-xs text-muted-foreground">{overviewMetrics.activeUsers.change} from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Service Usage</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overviewMetrics.usage.value}</div>
            <p className="text-xs text-muted-foreground">{overviewMetrics.usage.change} from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overviewMetrics.errorRate.value}</div>
            <p className="text-xs text-muted-foreground">{overviewMetrics.errorRate.change} from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Services</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {services.filter(s => s.status === 'In Progress' || s.status === 'Accepted').length}
            </div>
            <p className="text-xs text-muted-foreground">Currently being processed</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
         <Performance />
      </div>
    </>
  );
}
