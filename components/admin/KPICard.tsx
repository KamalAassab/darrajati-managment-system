'use client';

import { ArrowUp, ArrowDown, TrendingUp } from 'lucide-react';

interface KPICardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    trend?: 'up' | 'down' | 'neutral';
    color?: 'primary' | 'success' | 'danger' | 'warning';
}

export function KPICard({ title, value, icon, trend, color = 'primary' }: KPICardProps) {
    const colorVariants = {
        primary: 'border-orange/20 text-orange [&_.icon-bg]:bg-orange/10 [&_.icon]:text-orange',
        success: 'border-green-500/20 text-green-500 [&_.icon-bg]:bg-green-500/10 [&_.icon]:text-green-500',
        danger: 'border-red-500/20 text-red-500 [&_.icon-bg]:bg-red-500/10 [&_.icon]:text-red-500',
        warning: 'border-yellow-500/20 text-yellow-500 [&_.icon-bg]:bg-yellow-500/10 [&_.icon]:text-yellow-500',
    };

    return (
        <div className={`glass-panel rounded-2xl p-6 hover-glow transition-all duration-500 font-alexandria border-white/[0.05] ${colorVariants[color]}`}>
            <div className="flex items-start justify-between">
                <div className="space-y-3">
                    <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/30">{title}</p>
                    <h3 className="text-2xl font-anton tracking-tighter text-white uppercase font-normal">{value}</h3>

                    {trend && (
                        <div className={`flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-widest ${trend === 'up' ? 'text-green-500' : trend === 'down' ? 'text-red-500' : 'text-orange'
                            }`}>
                            {trend === 'up' && <ArrowUp className="w-3 h-3" />}
                            {trend === 'down' && <ArrowDown className="w-3 h-3" />}
                            {trend === 'neutral' && <TrendingUp className="w-3 h-3" />}
                            <span>{trend === 'neutral' ? 'Stable' : trend.toUpperCase()}</span>
                        </div>
                    )}
                </div>

                <div className="icon-bg w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-500 group-hover:rotate-12 border border-white/5">
                    <div className="icon scale-75">
                        {icon}
                    </div>
                </div>
            </div>

            {/* Subtle bottom line glow */}
            <div className="absolute bottom-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-current to-transparent opacity-10" />
        </div>
    );
}
