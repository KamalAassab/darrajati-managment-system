import { getExpenses, getDashboardStats } from '@/app/actions';
import FinancesPageClient from './FinancesPageClient';

export default async function FinancesPage() {
    const [expenses, dashboardStats] = await Promise.all([
        getExpenses(),
        getDashboardStats(),
    ]);

    // Ensure data is plain JSON
    const cleanExpenses = JSON.parse(JSON.stringify(expenses));
    const cleanStats = JSON.parse(JSON.stringify(dashboardStats));

    return <FinancesPageClient expenses={cleanExpenses} dashboardStats={cleanStats} />;
}
