import { getActiveRentals, getCompletedRentals, getScooters } from '@/app/actions';
import RentalsPageClient from './RentalsPageClient';

export default async function RentalsPage() {
    const activeRentalsData = getActiveRentals();
    const completedRentalsData = getCompletedRentals(50);
    const scootersData = getScooters();

    const [activeRentals, completedRentals, scooters] = await Promise.all([
        activeRentalsData,
        completedRentalsData,
        scootersData
    ]);

    return <RentalsPageClient activeRentals={activeRentals} completedRentals={completedRentals} scooters={scooters} />;
}
