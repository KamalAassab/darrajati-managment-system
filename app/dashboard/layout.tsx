import { getActiveRentals } from '@/app/actions';
import DashboardWrapper from './DashboardWrapper';
import { isOverdue } from '@/lib/utils/currency';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    // Fetch data on the server
    const activeRentals = await getActiveRentals();
    const overdueRentals = activeRentals.filter(r => isOverdue(r.endDate));

    return (
        <DashboardWrapper overdueRentals={overdueRentals}>
            {children}
        </DashboardWrapper>
    );
}
