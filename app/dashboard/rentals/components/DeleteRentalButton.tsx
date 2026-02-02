'use client';

import { deleteRental } from '@/app/actions';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';

export default function DeleteRentalButton({ rentalId }: { rentalId: string }) {
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this rental? This will reset the scooter status.')) {
            return;
        }

        setLoading(true);

        const result = await deleteRental(rentalId);
        if (!result.success) {
            alert(result.message || 'Failed to delete rental');
        }
        setLoading(false);
    };

    return (
        <button
            onClick={handleDelete}
            disabled={loading}
            className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-500 p-3 rounded-xl transition-all flex items-center justify-center border border-red-500/20 hover:scale-105 active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            title="Delete Rental"
        >
            <Trash2 className="w-4 h-4" />
        </button>
    );
}
