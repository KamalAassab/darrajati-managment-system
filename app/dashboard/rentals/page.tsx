import { getActiveRentals, getCompletedRentals } from '@/app/actions';
import RentalsPageClient from './RentalsPageClient';

export default async function RentalsPage() {
    const activeRentalsData = getActiveRentals();
    const completedRentalsData = getCompletedRentals(50);

    const [activeRentals, completedRentals] = await Promise.all([
        activeRentalsData,
        completedRentalsData
    ]);

    return <RentalsPageClient activeRentals={activeRentals} completedRentals={completedRentals} />;
}
