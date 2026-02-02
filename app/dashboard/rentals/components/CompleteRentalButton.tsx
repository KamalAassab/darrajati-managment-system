'use client';

import { completeRental } from '@/app/actions';
import { CheckCircle } from 'lucide-react';
import { useState } from 'react';

export default function CompleteRentalButton({ rentalId }: { rentalId: string }) {
    const [loading, setLoading] = useState(false);

    const handleComplete = async () => {
        if (!confirm('Mark this rental as completed? This will free the scooter.')) {
            return;
        }

        setLoading(true);
        const result = await completeRental(rentalId);

        if (!result.success) {
            alert(result.message || 'Failed to complete rental');
        }
        setLoading(false);
    };

    return (
        <button
            onClick={handleComplete}
            disabled={loading}
            className="w-full bg-orange hover:bg-orange/90 text-white p-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group/btn shadow-[0_0_20px_-5px_#FF4500] flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Complete Rental"
        >
            {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
                <CheckCircle className="w-5 h-5" />
            )}
            <span className="font-bold text-xs uppercase tracking-widest">
                {loading ? 'Processing...' : 'Complete'}
            </span>
        </button>
    );
}
