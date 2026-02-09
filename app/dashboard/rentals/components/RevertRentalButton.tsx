'use client';

import { revertRental } from '@/app/actions';
import { RefreshCcw } from 'lucide-react';
import { useState } from 'react';
import { ConfirmModal } from '@/components/admin/ConfirmModal';

export default function RevertRentalButton({ rentalId }: { rentalId: string }) {
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

    const handleRevert = () => {
        setConfirmModal({
            isOpen: true,
            title: 'Revert Rental Completion',
            message: 'Are you sure you want to revert this rental to active status? This will mark the scooter as rented again.',
            type: 'warning',
            confirmText: 'Revert',
            onConfirm: async () => {
                setLoading(true);
                const result = await revertRental(rentalId);

                if (!result.success) {
                    setConfirmModal({
                        isOpen: true,
                        title: 'Error',
                        message: result.message || 'Failed to revert rental',
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
                onClick={handleRevert}
                disabled={loading}
                className="w-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white p-2.5 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group/btn border border-white/5 hover:border-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Revert Status"
            >
                {loading ? (
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                    <RefreshCcw className="w-3.5 h-3.5" />
                )}
                <span className="font-bold text-[10px] uppercase tracking-wider">
                    {loading ? 'Reverting...' : 'Revert'}
                </span>
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
