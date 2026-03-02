import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getReleaseById } from '@/lib/mock-data';
import { Header } from '@/components/header';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { MarketingCopySection } from '@/components/release/marketing-copy-section';
import { ImageGenerationSection } from '@/components/release/image-generation-section';
import { Separator } from '@/components/ui/separator';

type ReleaseDetailPageProps = {
  params: {
    id: string;
  };
};

export default function ReleaseDetailPage({ params }: ReleaseDetailPageProps) {
  const release = getReleaseById(params.id);

  if (!release) {
    notFound();
  }

  const statusVariant = {
    'In Progress': 'default',
    Released: 'secondary',
    Planning: 'outline',
  } as const;


  return (
    <div className="flex flex-1 flex-col">
      <Header
        title={release.title}
        breadcrumbs={[
          { href: '/dashboard', label: 'Home' },
          { href: '/releases', label: 'Releases' },
        ]}
      >
        <Button asChild variant="outline" size="sm">
          <Link href="/releases">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Releases
          </Link>
        </Button>
      </Header>
      <main className="flex-1 p-4 md:p-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="grid auto-rows-max items-start gap-8 lg:col-span-1">
             <Card>
              <CardHeader>
                <CardTitle>{release.title}</CardTitle>
                <CardDescription>by {release.artist}</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <Badge variant={statusVariant[release.status]}>{release.status}</Badge>
                </div>
                 <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Release Date</span>
                  <span>{release.releaseDate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Genre</span>
                  <span>{release.genre}</span>
                </div>
                <Separator />
                <p className='text-sm text-muted-foreground'>{release.description}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Stems & Assets</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Securely manage your audio stems and other assets.
                </p>
                <Button className="mt-4 w-full">Upload Files</Button>
              </CardContent>
            </Card>
          </div>
          <div className="grid auto-rows-max items-start gap-8 lg:col-span-2">
            <div className="grid gap-8 lg:grid-cols-2">
              <MarketingCopySection release={release} />
              <ImageGenerationSection release={release} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
