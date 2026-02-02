import { getScooters } from '@/app/actions';
import NewRentalPageClient from './NewRentalPageClient';

export default async function NewRentalPage() {
    const scooters = await getScooters();

    return <NewRentalPageClient scooters={scooters} />;
}
