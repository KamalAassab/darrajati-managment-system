'use client';

import Link from 'next/link';
import { formatMAD, formatDate, isOverdue } from '@/lib/utils/currency';
import { Plus, CheckCircle, Calendar, Activity, History, ArrowRight, Edit } from 'lucide-react';
import DeleteRentalButton from './components/DeleteRentalButton';
import CompleteRentalButton from './components/CompleteRentalButton';
import { useLanguage } from '@/lib/contexts/LanguageContext';

interface RentalsPageClientProps {
    activeRentals: any[];
    completedRentals: any[];
}

export default function RentalsPageClient({ activeRentals, completedRentals }: RentalsPageClientProps) {
    const { t } = useLanguage();

    return (
        <div className="space-y-10 pb-10 font-alexandria">
            <div className="flex justify-between items-end">
                <div>
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-orange text-glow-orange mb-2">{t('rentals')}</p>
                    <h1 className="text-3xl font-extrabold tracking-tight text-white uppercase flex items-center gap-3">
                        <Activity className="w-8 h-8 text-orange" />
                        {t('rentals')}
                    </h1>
                </div>
                <Link
                    href="/dashboard/rentals/new"
                    className="bg-orange text-white px-6 py-3 rounded-2xl flex items-center gap-2 hover:bg-orange/90 transition-all duration-300 orange-glow font-bold uppercase tracking-tight active:scale-95"
                >
                    <Plus className="w-5 h-5" />
                    {t('createRental')}
                </Link>
            </div>

            {/* Active Rentals */}
            <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange animate-pulse" />
                    <h2 className="text-2xl font-bold tracking-tight text-white uppercase">{t('activeRentals')} ({activeRentals.length})</h2>
                </div>

                <div className="grid grid-cols-1 gap-6">
                    {activeRentals.map((rental) => {
                        const overdue = isOverdue(rental.endDate);
                        return (
                            <div
                                key={rental.id}
                                className={`glass-panel rounded-3xl p-8 relative overflow-hidden transition-all duration-500 group ${overdue ? 'orange-glow-border border-red-500/20' : ''
                                    }`}
                            >
                                {overdue && (
                                    <div className="absolute top-0 right-0 px-6 py-2 bg-red-500 text-white text-xs font-bold uppercase tracking-widest rounded-bl-2xl orange-glow">
                                        {t('overdueRentals')}
                                    </div>
                                )}

                                <div className="flex flex-wrap items-start justify-between gap-6 mb-8">
                                    <div className="flex gap-4">
                                        <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-orange/30 transition-colors">
                                            <Calendar className={`w-6 h-6 ${overdue ? 'text-red-500' : 'text-orange'}`} />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold tracking-tight text-white uppercase mb-1">{rental.client.fullName}</h3>
                                            <p className="text-xs font-bold text-white/30 uppercase tracking-[0.2em] font-mono">{rental.client.phone}</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="text-right">
                                            <p className="text-xs font-bold text-white/20 uppercase tracking-widest mb-1">{t('totalPrice')}</p>
                                            <p className="text-2xl font-bold text-orange tracking-tight">{formatMAD(rental.totalPrice)}</p>
                                            {rental.paymentStatus === 'partial' && (
                                                <div className="mt-2 space-y-0.5">
                                                    <div className="flex items-center justify-end gap-2 text-[10px] font-medium uppercase tracking-wider">
                                                        <span className="text-white/40">{t('paid')}:</span>
                                                        <span className="text-green-500">{formatMAD(rental.amountPaid)}</span>
                                                    </div>
                                                    <div className="flex items-center justify-end gap-2 text-[10px] font-medium uppercase tracking-wider">
                                                        <span className="text-white/40">Remaining:</span>
                                                        <span className="text-red-500">{formatMAD(rental.totalPrice - rental.amountPaid)}</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5 group-hover:bg-white/[0.08] transition-all">
                                        <p className="text-xs font-bold text-white/20 uppercase tracking-widest mb-2">{t('scooterName')}</p>
                                        <p className="font-bold text-white text-sm mb-1">{rental.scooter.name}</p>
                                        <span className="text-[11px] font-mono text-orange/60 tracking-[0.2em]">{rental.scooter.plate}</span>
                                    </div>

                                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5 group-hover:bg-white/[0.08] transition-all">
                                        <p className="text-xs font-bold text-white/20 uppercase tracking-widest mb-2">{t('date')}</p>
                                        <div className="flex items-center gap-2 text-white">
                                            <span className="text-xs font-bold">{formatDate(rental.startDate)}</span>
                                            <ArrowRight className="w-3 h-3 text-orange" />
                                            <span className="text-xs font-bold">{formatDate(rental.endDate)}</span>
                                        </div>
                                    </div>

                                    <div className="p-4 rounded-2xl bg-white/5 border border-white/5 group-hover:bg-white/[0.08] transition-all">
                                        <p className="text-xs font-bold text-white/20 uppercase tracking-widest mb-2">{t('status')}</p>
                                        <div className="flex items-center gap-2">
                                            <span className={`w-2 h-2 rounded-full ${rental.paymentStatus === 'paid' ? 'bg-green-500' :
                                                rental.paymentStatus === 'partial' ? 'bg-yellow-500' :
                                                    'bg-red-500'
                                                }`} />
                                            <span className="text-xs font-bold text-white uppercase">{t(rental.paymentStatus as any) || rental.paymentStatus}</span>
                                        </div>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-white/20 text-[10px] uppercase font-bold">{rental.paymentMethod}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 border-t border-white/5 pt-6">
                                    <div className="flex-1">
                                        <CompleteRentalButton rentalId={rental.id} />
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {activeRentals.length === 0 && (
                        <div className="glass-panel p-12 rounded-3xl text-center border-dashed border-white/20">
                            <Calendar className="w-12 h-12 text-white/20 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-white uppercase tracking-tight mb-2">{t('noRentals')}</h3>
                            <Link href="/dashboard/rentals/new" className="text-orange hover:text-orange/80 text-sm font-bold uppercase tracking-widest">
                                {t('createRental')}
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            {/* Rental History */}
            <div className="space-y-6 pt-10 border-t border-white/5">
                <div className="flex items-center gap-3">
                    <History className="w-6 h-6 text-white/40" />
                    <h2 className="text-2xl font-bold tracking-tight text-white/60 uppercase">{t('rentalHistory')}</h2>
                </div>

                <div className="glass-panel rounded-3xl overflow-hidden">
                    <div className="overflow-x-auto admin-scrollbar">
                        <table className="w-full">
                            <thead>
                                <tr className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 border-b border-white/5">
                                    <th className="text-left py-6 px-8">{t('client')}</th>
                                    <th className="text-left py-6 px-6">{t('scooterName')}</th>
                                    <th className="text-left py-6 px-6">{t('date')}</th>
                                    <th className="text-left py-6 px-6">{t('status')}</th>
                                    <th className="text-right py-6 px-8">{t('totalPrice')}</th>
                                    <th className="text-right py-6 px-8">{t('actions')}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/[0.02]">
                                {completedRentals.map((rental) => (
                                    <tr key={rental.id} className="group hover:bg-white/[0.02] transition-colors">
                                        <td className="py-5 px-8">
                                            <div className="font-bold text-white">{rental.client.fullName}</div>
                                            <div className="text-[10px] text-white/40 font-mono mt-0.5">{rental.client.phone}</div>
                                        </td>
                                        <td className="py-5 px-6">
                                            <div className="text-sm text-white/80 font-medium">{rental.scooter.name}</div>
                                            <div className="text-[10px] text-orange/60 font-mono uppercase tracking-wider">{rental.scooter.plate}</div>
                                        </td>
                                        <td className="py-5 px-6">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-[10px] text-white/40 font-bold uppercase tracking-wider">Start: {formatDate(rental.startDate)}</span>
                                                <span className="text-[10px] text-white/40 font-bold uppercase tracking-wider">End: {formatDate(rental.endDate)}</span>
                                            </div>
                                        </td>
                                        <td className="py-5 px-6">
                                            <div className="flex items-center gap-2">
                                                <CheckCircle className="w-3 h-3 text-green-500" />
                                                <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">{t('completed')}</span>
                                            </div>
                                        </td>
                                        <td className="py-5 px-8 text-right font-anton text-white/80 tracking-tight text-lg">{formatMAD(rental.totalPrice)}</td>
                                        <td className="py-5 px-8 text-right">
                                            <DeleteRentalButton rentalId={rental.id} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
