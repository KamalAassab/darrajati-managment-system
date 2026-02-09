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
    const totalDeposits = clients.reduce((sum, c) => sum + (c.depositAmount || 0), 0);

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {/* Total Clients */}
            <div className="bg-white/5 border border-white/5 rounded-2xl p-4 md:p-6">
                <p className="text-white/40 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-1.5 md:mb-3 truncate">Total Clients</p>
                <div className="flex items-center gap-2 md:gap-3">
                    <Users className="w-5 h-5 md:w-8 md:h-8 text-orange" />
                    <h3 className="text-xl md:text-3xl font-anton text-white">{totalClients}</h3>
                </div>
            </div>

            {/* Active Rentals */}
            <div className="bg-white/5 border border-white/5 rounded-2xl p-4 md:p-6">
                <p className="text-white/40 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-1.5 md:mb-3 truncate">Active Rentals</p>
                <div className="flex items-center gap-2 md:gap-3">
                    <Bike className="w-5 h-5 md:w-8 md:h-8 text-blue-500" />
                    <h3 className="text-xl md:text-3xl font-anton text-white">{activeRentals}</h3>
                </div>
            </div>

            {/* Deposits - Full width on mobile */}
            <div className="col-span-2 md:col-span-1 bg-white/5 border border-white/5 rounded-2xl p-4 md:p-6">
                <p className="text-white/40 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-1.5 md:mb-3">Total Deposits</p>
                <div className="flex items-center gap-2 md:gap-3">
                    <CreditCard className="w-5 h-5 md:w-8 md:h-8 text-green-500" />
                    <h3 className="text-xl md:text-3xl font-anton text-white">{formatMAD(totalDeposits)}</h3>
                </div>
            </div>
        </div>
    );
}
