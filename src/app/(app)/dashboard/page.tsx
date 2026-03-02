import { Header } from '@/components/header';
import { StatsCards } from '@/components/dashboard/stats-cards';
import { OverviewChart } from '@/components/dashboard/overview-chart';
import { RecentReleases } from '@/components/dashboard/recent-releases';
import { NewReleaseDialog } from '@/components/release/new-release-dialog';

export default function DashboardPage() {
  return (
    <div className="flex flex-1 flex-col">
      <Header
        title="Dashboard"
        breadcrumbs={[{ href: '/dashboard', label: 'Home' }]}
      >
        <NewReleaseDialog />
      </Header>
      <main className="flex-1 p-4 md:p-8">
        <div className="flex flex-col gap-8">
          <StatsCards />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <div className="lg:col-span-4">
              <OverviewChart />
            </div>
            <div className="lg:col-span-3">
              <RecentReleases />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
