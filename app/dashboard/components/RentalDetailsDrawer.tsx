'use client';

import { RentalWithDetails } from '@/types/admin';
import { X, Calendar, User, Bike, CreditCard, Clock, FileText } from 'lucide-react';
import { formatDate, formatMAD, isOverdue } from '@/lib/utils/currency';
import CompleteRentalButton from '@/app/dashboard/rentals/components/CompleteRentalButton';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface RentalDetailsDrawerProps {
    rental: RentalWithDetails | null;
    onClose: () => void;
    isOpen: boolean;
    onEdit?: () => void;
}

export function RentalDetailsDrawer({ rental, onClose, isOpen, onEdit }: RentalDetailsDrawerProps) {
    const [mounted, setMounted] = useState(false);
    const [imageError, setImageError] = useState(false);

    // Reset error state when rental changes
    useEffect(() => {
        setImageError(false);
    }, [rental]);

    useEffect(() => {
        setMounted(true);

        // Lock body scroll when open
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!mounted) return null;

    return createPortal(
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[40] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            />

            {/* Drawer */}
            <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-white/10 shadow-2xl z-[50] transition-transform duration-300 ease-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                {rental && (
                    <div className="h-full flex flex-col">
                        {/* Header */}
                        <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                            <div>
                                <h2 className="text-xl font-black uppercase text-white tracking-tighter">Rental Details</h2>
                                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mt-0.5">ID: #{rental.id}</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-5 space-y-5 admin-scrollbar">

                            {/* Section: Client */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 mb-1">
                                    <User className="w-3 h-3 text-primary" />
                                    <h3 className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em]">Client Information</h3>
                                </div>
                                <div className="glass-panel p-4 rounded-xl space-y-3">
                                    <div>
                                        <label className="text-[9px] uppercase tracking-wider text-white/30 font-bold">Full Name</label>
                                        <p className="text-base font-bold text-white">{rental.client.fullName}</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-[9px] uppercase tracking-wider text-white/30 font-bold">Phone</label>
                                            <p className="text-sm font-sans font-bold text-white/90 tracking-wide">{rental.client.phone}</p>
                                        </div>
                                        {/* Assuming document_id exists on client object, if included in RentalWithDetails */}
                                    </div>
                                </div>
                            </div>

                            {/* Section: Scooter */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 mb-1">
                                    <Bike className="w-3 h-3 text-primary" />
                                    <h3 className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em]">Asset Information</h3>
                                </div>
                                <div className="glass-panel p-4 rounded-xl flex items-center gap-4 relative overflow-hidden group">
                                    <div className="w-20 h-20 rounded-xl bg-white/5 flex items-center justify-center shrink-0 relative overflow-hidden border border-white/10">
                                        {imageError ? (
                                            <Bike className="w-8 h-8 text-white/20" />
                                        ) : (
                                            <img
                                                src={rental.scooter.image}
                                                alt={rental.scooter.name}
                                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                onError={() => setImageError(true)}
                                            />
                                        )}
                                    </div>
                                    <div>
                                        <p className="text-lg font-black text-white uppercase tracking-tight leading-none">{rental.scooter.name}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Section: Financials */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 mb-1">
                                    <CreditCard className="w-3 h-3 text-primary" />
                                    <h3 className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em]">Financial Details</h3>
                                </div>
                                <div className="glass-panel p-4 rounded-xl space-y-3">
                                    <div className="flex justify-between items-center border-b border-white/5 pb-3">
                                        <span className="text-xs text-white/60">Total Amount</span>
                                        <span className="text-lg font-bold text-white font-price">{formatMAD(rental.totalPrice)}</span>
                                    </div>
                                    <div className="flex justify-between items-center border-b border-white/5 pb-3">
                                        <span className="text-xs text-white/60">Amount Paid</span>
                                        <span className="text-base font-bold text-green-500 font-price">{formatMAD(rental.amountPaid)}</span>
                                    </div>
                                    <div className="flex justify-between items-center pt-1">
                                        <span className="text-xs text-white/60">Remaining Balance</span>
                                        <span className={`text-base font-bold font-price ${rental.totalPrice - rental.amountPaid > 0 ? 'text-red-500' : 'text-white/40'}`}>
                                            {formatMAD(rental.totalPrice - rental.amountPaid)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Section: Timeline */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 mb-1">
                                    <Calendar className="w-3 h-3 text-primary" />
                                    <h3 className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em]">Timeline</h3>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="glass-panel p-3 rounded-xl">
                                        <label className="text-[9px] uppercase tracking-wider text-white/30 font-bold mb-1 block">Start Date</label>
                                        <p className="font-bold text-sm text-white">{formatDate(rental.startDate)}</p>
                                    </div>
                                    <div className="glass-panel p-3 rounded-xl border-red-500/20 bg-red-500/5">
                                        <label className="text-[9px] uppercase tracking-wider text-red-400/60 font-bold mb-1 block">End Date</label>
                                        <p className="font-bold text-sm text-red-400">{formatDate(rental.endDate)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer / Actions */}
                        <div className="p-6 border-t border-white/10 bg-black/40 backdrop-blur-md grid grid-cols-2 gap-3">
                            <CompleteRentalButton
                                rentalId={rental.id}
                                className="w-full bg-primary hover:bg-primary/90 text-white p-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1"
                            />
                            {onEdit && (
                                <button
                                    onClick={onEdit}
                                    className="w-full bg-white/5 hover:bg-white/10 text-white p-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest border border-white/10 hover:border-white/20 hover:-translate-y-1"
                                >
                                    <FileText className="w-4 h-4" />
                                    Edit Rental
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>,
        document.body
    );
}
