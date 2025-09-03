import { userFeedback } from '@/lib/data';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function Feedback() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent User Feedback</CardTitle>
        <CardDescription>Latest comments and suggestions from your users.</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] pr-4">
          <div className="space-y-6">
            {userFeedback.map((item) => (
              <div key={item.id} className="flex gap-4">
                <Avatar>
                  <AvatarImage src={item.avatar} data-ai-hint="person face" />
                  <AvatarFallback>{item.user.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold">{item.user}</p>
                    <p className="text-xs text-muted-foreground">{item.timestamp}</p>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{item.feedback}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
