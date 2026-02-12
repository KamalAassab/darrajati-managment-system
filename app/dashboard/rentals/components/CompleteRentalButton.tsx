'use client';

import { completeRental } from '@/app/actions';
import { Check } from 'lucide-react';
import { useState } from 'react';
import { ConfirmModal } from '@/components/admin/ConfirmModal';

export default function CompleteRentalButton({ rentalId, compact = false, className = '' }: { rentalId: string, compact?: boolean, className?: string }) {
    const [loading, setLoading] = useState(false);
    const [confirmModal, setConfirmModal] = useState<{
        isOpen: boolean;
        title: string;
        message: string;
        onConfirm: () => void;
        type?: 'danger' | 'warning' | 'info' | 'success';
        confirmText?: string;
        cancelText?: string;
    }>({
        isOpen: false,
        title: '',
        message: '',
        onConfirm: () => { },
    });

    const handleComplete = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent navigation if inside a Link
        e.stopPropagation();

        setConfirmModal({
            isOpen: true,
            title: 'Complete Rental',
            message: 'Mark this rental as completed? This will free the scooter.',
            type: 'warning',
            confirmText: 'Complete',
            onConfirm: async () => {
                setLoading(true);
                const result = await completeRental(rentalId);

                if (!result.success) {
                    setConfirmModal({
                        isOpen: true,
                        title: 'Error',
                        message: result.message || 'Failed to complete rental',
                        type: 'danger',
                        onConfirm: () => setConfirmModal(prev => ({ ...prev, isOpen: false })),
                        confirmText: 'OK',
                        cancelText: ''
                    });
                }
                setLoading(false);
            }
        });
    };

    return (
        <>
            <button
                onClick={handleComplete}
                disabled={loading}
                className={className || `w-full bg-[#ea6819] hover:bg-[#ea6819]/90 text-white ${compact ? 'p-1.5 text-[10px]' : 'p-3'} rounded-xl transition-all duration-300 flex items-center justify-center gap-3 group/btn shadow-[0_0_30px_-5px_rgba(234,104,25,0.4)] hover:shadow-[0_0_40px_-5px_rgba(234,104,25,0.6)] hover:scale-[1.02] active:scale-[0.98] flex-1 disabled:opacity-50 disabled:cursor-not-allowed`}
                title="Complete Rental"
            >
                {loading ? (
                    <div className={`${compact ? 'w-3 h-3' : 'w-5 h-5'} border-2 border-white/30 border-t-white rounded-full animate-spin`} />
                ) : (
                    <Check className={`${compact ? 'w-3 h-3' : 'w-5 h-5'} stroke-[3px]`} />
                )}
                {(!compact || !loading) && (
                    <span className="font-black uppercase tracking-[0.2em] text-[11px]">
                        {compact ? 'Complete' : (loading ? 'Processing...' : 'Complete Rental')}
                    </span>
                )}
            </button>
            <ConfirmModal
                isOpen={confirmModal.isOpen}
                onClose={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
                onConfirm={confirmModal.onConfirm}
                title={confirmModal.title}
                message={confirmModal.message}
                type={confirmModal.type}
                confirmText={confirmModal.confirmText}
                cancelText={confirmModal.cancelText}
            />
        </>
    );
}
