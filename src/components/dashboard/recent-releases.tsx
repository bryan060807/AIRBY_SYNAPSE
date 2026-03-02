import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockReleases } from '@/lib/mock-data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '../ui/badge';
import { ArrowRight } from 'lucide-react';

export function RecentReleases() {
  const recentReleases = mockReleases.slice(0, 4);

  const statusVariant = {
    'In Progress': 'default',
    Released: 'secondary',
    Planning: 'outline',
  } as const;

  return (
    <Card className="bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Recent Releases</CardTitle>
        <CardDescription>
          An overview of your latest and upcoming tracks.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        {recentReleases.map((release) => (
          <div key={release.id} className="flex items-center justify-between space-x-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-10 w-10 rounded-md">
                <AvatarImage src={release.imageUrl} className="rounded-md" />
                <AvatarFallback className="rounded-md">
                  {release.title.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium leading-none">
                  {release.title}
                </p>
                <p className="text-sm text-muted-foreground">
                  {release.releaseDate}
                </p>
              </div>
            </div>
            <div className='flex items-center gap-4'>
              <Badge variant={statusVariant[release.status]}>{release.status}</Badge>
              <Button asChild variant="ghost" size="icon">
                <Link href={`/releases/${release.id}`}>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
