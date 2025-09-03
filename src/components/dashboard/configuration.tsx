"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { configuration } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  featureFlags: z.array(z.object({ id: z.string(), enabled: z.boolean() })),
  apiKeys: z.array(z.object({ id: z.string(), value: z.string() })),
});

type FormData = z.infer<typeof formSchema>;

export default function Configuration() {
  const { toast } = useToast();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      featureFlags: configuration.featureFlags.map(({ id, enabled }) => ({ id, enabled })),
      apiKeys: configuration.apiKeys.map(({ id, value }) => ({ id, value })),
    },
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    toast({
      title: "Configuration Saved",
      description: "Your changes have been saved successfully.",
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Feature Flags</CardTitle>
            <CardDescription>Enable or disable features across the application.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {configuration.featureFlags.map((flag, index) => (
              <FormField
                key={flag.id}
                control={form.control}
                name={`featureFlags.${index}.enabled`}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">{flag.name}</FormLabel>
                      <FormDescription>
                        Toggle this feature flag on or off.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>API Keys</CardTitle>
            <CardDescription>Manage third-party API keys and secrets.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {configuration.apiKeys.map((key, index) => (
              <FormField
                key={key.id}
                control={form.control}
                name={`apiKeys.${index}.value`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{key.name}</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormDescription>
                      This key is sensitive and will not be displayed again.
                    </FormDescription>
                  </FormItem>
                )}
              />
            ))}
          </CardContent>
          <CardFooter>
            <Button type="submit">Save Changes</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
