'use client';

import { useState, useEffect } from 'react';
import { createScooter, updateScooter } from '@/app/actions';
import { Scooter } from '@/types/admin';
import { X, Upload, Loader2, Wrench, ImageIcon, Type, DollarSign, Cpu, Gauge, Hash } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ScooterFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    scooter?: Scooter | null;
}

export function ScooterFormModal({ isOpen, onClose, scooter }: ScooterFormModalProps) {
    const router = useRouter();
    const isEdit = !!scooter;

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: scooter?.name || '',
        engine: scooter?.engine || 0,
        speed: scooter?.speed || 0,
        price: scooter?.price || 0,
        quantity: scooter?.quantity || 1,
    });

    // Reset form when modal opens/closes or scooter changes
    useEffect(() => {
        if (isOpen) {
            setImagePreview(scooter?.image || null);
            setFormData({
                name: scooter?.name || '',
                engine: scooter?.engine || 0,
                speed: scooter?.speed || 0,
                price: scooter?.price || 0,
                quantity: scooter?.quantity || 1,
            });
            setError(null);
            setFieldErrors({});
        }
    }, [isOpen, scooter]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        setFieldErrors({});

        try {
            const formData = new FormData(e.currentTarget);

            let result;
            if (isEdit && scooter) {
                result = await updateScooter(scooter.id, formData);
            } else {
                result = await createScooter(null, formData);
            }

            if (result.success) {
                router.refresh();
                onClose();
            } else {
                if (result.fieldErrors) {
                    setFieldErrors(result.fieldErrors);
                    setError('Please fix the validation errors');
                } else {
                    setError(result.message || 'An error occurred');
                }
            }
        } catch (err) {
            setError('An unexpected error occurred');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0a0a0a] border border-white/10 rounded-3xl shadow-2xl">
                {/* Header */}
                <div className="sticky top-0 z-10 flex items-center justify-between p-6 bg-[#0a0a0a] border-b border-white/10">
                    <h2 className="text-2xl font-anton text-white uppercase tracking-wide">
                        {isEdit ? 'Edit Scooter' : 'Add New Scooter'}
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
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Error Message */}
                    {error && (
                        <div className="p-4 rounded-xl border bg-red-500/10 border-red-500/30 text-red-500">
                            {error}
                        </div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Left Column: Image (Spans 5 columns) */}
                        <div className="lg:col-span-5 flex flex-col h-full">
                            <label className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 mb-3">
                                <ImageIcon className="w-4 h-4 text-primary" /> Scooter Image
                            </label>
                            <div
                                onClick={() => document.getElementById('image-upload')?.click()}
                                className={`
                                    relative flex-1 min-h-[300px] lg:min-h-0 rounded-3xl border-2 border-dashed transition-all cursor-pointer overflow-hidden group
                                    ${imagePreview ? 'border-primary/50 bg-black/40' : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20'}
                                `}
                            >
                                <input
                                    id="image-upload"
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageChange}
                                />
                                {imagePreview ? (
                                    <>
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="absolute inset-0 w-full h-full object-contain p-4 z-10"
                                        />
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity z-20 flex items-center justify-center">
                                            <div className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/20">
                                                <Upload className="w-6 h-6 text-white" />
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white/40 group-hover:text-white/60 transition-colors">
                                        <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                            <Upload className="w-8 h-8" />
                                        </div>
                                        <span className="text-sm font-bold uppercase tracking-widest">Click to Upload</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right Column: Form Fields (Spans 7 columns) */}
                        <div className="lg:col-span-7 space-y-6">
                            {/* Row 1: Name */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                                    <Type className="w-4 h-4 text-primary" /> Model Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name || ''}
                                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                    className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                                    placeholder="e.g. T-Max 560"
                                    required
                                />
                                {fieldErrors.name && (
                                    <p className="text-red-500 text-xs mt-1">{fieldErrors.name[0]}</p>
                                )}
                            </div>

                            {/* Row 2: Commercial Info */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                                        <DollarSign className="w-4 h-4 text-green-500" /> Daily Price
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            name="price"
                                            value={formData.price || ''}
                                            onChange={(e) => setFormData(prev => ({ ...prev, price: Number(e.target.value) }))}
                                            min="0"
                                            className="w-full pl-5 pr-14 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 font-price tracking-wider text-lg transition-all"
                                            placeholder="0"
                                            required
                                        />
                                        <span className="absolute right-5 top-1/2 -translate-y-1/2 text-xs font-bold text-white/30">MAD</span>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                                        <Hash className="w-4 h-4 text-purple-500" /> Quantity
                                    </label>
                                    <input
                                        type="number"
                                        name="quantity"
                                        value={formData.quantity || ''}
                                        onChange={(e) => setFormData(prev => ({ ...prev, quantity: Number(e.target.value) }))}
                                        min="1"
                                        className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                                        placeholder="1"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Row 3: Technical Specs */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                                        <Cpu className="w-4 h-4 text-blue-500" /> Engine
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            name="engine"
                                            value={formData.engine || ''}
                                            onChange={(e) => setFormData(prev => ({ ...prev, engine: Number(e.target.value) }))}
                                            min="0"
                                            className="w-full pl-5 pr-12 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                                            placeholder="0"
                                            required
                                        />
                                        <span className="absolute right-5 top-1/2 -translate-y-1/2 text-xs font-bold text-white/30">CC</span>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                                        <Gauge className="w-4 h-4 text-yellow-500" /> Max Speed
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            name="speed"
                                            value={formData.speed || ''}
                                            onChange={(e) => setFormData(prev => ({ ...prev, speed: Number(e.target.value) }))}
                                            min="0"
                                            className="w-full pl-5 pr-16 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                                            placeholder="0"
                                            required
                                        />
                                        <span className="absolute right-5 top-1/2 -translate-y-1/2 text-xs font-bold text-white/30">KM/H</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Submit Buttons */}
                    <div className="flex gap-4 pt-4 border-t border-white/10">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isSubmitting}
                            className="flex-1 px-6 py-3 bg-white/5 hover:bg-white/10 disabled:opacity-50 text-white rounded-xl font-semibold transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 px-6 py-3 bg-[#ea6819] hover:bg-[#ea6819]/90 disabled:bg-[#ea6819]/50 text-white rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
                        >
                            {isSubmitting && <Loader2 className="w-5 h-5 animate-spin" />}
                            {isEdit ? 'Update Scooter' : 'Create Scooter'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
