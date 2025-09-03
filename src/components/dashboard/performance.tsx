"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { performanceData } from "@/lib/data";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid, BarChart, Bar } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, type ChartConfig } from "@/components/ui/chart";

const chartConfig: ChartConfig = {
  responseTime: { label: "Response Time (ms)", color: "hsl(var(--chart-1))" },
  cpuUsage: { label: "CPU Usage (%)", color: "hsl(var(--chart-2))" },
};

export default function Performance() {
  return (
    <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Response Time</CardTitle>
          <CardDescription>Average API response time over the last 24 hours.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <LineChart
              data={performanceData}
              margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid vertical={false} />
              <XAxis dataKey="time" tickLine={false} axisLine={false} tickMargin={8} />
              <YAxis tickLine={false} axisLine={false} tickMargin={8} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Legend content={<ChartLegendContent />} />
              <Line dataKey="responseTime" type="monotone" stroke="var(--color-responseTime)" strokeWidth={2} dot={false} />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>CPU Usage</CardTitle>
          <CardDescription>Average CPU usage over the last 24 hours.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <BarChart data={performanceData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="time" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <Legend content={<ChartLegendContent />} />
                <Bar dataKey="cpuUsage" fill="var(--color-cpuUsage)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
