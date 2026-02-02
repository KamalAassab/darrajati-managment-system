import { notFound } from 'next/navigation';
import { getRentalById, getScooters } from '@/app/actions';
import EditRentalPageClient from './EditRentalPageClient';

export default async function EditRentalPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    const rental = await getRentalById(resolvedParams.id);
    const scooters = await getScooters();

    if (!rental) {
        notFound();
    }

    return <EditRentalPageClient rental={rental} scooters={scooters} />;
}
