'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ChartTooltipContent } from '@/components/ui/chart';

const data = [
  { name: 'Jan', total: Math.floor(Math.random() * 5) + 1 },
  { name: 'Feb', total: Math.floor(Math.random() * 5) + 1 },
  { name: 'Mar', total: Math.floor(Math.random() * 5) + 1 },
  { name: 'Apr', total: Math.floor(Math.random() * 5) + 1 },
  { name: 'May', total: Math.floor(Math.random() * 5) + 1 },
  { name: 'Jun', total: 4 },
  { name: 'Jul', total: 1 },
  { name: 'Aug', total: 1 },
  { name: 'Sep', total: 1 },
  { name: 'Oct', total: 1 },
  { name: 'Nov', total: Math.floor(Math.random() * 5) },
  { name: 'Dec', total: Math.floor(Math.random() * 5) },
];

export function OverviewChart() {
  return (
    <Card className="col-span-4 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Overview</CardTitle>
        <CardDescription>Your release cadence over the year.</CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <XAxis
              dataKey="name"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip
              cursorClassName="fill-border"
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
