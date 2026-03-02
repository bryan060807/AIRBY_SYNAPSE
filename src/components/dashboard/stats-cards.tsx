import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Album, FileAudio, Sparkles, FolderUp } from 'lucide-react';
import type { Release } from '@/lib/types';

export function StatsCards({ data }: { data: Release[] }) {
  const totalReleases = data.length;
  const marketingAssetsGenerated = data.filter(
    (r) => r.marketingCopy
  ).length;
  const upcomingReleases = data.filter(
    (r) => new Date(r.releaseDate) > new Date()
  ).length;
  const stemsUploaded = 4; // Mock data

  const stats = [
    {
      title: 'Total Releases',
      value: totalReleases,
      icon: Album,
      color: 'text-primary',
    },
    {
      title: 'Upcoming Releases',
      value: upcomingReleases,
      icon: FileAudio,
      color: 'text-accent',
    },
    {
      title: 'AI Assets Generated',
      value: marketingAssetsGenerated,
      icon: Sparkles,
      color: 'text-primary',
    },
    {
      title: 'Stems Uploaded',
      value: stemsUploaded,
      icon: FolderUp,
      color: 'text-accent',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              {/* You can add more context here */}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
