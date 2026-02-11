'use client';

import { Lightbulb, Sparkles } from 'lucide-react';

export default function SmartTips({ tips }: { tips: string[] }) {
    return (
        <div className="glass-panel rounded-3xl p-4 md:p-6 border-white/[0.03] hover:border-white/[0.08] transition-all duration-500 h-full">
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
                <Sparkles className="w-5 h-5 text-primary" />
                <h3 className="text-xl md:text-2xl text-white uppercase font-bold">AI Insights</h3>
            </div>

            {/* Tips List */}
            <div className="space-y-2.5">
                {tips.map((tip, index) => (
                    <div
                        key={index}
                        className="group/tip relative overflow-hidden rounded-xl bg-white/[0.02] border border-white/5 hover:border-primary/20 p-3 transition-all duration-300"
                    >
                        {/* Hover Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 translate-x-[-100%] group-hover/tip:translate-x-[100%] transition-transform duration-1000" />

                        {/* Content */}
                        <div className="relative z-10 flex gap-3">
                            <Lightbulb className="w-4 h-4 text-primary shrink-0" />
                            <p className="text-xs md:text-sm text-white/80 leading-relaxed">
                                {tip}
                            </p>
                        </div>
                    </div>
                ))}

                {tips.length === 0 && (
                    <div className="text-center py-8 text-white/20 uppercase tracking-widest text-xs font-bold">
                        Analyzing Data...
                    </div>
                )}
            </div>
        </div>
    );
}
