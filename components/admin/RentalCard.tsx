'use client';

import { RentalWithDetails } from '@/types/admin';
import { formatMAD, formatDate, formatDateShort, isOverdue } from '@/lib/utils/currency';
import { Calendar, User, Bike, DollarSign, CheckCircle, AlertCircle, Clock, Trash2, Edit2, CreditCard } from 'lucide-react';
import DeleteRentalButton from '@/app/dashboard/rentals/components/DeleteRentalButton';
import CompleteRentalButton from '@/app/dashboard/rentals/components/CompleteRentalButton';
import RevertRentalButton from '@/app/dashboard/rentals/components/RevertRentalButton';

interface RentalCardProps {
    rental: RentalWithDetails;
    onPayment: (rental: RentalWithDetails) => void;
}

export function RentalCard({ rental, onPayment }: RentalCardProps) {
    const overdue = isOverdue(rental.endDate) && rental.status === 'active';
    const remaining = rental.totalPrice - rental.amountPaid;
    const isPaid = remaining <= 0;

    return (
        <div className={`group/rental relative bg-[#0a0a0a] border rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl flex flex-col ${overdue
            ? 'border-red-500/50 shadow-[0_0_30px_-10px_rgba(239,68,68,0.3)] hover:shadow-[0_0_50px_-10px_rgba(239,68,68,0.4)]'
            : 'border-white/10 hover:border-orange/50 hover:shadow-orange/5'
            }`}>
            {/* Overdue Alert Strip */}
            {overdue && (
                <div className="absolute top-0 left-0 w-full h-1 bg-red-500 animate-pulse z-20" />
            )}

            {/* Header */}
            <div className={`p-5 pb-0 flex justify-between items-start relative z-10 ${overdue ? 'bg-gradient-to-b from-red-500/10 to-transparent' : ''}`}>
                <div>
                    <h3 className="text-lg font-black font-outfit text-white uppercase tracking-tight truncate max-w-[180px] group-hover/rental:text-orange transition-colors">
                        {rental.client.fullName}
                    </h3>
                    <div className="flex items-center gap-1.5 mt-1">
                        <span className={`flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${rental.status === 'active'
                            ? overdue
                                ? 'bg-red-500/10 border-red-500/20 text-red-500'
                                : 'bg-blue-500/10 border-blue-500/20 text-blue-400'
                            : 'bg-green-500/10 border-green-500/20 text-green-400'
                            }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${rental.status === 'active'
                                ? overdue ? 'bg-red-500 animate-ping' : 'bg-blue-400 animate-pulse'
                                : 'bg-green-400'
                                }`} />
                            {overdue ? 'Overdue!' : rental.status === 'active' ? 'Active' : 'Completed'}
                        </span>
                    </div>
                </div>
                <div className="text-right">
                    <p className="font-price text-lg text-white leading-none">{formatMAD(rental.totalPrice)}</p>
                    <p className={`text-[10px] font-bold uppercase tracking-widest mt-1 ${isPaid ? 'text-green-500' : 'text-red-500'}`}>
                        {isPaid ? 'Fully Paid' : 'Unpaid'}
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="p-5 flex-1 flex flex-col gap-3">
                {/* Scooter & Dates Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="sm:col-span-2 bg-white/[0.03] rounded-xl p-3 border border-white/[0.03] flex items-center gap-3 group/scooter">
                        <Bike className="w-5 h-5 text-orange group-hover/scooter:scale-110 transition-transform" />
                        <p className="text-sm font-bold text-white tracking-wide">{rental.scooter.name}</p>
                    </div>

                    <div className={`sm:col-span-2 bg-white/[0.03] rounded-xl p-3 border ${overdue ? 'border-red-500/30 bg-red-500/5' : 'border-white/[0.03]'}`}>
                        <div className={`flex items-center gap-3 ${overdue ? 'text-red-400' : 'text-white/80'}`}>
                            <Calendar className="w-5 h-5 text-orange" />
                            <span className="text-xs font-black tracking-tight">
                                {formatDateShort(rental.startDate)}
                                <span className="mx-2 text-white/20">→</span>
                                {formatDateShort(rental.endDate)}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="mt-auto pt-2 grid grid-cols-2 gap-2 opacity-100 sm:opacity-0 sm:translate-y-2 group-hover/rental:opacity-100 group-hover/rental:translate-y-0 transition-all duration-300">
                    {rental.status === 'active' ? (
                        <div className="col-span-2">
                            <CompleteRentalButton rentalId={rental.id} />
                        </div>
                    ) : (
                        <div className="col-span-2">
                            <RevertRentalButton rentalId={rental.id} />
                        </div>
                    )}

                    <button
                        onClick={() => onPayment(rental)}
                        disabled={isPaid}
                        className="py-2.5 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed text-white/60 hover:text-white font-bold text-[10px] uppercase tracking-wider flex items-center justify-center gap-2 transition-colors border border-white/5"
                    >
                        <CreditCard className="w-3.5 h-3.5" />
                        Pay
                    </button>

                    <div className="w-full">
                        <DeleteRentalButton rentalId={rental.id} />
                    </div>
                </div>
            </div>
        </div>
    );
}
