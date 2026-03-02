import { Header } from '@/components/header';
import { NewReleaseDialog } from '@/components/release/new-release-dialog';
import { ReleasesTable } from '@/components/release/releases-table';
import { mockReleases } from '@/lib/mock-data';

export default function ReleasesPage() {
  return (
    <div className="flex flex-1 flex-col">
      <Header
        title="Releases"
        breadcrumbs={[
          { href: '/dashboard', label: 'Home' },
        ]}
      >
        <NewReleaseDialog />
      </Header>
      <main className="flex-1 p-4 md:p-8">
        <ReleasesTable data={mockReleases} />
      </main>
    </div>
  );
}
