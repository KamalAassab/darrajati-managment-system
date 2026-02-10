import { getDashboardStats, getActiveRentals, getLatestRentals, getAnalyticsData } from '@/app/actions';
import DashboardClient from './DashboardClient';

export default async function Dashboard() {
    const [stats, analyticsData, activeRentals, latestRentals] = await Promise.all([
        getDashboardStats(),
        getAnalyticsData(),
        getActiveRentals(),
        getLatestRentals(5)
    ]);

    return (
        <DashboardClient
            stats={stats}
            analyticsData={analyticsData}
            activeRentals={activeRentals}
            latestRentals={latestRentals}
        />
    );
}
