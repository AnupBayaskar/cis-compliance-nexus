
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Server } from 'lucide-react';
import { ConfigurationCard } from './ConfigurationCard';

interface DeviceCardProps {
  device: {
    id: number;
    name: string;
    configCount: number;
    configurations: any[];
  };
  onGenerateReport: (configId: string) => void;
  onDeleteConfiguration: (configId: string) => void;
}

export const DeviceCard = ({ device, onGenerateReport, onDeleteConfiguration }: DeviceCardProps) => {
  return (
    <AccordionItem 
      value={device.id.toString()}
      className="border rounded-lg"
    >
      <Card>
        <AccordionTrigger className="hover:no-underline">
          <CardHeader className="flex-row items-center justify-between w-full py-4">
            <div className="flex items-center space-x-3">
              <Server className="h-8 w-8 text-brand-green" />
              <div className="text-left">
                <CardTitle className="text-xl">{device.name}</CardTitle>
                <CardDescription>
                  Device ID: {device.id} • {device.configCount} configuration{device.configCount !== 1 ? 's' : ''}
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline">
                {device.configCount} config{device.configCount !== 1 ? 's' : ''}
              </Badge>
            </div>
          </CardHeader>
        </AccordionTrigger>
        
        <AccordionContent>
          <CardContent className="pt-0">
            <div className="space-y-6">
              {device.configurations.map((config) => (
                <ConfigurationCard
                  key={config.id}
                  config={config}
                  onGenerateReport={onGenerateReport}
                  onDeleteConfiguration={onDeleteConfiguration}
                />
              ))}
            </div>
          </CardContent>
        </AccordionContent>
      </Card>
    </AccordionItem>
  );
};
