'use client';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function AnalyticsChart({ data }: { data: any[] }) {
    if (!data || data.length === 0) return (
        <div className="h-[300px] flex items-center justify-center text-white/20 uppercase tracking-widest text-xs">
            No data available
        </div>
    );

    return (
        <div className="glass-panel rounded-3xl p-6 border-white/[0.05]">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-2xl font-anton tracking-wide text-white uppercase font-normal">Financial Performance</h3>
                    <p className="text-xs text-white/50 uppercase tracking-[0.2em] font-bold mt-1">
                        Revenue vs Expenses (Last 6 Months)
                    </p>
                </div>
                <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-orange" />
                        <span className="text-xs uppercase font-bold tracking-widest text-white/60">Revenue</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <span className="text-xs uppercase font-bold tracking-widest text-white/60">Expenses</span>
                    </div>
                </div>
            </div>

            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#FB923C" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#FB923C" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                        <XAxis
                            dataKey="month"
                            stroke="rgba(255,255,255,0.2)"
                            tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12, fontFamily: 'var(--font-alexandria)', fontWeight: 600 }}
                            tickLine={false}
                            axisLine={false}
                            dy={10}
                        />
                        <YAxis
                            stroke="rgba(255,255,255,0.2)"
                            tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12, fontFamily: 'var(--font-alexandria)', fontWeight: 600 }}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `${value / 1000}k`}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#1a1a1a',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '12px',
                                fontFamily: 'var(--font-alexandria)'
                            }}
                            itemStyle={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 'bold' }}
                        />
                        <Area
                            type="monotone"
                            dataKey="revenue"
                            stroke="#FB923C"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorRevenue)"
                        />
                        <Area
                            type="monotone"
                            dataKey="expenses"
                            stroke="#EF4444"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorExpenses)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
