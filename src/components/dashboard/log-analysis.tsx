"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getLogAnalysis } from "@/app/actions";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { BrainCircuit, Loader2, PartyPopper, FileText, Wand2 } from "lucide-react";
import type { AnalyzeLogsOutput } from "@/ai/flows/analyze-logs-for-insights";
import { Skeleton } from "../ui/skeleton";

const logSchema = z.object({
  logData: z.string().min(50, "Log data must be at least 50 characters long.").max(5000, "Log data cannot exceed 5000 characters."),
});

type FormData = z.infer<typeof logSchema>;

export default function LogAnalysis() {
  const [result, setResult] = useState<AnalyzeLogsOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(logSchema),
    defaultValues: {
      logData: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    const response = await getLogAnalysis({ logData: data.logData });

    if (response.success && response.data) {
      setResult(response.data);
    } else {
      setError(response.error || "An unknown error occurred.");
    }
    setIsLoading(false);
  };

  const ResultSkeleton = () => (
    <div className="grid gap-6 mt-6 md:grid-cols-1 lg:grid-cols-3">
        <Card>
            <CardHeader><Skeleton className="h-6 w-1/2" /></CardHeader>
            <CardContent className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
            </CardContent>
        </Card>
        <Card>
            <CardHeader><Skeleton className="h-6 w-1/2" /></CardHeader>
            <CardContent className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
            </CardContent>
        </Card>
        <Card>
            <CardHeader><Skeleton className="h-6 w-1/2" /></CardHeader>
            <CardContent className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
            </CardContent>
        </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <BrainCircuit className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>AI Log Analysis</CardTitle>
              <CardDescription>Paste your logs below to identify trends, errors, and insights.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="logData"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Log Data</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., [2024-05-21T10:00:00Z] INFO: User 'admin' logged in from 192.168.1.1..."
                        className="min-h-[200px] font-mono text-xs"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  "Analyze Logs"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {isLoading && <ResultSkeleton />}
      
      {error && (
        <Alert variant="destructive">
          <AlertTitle>Analysis Failed</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {result && (
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
          <Card className="lg:col-span-1">
            <CardHeader className="flex-row items-center gap-3 space-y-0">
               <FileText className="h-6 w-6 text-primary" />
               <CardTitle>Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{result.summary}</p>
            </CardContent>
          </Card>
          <Card className="lg:col-span-1">
            <CardHeader className="flex-row items-center gap-3 space-y-0">
              <PartyPopper className="h-6 w-6 text-accent" />
              <CardTitle>Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{result.insights}</p>
            </CardContent>
          </Card>
           <Card className="lg:col-span-1">
            <CardHeader className="flex-row items-center gap-3 space-y-0">
              <Wand2 className="h-6 w-6 text-primary" />
              <CardTitle>Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{result.recommendations}</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
