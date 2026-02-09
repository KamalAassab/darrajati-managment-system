import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

interface StatusSelectorProps {
    currentStatus: 'available' | 'rented' | 'maintenance';
    onStatusChange: (status: 'available' | 'rented' | 'maintenance') => void;
    isLoading?: boolean;
}

export function StatusSelector({ currentStatus, onStatusChange, isLoading }: StatusSelectorProps) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'available': return 'text-green-500 bg-green-500/10 border-green-500/20';
            case 'rented': return 'text-orange bg-orange/10 border-orange/20';
            case 'maintenance': return 'text-red-500 bg-red-500/10 border-red-500/20';
            default: return 'text-white bg-white/10 border-white/20';
        }
    };

    const getStatusGlow = (status: string) => {
        switch (status) {
            case 'available': return 'shadow-[0_0_20px_rgba(34,197,94,0.2)]';
            case 'rented': return 'shadow-[0_0_20px_rgba(255,107,0,0.2)]';
            case 'maintenance': return 'shadow-[0_0_20px_rgba(239,68,68,0.2)]';
            default: return '';
        }
    };

    const options = [
        { value: 'available', label: 'Available', color: 'text-green-500' },
        { value: 'rented', label: 'Rented', color: 'text-orange' },
        { value: 'maintenance', label: 'Maintenance', color: 'text-red-500' }
    ];

    return (
        <div className="relative min-w-[150px]" ref={containerRef}>
            <button
                onClick={() => !isLoading && setIsOpen(!isOpen)}
                disabled={isLoading}
                className={`w-full flex items-center justify-between pl-5 pr-4 py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest border transition-all outline-none ${getStatusColor(currentStatus)} ${getStatusGlow(currentStatus)} ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-opacity-20 cursor-pointer'}`}
            >
                <span>{options.find(o => o.value === currentStatus)?.label}</span>
                <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    {isLoading ? (
                        <div className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    ) : (
                        <ChevronDown className="w-4 h-4" />
                    )}
                </div>
            </button>

            {/* Dropdown Menu */}
            <div className={`absolute bottom-full mb-2 left-0 w-full bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 z-50 origin-bottom ${isOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-95 pointer-events-none'}`}>
                <div className="p-1.5 flex flex-col gap-0.5">
                    {options.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => {
                                onStatusChange(option.value as any);
                                setIsOpen(false);
                            }}
                            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all hover:bg-white/5 ${option.value === currentStatus ? 'bg-white/5 ' + option.color : 'text-white/50 hover:text-white'}`}
                        >
                            <span className={option.value === currentStatus ? option.color : ''}>{option.label}</span>
                            {option.value === currentStatus && <Check className={`w-3.5 h-3.5 ${option.color}`} />}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
