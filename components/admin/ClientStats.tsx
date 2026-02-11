'use client';

import { Client } from '@/types/admin';
import { Users, CreditCard, Bike } from 'lucide-react';
import { formatMAD } from '@/lib/utils/currency';

interface ClientStatsProps {
    clients: Client[];
}

export function ClientStats({ clients }: ClientStatsProps) {
    const totalClients = clients.length;
    const activeRentals = clients.filter(c => c.currentScooter).length;
    return (
        <div className="grid grid-cols-2 gap-3 md:gap-4">
            {/* Total Clients */}
            <div className="bg-white/5 border border-white/5 rounded-2xl p-3 md:p-4">
                <p className="text-white/40 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-1 md:mb-2 truncate">Total Clients</p>
                <div className="flex items-center gap-2 md:gap-3">
                    <Users className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                    <h3 className="text-xl md:text-2xl font-anton text-white">{totalClients}</h3>
                </div>
            </div>

            {/* Active Rentals */}
            <div className="bg-white/5 border border-white/5 rounded-2xl p-3 md:p-4">
                <p className="text-white/40 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-1 md:mb-2 truncate">Active Rentals</p>
                <div className="flex items-center gap-2 md:gap-3">
                    <Bike className="w-5 h-5 md:w-6 md:h-6 text-blue-500" />
                    <h3 className="text-xl md:text-2xl font-anton text-white">{activeRentals}</h3>
                </div>
            </div>
        </div>
    );
}
