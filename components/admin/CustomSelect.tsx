'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export interface SelectOption {
    value: string;
    label: string;
    color?: string; // Icon/Text color class e.g. text-red-500
    bgColor?: string; // Background color class for badges
    borderColor?: string;
    icon?: React.ReactNode;
    disabled?: boolean;
}

interface CustomSelectProps {
    name?: string;
    value: string;
    onChange: (value: string) => void;
    options: SelectOption[];
    placeholder?: string;
    className?: string;
    required?: boolean;
    disabled?: boolean;
}

export function CustomSelect({
    name,
    value,
    onChange,
    options,
    placeholder = 'Select option',
    className = '',
    required = false,
    disabled = false
}: CustomSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find(o => o.value === value);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (optionValue: string) => {
        onChange(optionValue);
        setIsOpen(false);
    };

    return (
        <div className={`relative ${className}`} ref={containerRef}>
            {/* Hidden Input for Form Data */}
            {name && <input type="hidden" name={name} value={value} required={required} />}

            <button
                type="button"
                onClick={() => !disabled && setIsOpen(!isOpen)}
                disabled={disabled}
                className={`w-full flex items-center justify-between px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-medium transition-all outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-50 disabled:cursor-not-allowed ${isOpen ? 'ring-2 ring-primary/30 border-primary/50' : 'hover:bg-white/10'}`}
            >
                <span className={`flex items-center gap-2 ${!selectedOption ? 'text-white/30' : ''}`}>
                    {selectedOption ? (
                        <>
                            {selectedOption.icon && <span className={selectedOption.color}>{selectedOption.icon}</span>}
                            <span className={selectedOption.color || 'text-white'}>{selectedOption.label}</span>
                        </>
                    ) : (
                        placeholder
                    )}
                </span>
                <ChevronDown className={`w-4 h-4 text-white/30 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            <div className={`absolute top-full left-0 w-full mt-2 bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl transition-all duration-200 z-50 origin-top ${isOpen ? 'opacity-100 translate-y-0 scale-100 visible' : 'opacity-0 -translate-y-2 scale-95 invisible'}`}>
                <div className="p-1.5 flex flex-col gap-0.5 max-h-[240px] overflow-y-auto">
                    {options.map((option) => (
                        <button
                            type="button"
                            key={option.value}
                            onClick={() => !option.disabled && handleSelect(option.value)}
                            disabled={option.disabled}
                            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-bold uppercase tracking-wider transition-all text-left ${value === option.value
                                ? `bg-white/10 text-white`
                                : option.disabled
                                    ? 'text-white/20 cursor-not-allowed opacity-50'
                                    : 'text-white/50 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <span className={`flex items-center gap-2 ${option.color || ''}`}>
                                {option.icon}
                                {option.label}
                            </span>
                            {value === option.value && <Check className="w-4 h-4 text-primary" />}
                        </button>
                    ))}
                    {options.length === 0 && (
                        <div className="px-4 py-3 text-white/30 text-xs text-center">No options</div>
                    )}
                </div>
            </div>
        </div>
    );
}
