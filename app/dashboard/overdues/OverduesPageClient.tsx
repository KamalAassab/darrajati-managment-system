'use client';

import { useState } from 'react';
import { RentalWithDetails } from '@/types/admin';
import { AlertTriangle, Calendar } from 'lucide-react';
import { RentalDetailsDrawer } from '@/app/dashboard/components/RentalDetailsDrawer';
import { formatMAD, formatDate } from '@/lib/utils/currency';

interface OverduesPageClientProps {
    overdueRentals: RentalWithDetails[];
}

export default function OverduesPageClient({ overdueRentals }: OverduesPageClientProps) {
    const [selectedRental, setSelectedRental] = useState<RentalWithDetails | null>(null);

    return (
        <div className="space-y-8 pb-20 font-outfit">
            {/* Header */}
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-red-500" />
                </div>
                <div>
                    <h1 className="text-2xl md:text-3xl text-white uppercase font-bold">Overdue Rentals</h1>
                    <p className="text-xs text-white/40 uppercase tracking-widest mt-1">
                        {overdueRentals.length} {overdueRentals.length === 1 ? 'rental' : 'rentals'} past due date
                    </p>
                </div>
            </div>

            {/* Content */}
            {overdueRentals.length === 0 ? (
                <div className="glass-panel p-16 rounded-3xl text-center border-dashed border-white/10">
                    <AlertTriangle className="w-16 h-16 text-white/10 mx-auto mb-6" />
                    <h3 className="text-2xl text-white uppercase mb-2">No Overdue Rentals</h3>
                    <p className="text-white/40 text-sm font-mono uppercase tracking-widest">All rentals are on schedule</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                    {overdueRentals.map((rental) => {
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        const endDay = new Date(rental.endDate);
                        endDay.setHours(0, 0, 0, 0);
                        const daysOverdue = Math.round(
                            (today.getTime() - endDay.getTime()) / (1000 * 60 * 60 * 24)
                        );

                        return (
                            <button
                                key={rental.id}
                                onClick={() => setSelectedRental(rental)}
                                className="w-full glass-panel rounded-2xl p-4 flex items-center justify-between gap-4 hover:border-red-500/30 transition-all group text-left"
                            >
                                {/* Info */}
                                <div className="min-w-0 flex-1">
                                    <h3 className="text-sm font-bold text-white truncate group-hover:text-red-400 transition-colors mb-1">
                                        {rental.client.fullName}
                                    </h3>
                                    <p className="text-xs text-white/40 truncate">{rental.scooter.name}</p>
                                </div>

                                {/* Days Overdue */}
                                <div className="flex-shrink-0 text-right">
                                    <p className="text-2xl font-black text-red-500 font-outfit leading-none">{daysOverdue}</p>
                                    <p className="text-[9px] uppercase tracking-widest text-red-400/60 mt-1">days late</p>
                                </div>
                            </button>
                        );
                    })}
                </div>
            )}

            {/* Rental Details Drawer */}
            <RentalDetailsDrawer
                rental={selectedRental}
                isOpen={!!selectedRental}
                onClose={() => setSelectedRental(null)}
            />
        </div>
    );
}
