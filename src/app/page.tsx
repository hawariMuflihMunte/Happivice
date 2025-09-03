"use client";

import { useState } from 'react';
import Link from 'next/link';
import {
  Bell,
  Briefcase,
  LayoutDashboard,
  BarChart2,
  Users,
  BrainCircuit,
  Settings,
  MessageSquare,
  PanelLeft,
  Search,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';

import Overview from '@/components/dashboard/overview';
import Performance from '@/components/dashboard/performance';
import ServiceManagement from '@/components/dashboard/service-management';
import UserDashboard from '@/components/dashboard/user-dashboard';
import LogAnalysis from '@/components/dashboard/log-analysis';
import Configuration from '@/components/dashboard/configuration';
import Alerts from '@/components/dashboard/alerts';
import Feedback from '@/components/dashboard/feedback';
import { alerts } from '@/lib/data';

const navItems = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'performance', label: 'Performance', icon: BarChart2 },
  { id: 'user-dashboard', label: 'My Services', icon: Briefcase },
  { id: 'service-management', label: 'Service Admin', icon: Users },
  { id: 'log-analysis', label: 'Log Analysis', icon: BrainCircuit, isBeta: true },
  { id: 'configuration', label: 'Configuration', icon: Settings },
  { id: 'alerts', label: 'Alerts', icon: Bell, badge: alerts.length },
  { id: 'feedback', label: 'User Feedback', icon: MessageSquare },
];

export default function Dashboard() {
  const [activeView, setActiveView] = useState('overview');

  const renderView = () => {
    switch (activeView) {
      case 'overview': return <Overview />;
      case 'performance': return <Performance />;
      case 'service-management': return <ServiceManagement />;
      case 'user-dashboard': return <UserDashboard />;
      case 'log-analysis': return <LogAnalysis />;
      case 'configuration': return <Configuration />;
      case 'alerts': return <Alerts />;
      case 'feedback': return <Feedback />;
      default: return <Overview />;
    }
  };

  const NavLink = ({ item, isMobile = false }: { item: typeof navItems[0], isMobile?: boolean }) => (
    <Button
      variant={activeView === item.id ? 'secondary' : 'ghost'}
      className={`w-full justify-start gap-3 ${isMobile ? 'text-lg p-6' : 'px-3'}`}
      onClick={() => {
        setActiveView(item.id);
        if (isMobile && document.querySelector('[data-state="open"]')) {
           (document.querySelector('[data-radix-collection-item] button[aria-label="Close"]') as HTMLElement)?.click();
        }
      }}
    >
      <item.icon className="h-5 w-5" />
      {item.label}
      {item.isBeta && <Badge variant="outline">Beta</Badge>}
      {item.badge && <Badge className="ml-auto">{item.badge}</Badge>}
    </Button>
  );

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-card md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Briefcase className="h-6 w-6 text-primary" />
              <span className="">HappiviceBoard</span>
            </Link>
          </div>
          <div className="flex-1 overflow-auto py-4">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {navItems.map((item) => <NavLink key={item.id} item={item} />)}
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col p-0">
              <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                <Link href="/" className="flex items-center gap-2 font-semibold">
                  <Briefcase className="h-6 w-6 text-primary" />
                  <span className="">HappiviceBoard</span>
                </Link>
              </div>
              <nav className="grid gap-2 p-4">
                {navItems.map((item) => <NavLink key={item.id} item={item} isMobile={true} />)}
              </nav>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search services..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://picsum.photos/40/40" data-ai-hint="person face" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Admin Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-background overflow-auto">
          {renderView()}
        </main>
      </div>
    </div>
  );
}
