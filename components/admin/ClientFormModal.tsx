'use client';

import { useState, useEffect } from 'react';
import { createClient, updateClient } from '@/app/actions';
import { Client } from '@/types/admin';
import { X, Loader2, User, FileBadge, Phone } from 'lucide-react';

interface ClientFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    client?: Client | null; // If present, we are editing
}

export function ClientFormModal({ isOpen, onClose, client }: ClientFormModalProps) {
    const isEdit = !!client;
    // We use different actions based on mode. 
    // However, useFormState hooks need to be at top level.
    // So we might need to handle submission manually or have separate forms.
    // For simplicity and "Premium" interaction, let's use client-side submission wrapper around actions 
    // OR just use separate components if needed. 
    // Actually, we can use client-side fetch pattern or manual form submission to keep it in one component 
    // without complex hook conditionals.

    // Changing approach: Manual submission to generic handler that calls server action.

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        const formData = new FormData(e.currentTarget);

        // Handle "hasDeposit" checkbox manually if needed, but FormData usually captures it if checked.
        // Checkboxes return "on" or value if checked, null if not. Server action expects Checkbox logic.
        // My server actions: createClient checks `formData.get('hasDeposit') === 'true'`?
        // Let's check ClientsPageClient logic: line 191 value="true".

        let result;
        if (isEdit && client) {
            result = await updateClient(client.id, formData);
        } else {
            result = await createClient(null, formData);
        }

        if (result.success) {
            onClose();
        } else {
            setError(result.message || 'Operation failed');
        }
        setIsSubmitting(false);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-300">

                {/* Header */}
                <div className="sticky top-0 z-10 flex items-center justify-between p-6 bg-[#0a0a0a] border-b border-white/10">
                    <h2 className="text-2xl font-anton text-white uppercase tracking-wide">
                        {isEdit ? 'Edit Client' : 'New Client'}
                    </h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto custom-scrollbar">
                    {error && (
                        <div className="p-4 rounded-xl border bg-red-500/10 border-red-500/30 text-red-500 text-sm font-bold">
                            {error}
                        </div>
                    )}

                    <div className="space-y-6">
                        {/* Full Name */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                                <User className="w-4 h-4 text-primary" /> Full Name
                            </label>
                            <input
                                type="text"
                                name="fullName"
                                defaultValue={client?.fullName}
                                required
                                className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium"
                                placeholder="Enter client name"
                            />
                        </div>

                        {/* Row 2: ID & Phone */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                                    <FileBadge className="w-4 h-4 text-blue-500" /> Document ID
                                </label>
                                <input
                                    type="text"
                                    name="documentId"
                                    defaultValue={client?.documentId}
                                    required
                                    className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium"
                                    placeholder="e.g. AB123456"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                                    <Phone className="w-4 h-4 text-green-500" /> Phone
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    defaultValue={client?.phone}
                                    required
                                    className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium"
                                    placeholder="+212 6..."
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4 pt-4 border-t border-white/10">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl font-semibold transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 px-6 py-3 bg-[#ea6819] hover:bg-[#ea6819]/90 disabled:bg-[#ea6819]/50 text-white rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#ea6819]/20"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                isEdit ? 'Update Client' : 'Create Client'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
