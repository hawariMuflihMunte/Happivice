"use client";

import { useState } from 'react';
import type { Service } from '@/lib/data';
import { services as initialServices } from '@/lib/data';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const statusStyles: { [key: string]: string } = {
  'Available': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  'Taken': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
  'Rejected': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  'Accepted': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  'In Progress': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-300',
  'Done': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
};

export default function UserDashboard() {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const handleTakeService = (service: Service) => {
    setServices(services.map(s => s.id === service.id ? { ...s, status: 'Taken' } : s));
    setSelectedService({ ...service, status: 'Taken' });
  };

  const myServices = services.filter(s => s.status !== 'Available');
  const availableServices = services.filter(s => s.status === 'Available');

  return (
    <div className="space-y-6">
      <Dialog open={!!selectedService} onOpenChange={() => setSelectedService(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Invoice Generated</DialogTitle>
            <DialogDescription>
              An invoice for your service request has been created.
            </DialogDescription>
          </DialogHeader>
          {selectedService && (
            <div className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <h3 className="font-semibold">{selectedService.name}</h3>
                <p className="text-muted-foreground text-sm">{selectedService.description}</p>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Status</span>
                <Badge variant="outline" className={statusStyles[selectedService.status]}>{selectedService.status}</Badge>
              </div>
              <Separator />
              <div className="flex justify-between items-center font-semibold">
                <span>Total</span>
                <span>${selectedService.price.toLocaleString()}</span>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setSelectedService(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Card>
        <CardHeader>
          <CardTitle>My Services</CardTitle>
          <CardDescription>Services you have taken or are in progress.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {myServices.length > 0 ? myServices.map((service) => (
            <Card key={service.id}>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  {service.name}
                  <Badge variant="outline" className={statusStyles[service.status]}>{service.status}</Badge>
                </CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-between">
                <span className="font-semibold text-lg">${service.price.toLocaleString()}</span>
                <Button variant="outline" onClick={() => setSelectedService(service)}>View Invoice</Button>
              </CardFooter>
            </Card>
          )) : <p className="text-muted-foreground col-span-full">You haven't taken any services yet.</p>}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Available Services</CardTitle>
          <CardDescription>Browse and select new services to enhance your projects.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {availableServices.map((service) => (
            <Card key={service.id} className="flex flex-col">
              <CardHeader>
                <CardTitle>{service.name}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow" />
              <CardFooter className="flex justify-between items-center">
                <span className="font-semibold text-lg">${service.price.toLocaleString()}</span>
                <Button onClick={() => handleTakeService(service)}>Take Service</Button>
              </CardFooter>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
