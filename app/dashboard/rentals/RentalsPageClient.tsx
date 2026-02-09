'use client';

import Link from 'next/link';
import { Plus, Search, Activity, Users } from 'lucide-react';
import { RentalPaymentsModal } from '@/components/admin/RentalPaymentsModal';
import { useState } from 'react';
import { RentalWithDetails } from '@/types/admin';
import { RentalStats } from '@/components/admin/RentalStats';
import { RentalCard } from '@/components/admin/RentalCard';

interface RentalsPageClientProps {
    activeRentals: RentalWithDetails[];
    completedRentals: RentalWithDetails[];
}

export default function RentalsPageClient({ activeRentals, completedRentals }: RentalsPageClientProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'completed'>('all');
    const [paymentModalRental, setPaymentModalRental] = useState<RentalWithDetails | null>(null);

    // Combine all rentals for filtering
    const allRentals = [...activeRentals, ...completedRentals];

    // Filter rentals
    const filteredRentals = allRentals.filter(rental => {
        const matchesSearch =
            rental.client.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            rental.scooter.name.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus =
            statusFilter === 'all' ? true :
                statusFilter === 'active' ? rental.status === 'active' :
                    rental.status === 'completed';

        return matchesSearch && matchesStatus;
    });

    return (
        <div className="space-y-10 pb-20 font-alexandria">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <h1 className="text-2xl md:text-3xl text-white uppercase flex items-center gap-3">
                        <Activity className="w-6 h-6 md:w-8 md:h-8 text-orange" />
                        Rentals
                    </h1>
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto">
                    {/* Search */}
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                        <input
                            type="text"
                            placeholder="Search rentals..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-orange/50 transition-all font-medium placeholder:text-white/20"
                        />
                    </div>

                    {/* Create Button */}
                    <Link
                        href="/dashboard/rentals/new"
                        className="bg-orange text-white w-12 h-12 md:w-auto md:h-auto md:px-6 md:py-3 rounded-full md:rounded-2xl flex items-center justify-center gap-2 hover:bg-orange/90 transition-all duration-300 orange-glow font-bold uppercase tracking-tight active:scale-95 cursor-pointer shadow-lg shadow-orange/20"
                    >
                        <Plus className="w-6 h-6 md:w-5 md:h-5" />
                        <span className="hidden md:inline">Create Rental</span>
                    </Link>
                </div>
            </div>

            {/* Stats Overview */}
            <RentalStats activeRentals={activeRentals} completedRentals={completedRentals} />

            {/* Content Area */}
            {filteredRentals.length === 0 ? (
                <div className="glass-panel p-16 rounded-3xl text-center border-dashed border-white/10">
                    <Activity className="w-16 h-16 text-white/10 mx-auto mb-6" />
                    <h3 className="text-2xl text-white uppercase mb-2">No Rentals Found</h3>
                    <p className="text-white/40 text-sm font-mono uppercase tracking-widest">Try adjusting your search</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in slide-in-from-bottom-4 duration-700 delay-100">
                    {filteredRentals.map((rental) => (
                        <RentalCard
                            key={rental.id}
                            rental={rental}
                            onPayment={setPaymentModalRental}
                        />
                    ))}
                </div>
            )}

            <RentalPaymentsModal
                isOpen={!!paymentModalRental}
                onClose={() => setPaymentModalRental(null)}
                rental={paymentModalRental}
            />
        </div>
    );
}
