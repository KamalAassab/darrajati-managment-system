import { getScooters } from '@/app/actions';
import { Bike } from 'lucide-react';
import { AdminScootersTable } from '@/components/admin/AdminScootersTable';

export const dynamic = 'force-dynamic';

export default async function ScootersPage() {
    const scooters = await getScooters();

    return (
        <div className="space-y-10 font-alexandria">
            <div className="flex justify-between items-end">
                <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-orange text-glow-orange mb-2">Fleet Logistics</p>
                    <h1 className="text-4xl font-anton tracking-tighter text-white uppercase flex items-center gap-3">
                        <Bike className="w-8 h-8 text-orange" />
                        Scooters Management
                    </h1>
                </div>
                {/* NOTE: "Add New Scooter" button has been intentionally removed */}
            </div>

            <AdminScootersTable scooters={scooters} />
        </div>
    );
}
