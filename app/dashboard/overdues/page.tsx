import { getOverdueRentals } from '@/app/actions';
import OverduesPageClient from './OverduesPageClient';

export default async function OverduesPage() {
    const overdueRentals = await getOverdueRentals();

    return <OverduesPageClient overdueRentals={overdueRentals} />;
}
