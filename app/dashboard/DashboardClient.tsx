'use client';

import { KPICard } from '@/components/admin/KPICard';
import { formatMAD, isOverdue } from '@/lib/utils/currency';
import { TrendingUp, Calendar, AlertTriangle, ChevronRight, Activity, Wallet, PieChart } from 'lucide-react';
import Link from 'next/link';
import AnalyticsChart from './components/AnalyticsChart';
import TopScooters from './components/TopScooters';
import SmartTips from './components/SmartTips';

import { useLanguage } from '@/lib/contexts/LanguageContext';

export default function DashboardClient({
    stats,
    analyticsData,
    activeRentals,
    latestRentals
}: {
    stats: any,
    analyticsData: any,
    activeRentals: any[],
    latestRentals: any[]
}) {
    const { t } = useLanguage();
    const overdueRentals = activeRentals.filter(r => isOverdue(r.endDate));

    return (
        <div className="space-y-6 pb-10">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-anton tracking-wide text-white uppercase flex items-center gap-3 font-normal">
                    <Activity className="w-8 h-8 text-orange" />
                    {t('dashboard')}
                </h1>
            </div>

            {/* Overdue Alerts */}
            {overdueRentals.length > 0 && (
                <div className="glass-panel-dark rounded-2xl p-5 border-red-500/20 relative group overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-bl-full -mr-10 -mt-10 blur-2xl" />

                    <div className="flex items-start gap-5 relative z-10">
                        <div className="w-14 h-14 rounded-xl bg-red-500/10 flex items-center justify-center border border-red-500/20">
                            <AlertTriangle className="w-7 h-7 text-red-500" />
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-anton tracking-tight text-2xl text-white uppercase font-normal">{t('error')}</h3>
                                <span className="text-red-500 text-xs font-bold px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 uppercase tracking-[0.2em]">
                                    {overdueRentals.length} {t('overdueRentals')}
                                </span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                {overdueRentals.map((rental) => (
                                    <div key={rental.id} className="bg-black/20 border border-white/10 rounded-xl p-4 flex justify-between items-center hover:border-red-500/30 transition-colors group/item">
                                        <div className="space-y-1">
                                            <p className="text-base font-bold text-white">{rental.client.fullName}</p>
                                            <p className="text-xs uppercase font-bold text-white/40 tracking-wider group-hover/item:text-orange transition-colors">
                                                {rental.scooter.name}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs uppercase font-bold text-red-500 tracking-widest">{rental.endDate}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Main KPI Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <KPICard
                    title={t('totalRevenue')}
                    value={formatMAD(stats.totalRevenue)}
                    icon={<Wallet className="w-6 h-6" />}
                    color="success"
                />
                <KPICard
                    title={t('totalExpenses')}
                    value={formatMAD(stats.totalExpenses)}
                    icon={<PieChart className="w-6 h-6" />}
                    color="danger"
                />
                <KPICard
                    title={t('netProfit')}
                    value={formatMAD(stats.netProfit)}
                    icon={<TrendingUp className="w-6 h-6" />}
                    color={stats.netProfit >= 0 ? 'success' : 'danger'}
                />
                <KPICard
                    title={t('activeRentals')}
                    value={stats.activeRentals}
                    icon={<Calendar className="w-6 h-6" />}
                    color="primary"
                />
            </div>

            {/* Analytics Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Main Chart */}
                <div className="lg:col-span-2">
                    <AnalyticsChart data={analyticsData.monthlyStats} />
                </div>

                {/* Smart Tips */}
                <div className="lg:col-span-1">
                    <SmartTips tips={analyticsData.tips} />
                </div>
            </div>

            {/* Bottom Grid: Top Scooters & Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Top Scooters */}
                <div className="lg:col-span-1">
                    <TopScooters scooters={analyticsData.topScooters} />
                </div>

                {/* Recent Activity */}
                <div className="lg:col-span-2 glass-panel rounded-3xl p-6 border-white/[0.05]">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl font-anton tracking-wide text-white uppercase font-normal">Live Feed</h3>
                        <Link href="/dashboard/rentals" className="text-xs font-bold uppercase tracking-widest text-orange hover:text-white transition-colors flex items-center gap-2 group">
                            View All <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="overflow-x-auto admin-scrollbar">
                        <table className="w-full">
                            <thead>
                                <tr className="text-xs font-bold uppercase tracking-[0.2em] text-white/30 border-b border-white/10">
                                    <th className="text-left py-4 pl-4">Client</th>
                                    <th className="text-left py-4">Scooter</th>
                                    <th className="text-left py-4">Dates</th>
                                    <th className="text-right py-4 pr-4">Total</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/[0.04]">
                                {latestRentals.map((rental) => (
                                    <tr key={rental.id} className="group hover:bg-white/[0.02] transition-colors">
                                        <td className="py-4 pl-4">
                                            <div className="font-bold text-white text-base">{rental.client.fullName}</div>
                                        </td>
                                        <td className="py-4">
                                            <div className="text-sm font-bold text-white/70 uppercase">{rental.scooter.name}</div>
                                        </td>
                                        <td className="py-4">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-xs font-mono font-bold text-white/50">{rental.startDate}</span>
                                                <span className="text-xs font-mono font-bold text-white/50">{rental.endDate}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 pr-4">
                                            <div className="flex flex-col items-end">
                                                <span className="font-bold text-orange text-base tracking-tight">{formatMAD(rental.totalPrice)}</span>
                                                <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded ${rental.status === 'active' ? 'bg-green-500/10 text-green-500' :
                                                    rental.status === 'completed' ? 'bg-blue-500/10 text-blue-500' :
                                                        'bg-white/5 text-white/30'
                                                    }`}>
                                                    {rental.status}
                                                </span>
                                            </div>
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
