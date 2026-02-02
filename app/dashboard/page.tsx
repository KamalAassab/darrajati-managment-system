import { getDashboardStats, getActiveRentals, getLatestRentals, getAnalyticsData } from '@/app/actions';
import DashboardClient from './DashboardClient';

export default async function Dashboard() {
    const stats = await getDashboardStats();
    const analyticsData = await getAnalyticsData();
    const activeRentals = await getActiveRentals();
    const latestRentals = await getLatestRentals(5);

    return (
        <DashboardClient
            stats={stats}
            analyticsData={analyticsData}
            activeRentals={activeRentals}
            latestRentals={latestRentals}
        />
    );
}
