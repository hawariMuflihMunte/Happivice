"use client";

import { useState } from 'react';
import type { Service } from '@/lib/data';
import { services as initialServices } from '@/lib/data';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CreditCard, MoreHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';

const statusStyles: { [key: string]: string } = {
  'Available': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  'Taken': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
  'Rejected': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  'Accepted': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  'In Progress': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-300',
  'Done': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
};

export default function ServiceManagement() {
  const [services, setServices] = useState<Service[]>(initialServices);

  const handleStatusChange = (serviceId: string, newStatus: Service['status']) => {
    setServices(services.map(s => s.id === serviceId ? { ...s, status: newStatus } : s));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Service Management</CardTitle>
        <CardDescription>Manage all user-requested services and their statuses.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Service</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.map((service) => (
              <TableRow key={service.id}>
                <TableCell>
                  <div className="font-medium">{service.name}</div>
                  <div className="text-sm text-muted-foreground hidden md:inline">{service.description}</div>
                </TableCell>
                <TableCell>${service.price.toLocaleString()}</TableCell>
                <TableCell>
                  <Select value={service.status} onValueChange={(value) => handleStatusChange(service.id, value as Service['status'])}>
                    <SelectTrigger className="w-[150px] focus:ring-0 focus:ring-offset-0 border-0 shadow-none bg-transparent">
                      <SelectValue>
                         <Badge variant="outline" className={statusStyles[service.status]}>{service.status}</Badge>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(statusStyles).map(status => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                       <DropdownMenuItem>
                         <CreditCard className="mr-2 h-4 w-4" />
                         Attach Payment
                       </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
