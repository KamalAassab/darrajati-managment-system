'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '@/lib/contexts/LanguageContext';

export function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);

    const languages = [
        { code: 'en' as const, name: 'English', flag: '🇬🇧' },
        { code: 'fr' as const, name: 'Français', flag: '🇫🇷' },
    ];

    const currentLang = languages.find(l => l.code === language);

    return (
        <div className="relative font-alexandria">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-3 px-4 py-2 rounded-xl glass-panel-dark border-white/[0.03] hover:border-orange/20 transition-all duration-300 group"
            >
                <div className="flex flex-col items-start leading-none gap-1">
                    <span className="text-[9px] font-medium uppercase tracking-widest text-white/20">Locale</span>
                    <span className="text-xs font-semibold text-white/80 tracking-tight">{currentLang?.code.toUpperCase()}</span>
                </div>
                <ChevronDown className={`w-3 h-3 text-white/20 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
                    <div className="absolute right-0 mt-3 w-48 glass-panel-dark border-white/[0.05] rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-300">
                        <div className="p-1.5 space-y-1">
                            {languages.map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() => {
                                        setLanguage(lang.code);
                                        setIsOpen(false);
                                    }}
                                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-300 ${lang.code === language
                                        ? 'bg-orange/10 text-orange border border-orange/20'
                                        : 'text-white/40 hover:text-white hover:bg-white/5 border border-transparent'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="text-lg leading-none grayscale-[0.5] group-hover:grayscale-0">{lang.flag}</span>
                                        <span className={`text-sm tracking-tight ${lang.code === language ? 'font-semibold' : 'font-medium'}`}>{lang.name}</span>
                                    </div>
                                    {lang.code === language && (
                                        <div className="w-1 h-1 rounded-full bg-orange animate-pulse" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
