'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createRental } from '@/app/actions';
import { calculateRentalPrice, formatMAD } from '@/lib/utils/currency';
import { X, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { CustomSelect } from '@/components/admin/CustomSelect';

export default function NewRentalPageClient({
    scooters,
}: {
    scooters: any[];
}) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [selectedScooter, setSelectedScooter] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);
    const [amountPaid, setAmountPaid] = useState(0);
    const [isAmountManuallyChanged, setIsAmountManuallyChanged] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('cash');

    const scooterOptions = scooters.map(s => ({
        value: s.id,
        label: s.status === 'available'
            ? `${s.name} - ${formatMAD(s.price)}/day`
            : `${s.name} (${s.status === 'maintenance' ? 'MAINTENANCE' : 'RENTED'})`,
        disabled: s.status !== 'available',
        color: s.status !== 'available' ? 'text-red-500/50' : undefined
    }));

    const paymentOptions = [
        { value: 'cash', label: 'Cash' },
        { value: 'transfer', label: 'Transfer' }
    ];

    useEffect(() => {
        if (selectedScooter && startDate && endDate) {
            const scooter = scooters.find(s => s.id === selectedScooter);
            if (scooter) {
                const price = calculateRentalPrice(scooter.price, startDate, endDate);
                setTotalPrice(price);
                if (!isAmountManuallyChanged) {
                    setAmountPaid(price);
                }
            }
        }
    }, [selectedScooter, startDate, endDate, scooters, isAmountManuallyChanged]);

    const derivedPaymentStatus = amountPaid >= totalPrice ? 'paid' : (amountPaid > 0 ? 'partial' : 'pending');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        formData.set('totalPrice', totalPrice.toString());
        formData.set('amountPaid', amountPaid.toString());
        formData.set('paymentStatus', derivedPaymentStatus);

        // CustomSelect adds hidden inputs for scooterId and paymentMethod automatically

        try {
            const result = await createRental(null, formData);
            if (result.success) {
                router.push('/dashboard/rentals');
                router.refresh();
            } else {
                alert(`Error: ${result.message}`);
                setLoading(false);
            }
        } catch (error) {
            alert('An error occurred');
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-start min-h-full py-10 animate-in fade-in zoom-in-95 duration-500 font-inter">
            <div className="w-full max-w-4xl bg-[#0a0a0a] border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
                {/* Header */}
                <div className="p-8 border-b border-white/10 bg-[#0a0a0a] flex justify-between items-center sticky top-0 z-50 backdrop-blur-md bg-opacity-90">
                    <div>
                        <h2 className="text-3xl font-anton uppercase tracking-tight text-white">
                            Create Rental
                        </h2>
                        <p className="text-xs text-white/50 font-mono mt-1 uppercase tracking-widest">
                            New rental agreement
                        </p>
                    </div>
                    <Link
                        href="/dashboard/rentals"
                        className="p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </Link>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-10">
                    {/* Client Information Section */}
                    <div className="space-y-6">
                        <h3 className="text-lg text-white font-bold uppercase tracking-wide flex items-center gap-3">
                            <span className="w-8 h-[1px] bg-primary"></span>
                            Client Information
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1">Full Name *</label>
                                <input
                                    type="text"
                                    name="clientFullName"
                                    required
                                    className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white font-medium focus:ring-2 focus:ring-primary/30 outline-none transition-all placeholder:text-white/10"
                                    placeholder="e.g., John Doe"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1">Document ID *</label>
                                <input
                                    type="text"
                                    name="clientDocumentId"
                                    required
                                    className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white font-medium focus:ring-2 focus:ring-primary/30 outline-none transition-all placeholder:text-white/10"
                                    placeholder="G123456"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1">Phone *</label>
                                <input
                                    type="tel"
                                    name="clientPhone"
                                    required
                                    className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white font-medium focus:ring-2 focus:ring-primary/30 outline-none transition-all placeholder:text-white/10"
                                    placeholder="0612345678"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="h-[1px] bg-white/5 w-full"></div>

                    {/* Rental Details Section */}
                    <div className="space-y-6">
                        <h3 className="text-lg text-white font-bold uppercase tracking-wide flex items-center gap-3">
                            <span className="w-8 h-[1px] bg-primary"></span>
                            Rental Details
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1">Scooter *</label>
                                <CustomSelect
                                    name="scooterId"
                                    value={selectedScooter}
                                    onChange={setSelectedScooter}
                                    options={scooterOptions}
                                    placeholder="Select a scooter"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1">Start Date *</label>
                                <input
                                    type="date"
                                    name="startDate"
                                    required
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white font-medium focus:ring-2 focus:ring-primary/30 outline-none transition-all cursor-pointer"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1">End Date *</label>
                                <input
                                    type="date"
                                    name="endDate"
                                    required
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    min={startDate}
                                    className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white font-medium focus:ring-2 focus:ring-primary/30 outline-none transition-all cursor-pointer"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1">Deposit (MAD) *</label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        name="amountPaid"
                                        min="0"
                                        step="1"
                                        required
                                        value={amountPaid}
                                        onChange={(e) => {
                                            setAmountPaid(Math.max(0, parseInt(e.target.value) || 0));
                                            setIsAmountManuallyChanged(true);
                                        }}
                                        className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white font-medium focus:ring-2 focus:ring-primary/30 outline-none transition-all"
                                        placeholder="0.00"
                                    />
                                    <span className="absolute right-5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-white/20 uppercase tracking-widest">MAD</span>
                                </div>
                            </div>



                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1">Payment Method *</label>
                                <CustomSelect
                                    name="paymentMethod"
                                    value={paymentMethod}
                                    onChange={setPaymentMethod}
                                    options={paymentOptions}
                                    required
                                />
                            </div>

                            <div className="space-y-2 pt-1 sm:col-span-2 md:col-span-1">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1 block mb-2">Security Deposit</label>
                                <label className="relative flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-xl hover:border-primary/30 transition-all cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        name="hasGuarantee"
                                        className="peer sr-only"
                                    />
                                    <div className="h-5 w-5 rounded border-2 border-white/20 bg-transparent transition-all peer-checked:border-primary peer-checked:bg-primary flex items-center justify-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-3.5 w-3.5 text-black opacity-0 transition-opacity peer-checked:opacity-100 font-bold"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                    <span className="text-sm font-bold text-white group-hover:text-white/90">
                                        Guarantee Check (1000 MAD)
                                    </span>
                                </label>
                            </div>
                        </div>

                        {totalPrice > 0 && (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                                <div className="p-6 bg-primary/5 border border-primary/20 rounded-2xl flex flex-col items-center justify-center text-center">
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-primary/60 mb-2">Total Price</p>
                                    <p className="text-3xl font-anton text-primary">{formatMAD(totalPrice)}</p>
                                </div>

                                <div className={`p-6 border rounded-2xl flex flex-col items-center justify-center text-center ${derivedPaymentStatus === 'paid' ? 'bg-green-500/5 border-green-500/20' : 'bg-green-500/5 border-green-500/20'}`}>
                                    <p className={`text-[10px] font-bold uppercase tracking-widest mb-2 ${derivedPaymentStatus === 'paid' ? 'text-green-500/60' : 'text-green-500/60'}`}>Deposit</p>
                                    <p className={`text-3xl font-anton ${derivedPaymentStatus === 'paid' ? 'text-green-500' : 'text-green-500'}`}>{formatMAD(amountPaid)}</p>
                                </div>

                                <div className={`p-6 border rounded-2xl flex flex-col items-center justify-center text-center ${derivedPaymentStatus === 'paid' ? 'bg-white/5 border-white/10' : 'bg-red-500/5 border-red-500/20'}`}>
                                    <p className={`text-[10px] font-bold uppercase tracking-widest mb-2 ${derivedPaymentStatus === 'paid' ? 'text-white/40' : 'text-red-500/60'}`}>Remaining</p>
                                    <p className={`text-3xl font-anton ${derivedPaymentStatus === 'paid' ? 'text-white/40' : 'text-red-500'}`}>{formatMAD(Math.max(0, totalPrice - amountPaid))}</p>
                                </div>
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1">Notes</label>
                            <textarea
                                name="notes"
                                rows={3}
                                className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white font-medium focus:ring-2 focus:ring-primary/30 outline-none transition-all placeholder:text-white/10"
                                placeholder="Add any additional notes..."
                            />
                        </div>
                    </div>

                    <div className="flex gap-4 pt-4 border-t border-white/5">
                        <Link
                            href="/dashboard/rentals"
                            className="flex-1 py-4 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white rounded-xl font-bold uppercase tracking-wide transition-all text-center flex items-center justify-center"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={loading || !selectedScooter || !startDate || !endDate}
                            className="flex-[2] bg-primary text-white font-bold py-4 rounded-xl hover:bg-primary/90 transition-all primary-glow uppercase tracking-wide flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Saving...
                                </>
                            ) : 'Create Rental'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
