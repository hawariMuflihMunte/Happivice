"use client";

import { useState } from 'react';
import { alerts as initialAlerts } from '@/lib/data';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle, Info } from 'lucide-react';

const severityConfig = {
  Critical: { icon: AlertCircle, className: "text-red-500 border-red-500/50" },
  High: { icon: AlertCircle, className: "text-orange-500 border-orange-500/50" },
  Medium: { icon: Info, className: "text-yellow-500 border-yellow-500/50" },
};

export default function Alerts() {
  const [alerts, setAlerts] = useState(initialAlerts);

  const resolveAlert = (id: string) => {
    setAlerts(alerts.filter(a => a.id !== id));
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Alerts</CardTitle>
        <CardDescription>Critical errors and performance degradation warnings.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {alerts.length > 0 ? (
          alerts.map((alert) => {
            const config = severityConfig[alert.severity];
            return (
              <Alert key={alert.id} className={config.className}>
                <config.icon className="h-4 w-4" />
                <AlertTitle className="flex justify-between items-start">
                  <span>{alert.title}</span>
                  <span className="text-xs font-normal text-muted-foreground">{alert.timestamp}</span>
                </AlertTitle>
                <AlertDescription>
                  <div className="flex justify-between items-end">
                    <p className="text-sm">{alert.description}</p>
                    <div className="flex gap-2 mt-2 shrink-0">
                      <Button variant="outline" size="sm">Acknowledge</Button>
                      <Button variant="secondary" size="sm" onClick={() => resolveAlert(alert.id)}>Resolve</Button>
                    </div>
                  </div>
                </AlertDescription>
              </Alert>
            )
          })
        ) : (
          <div className="flex flex-col items-center justify-center text-center p-8 rounded-lg border-2 border-dashed">
            <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
            <h3 className="text-lg font-semibold">All Systems Operational</h3>
            <p className="text-muted-foreground">There are no active alerts at the moment.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
