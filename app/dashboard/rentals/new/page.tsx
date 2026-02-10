import { getScooters } from '@/app/actions';
import NewRentalPageClient from './NewRentalPageClient';

export const dynamic = 'force-dynamic';

export default async function NewRentalPage() {
    const scooters = await getScooters();

    return <NewRentalPageClient scooters={scooters} />;
}
