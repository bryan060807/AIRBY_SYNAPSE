'use client';

import { Bar, BarChart, Tooltip, XAxis, YAxis } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';

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

const chartConfig = {
  total: {
    label: 'Releases',
    color: 'hsl(var(--primary))',
  },
} satisfies ChartConfig;

export function OverviewChart() {
  return (
    <Card className="col-span-4 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Overview</CardTitle>
        <CardDescription>Your release cadence over the year.</CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ChartContainer config={chartConfig} className="h-[350px] w-full">
          <BarChart accessibilityLayer data={data}>
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
              allowDecimals={false}
            />
            <Tooltip
              cursorClassName="fill-border"
              content={<ChartTooltipContent />}
            />
            <Bar
              dataKey="total"
              fill="var(--color-total)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
