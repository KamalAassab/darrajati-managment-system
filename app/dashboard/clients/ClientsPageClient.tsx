'use client';

import { useState, useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { createClient, updateClient, deleteClient } from '@/app/actions';
import { Plus, Search, Phone, CreditCard, Users, X, Edit2, Trash2, AlertCircle, Bike } from 'lucide-react';

export default function ClientsPageClient({ initialClients }: { initialClients: any[] }) {
    const [showForm, setShowForm] = useState(false);
    const [editingClient, setEditingClient] = useState<any>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // useFormState for creation
    const [createState, createAction] = useFormState(createClient, { success: false, message: '' });

    // Effect to close form on success
    useEffect(() => {
        if (createState?.success) {
            setShowForm(false);
        }
    }, [createState]);

    const filteredClients = initialClients.filter((client: any) =>
        client.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.documentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.phone.includes(searchTerm)
    );

    const handleDelete = async (id: string, name: string) => {
        if (confirm(`Delete ${name}? This cannot be undone.`)) {
            const result = await deleteClient(id);
            if (!result.success) {
                alert(result.message || 'Failed to delete client');
            }
        }
    };

    const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData(e.currentTarget);

        const result = await updateClient(editingClient.id, formData);

        if (result.success) {
            setEditingClient(null);
        } else {
            alert(result.message || 'Failed to update client.');
        }
        setIsSubmitting(false);
    };

    return (
        <div className="space-y-8 font-alexandria pb-10">
            <div className="flex justify-between items-end">
                <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-orange mb-2">My Business</p>
                    <h1 className="text-3xl font-anton tracking-tighter text-white uppercase flex items-center gap-3">
                        <Users className="w-8 h-8 text-orange" />
                        Clients
                    </h1>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-orange text-white px-6 py-3 rounded-2xl flex items-center gap-2 hover:bg-orange/90 transition-all duration-300 orange-glow font-bold uppercase tracking-tight active:scale-95 shadow-lg shadow-orange/20"
                >
                    <Plus className={`w-5 h-5 transition-transform duration-300 ${showForm ? 'rotate-45' : ''}`} />
                    {showForm ? 'Cancel' : 'Add Client'}
                </button>
            </div>

            {/* Search */}
            <div className="glass-panel rounded-2xl p-6 relative group border-white/[0.03]">
                <Search className="absolute left-8 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-orange transition-colors" />
                <input
                    type="text"
                    placeholder="Search name, ID, or phone..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-transparent border-none text-white text-lg font-medium focus:ring-0 outline-none placeholder:text-white/10"
                />
            </div>

            {/* Add Client Form */}
            {showForm && (
                <div className="glass-panel rounded-2xl p-8 border-orange/20 animate-in fade-in slide-in-from-top-4 duration-500">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-anton tracking-tighter text-white uppercase">New Client</h2>
                        <button onClick={() => setShowForm(false)} className="text-white/20 hover:text-white transition-colors">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <form action={createAction} className="space-y-6">
                        {createState?.message && !createState.success && (
                            <div className="bg-red-500/10 text-red-500 p-3 rounded-lg text-sm font-medium">
                                {createState.message}
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1">Name</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    required
                                    className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white font-medium focus:ring-2 focus:ring-orange/30 outline-none transition-all"
                                    placeholder="John Doe"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1">ID / Passport</label>
                                <input
                                    type="text"
                                    name="documentId"
                                    required
                                    className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white font-medium focus:ring-2 focus:ring-orange/30 outline-none transition-all"
                                    placeholder="AB123456"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1">Phone</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    required
                                    placeholder="+212..."
                                    className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white font-medium focus:ring-2 focus:ring-orange/30 outline-none transition-all font-mono"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1">Guarantee Deposit (MAD)</label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        name="depositAmount"
                                        step="0.01"
                                        min="0"
                                        defaultValue="0"
                                        className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white font-medium focus:ring-2 focus:ring-orange/30 outline-none transition-all font-mono"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-4 py-4 px-5 rounded-xl bg-white/5 border border-white/10 mt-6 h-[60px]">
                                <input
                                    type="checkbox"
                                    name="hasDeposit"
                                    id="hasDeposit"
                                    value="true"
                                    className="w-5 h-5 rounded border-white/10 bg-white/5 text-orange focus:ring-orange accent-orange outline-none"
                                />
                                <label htmlFor="hasDeposit" className="font-bold text-xs uppercase tracking-widest text-white cursor-pointer select-none">
                                    Guarantee Secured
                                </label>
                            </div>
                        </div>

                        <SubmitButton label="Save Client" />
                    </form>
                </div>
            )}

            {/* Edit Modal */}
            {editingClient && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setEditingClient(null)} />
                    <div className="glass-panel-dark rounded-2xl p-8 w-full max-w-2xl relative z-10 border-orange/20 animate-in zoom-in-95 duration-300">
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h2 className="text-2xl font-anton tracking-tighter text-white uppercase italic">Edit Client</h2>
                            </div>
                            <button onClick={() => setEditingClient(null)} className="text-white/20 hover:text-white transition-colors">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <form onSubmit={handleEditSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1">Name</label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        defaultValue={editingClient.fullName}
                                        required
                                        className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white font-medium focus:ring-2 focus:ring-orange/30 outline-none transition-all"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1">ID / Passport</label>
                                    <input
                                        type="text"
                                        name="documentId"
                                        defaultValue={editingClient.documentId}
                                        required
                                        className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white font-medium focus:ring-2 focus:ring-orange/30 outline-none transition-all"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1">Phone</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        defaultValue={editingClient.phone}
                                        required
                                        className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white font-medium focus:ring-2 focus:ring-orange/30 outline-none transition-all font-mono"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1">Guarantee Deposit</label>
                                    <input
                                        type="number"
                                        name="depositAmount"
                                        defaultValue={editingClient.depositAmount}
                                        step="0.01"
                                        min="0"
                                        className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white font-medium focus:ring-2 focus:ring-orange/30 outline-none transition-all font-mono"
                                    />
                                </div>

                                <div className="flex items-center gap-4 py-4 px-5 rounded-xl bg-white/5 border border-white/10 mt-6 h-[60px]">
                                    <input
                                        type="checkbox"
                                        name="hasDeposit"
                                        id="edit_hasDeposit"
                                        value="true"
                                        defaultChecked={editingClient.hasDeposit}
                                        className="w-5 h-5 rounded border-white/10 bg-white/5 text-orange focus:ring-orange accent-orange"
                                    />
                                    <label htmlFor="edit_hasDeposit" className="font-bold text-xs uppercase tracking-widest text-white cursor-pointer select-none">
                                        Guarantee Secured
                                    </label>
                                </div>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex-1 bg-orange text-white font-bold py-4 rounded-xl hover:bg-orange/90 transition-all duration-300 orange-glow uppercase tracking-wide disabled:opacity-50"
                                >
                                    {isSubmitting ? 'Saving...' : 'Save Changes'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setEditingClient(null)}
                                    className="px-8 bg-white/5 text-white/60 font-bold py-4 rounded-xl hover:bg-white/10 transition-all uppercase tracking-wide"
                                >
                                    Discard
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Clients Table */}
            <div className="glass-panel rounded-3xl overflow-hidden">
                <div className="overflow-x-auto admin-scrollbar">
                    <table className="w-full">
                        <thead>
                            <tr className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 border-b border-white/5">
                                <th className="text-left py-6 px-8">Client Name</th>
                                <th className="text-left py-6 px-6">ID / Contact</th>
                                <th className="text-left py-6 px-6">Guarantee</th>
                                <th className="text-left py-6 px-6">Status</th>
                                <th className="text-right py-6 px-8">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.02]">
                            {filteredClients.map((client: any) => (
                                <tr key={client.id} className="group hover:bg-white/[0.02] transition-colors">
                                    <td className="py-5 px-8">
                                        <div className="font-bold text-white text-sm">{client.fullName}</div>
                                    </td>
                                    <td className="py-5 px-6">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-xs font-mono text-white/60 uppercase">{client.documentId}</span>
                                            <span className="text-[10px] text-white/30 font-mono">{client.phone}</span>
                                        </div>
                                    </td>
                                    <td className="py-5 px-6">
                                        {client.hasDeposit ? (
                                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-green-500/10 border border-green-500/20">
                                                <CreditCard className="w-3 h-3 text-green-500" />
                                                <span className="text-xs font-bold text-green-500">{client.depositAmount} MAD</span>
                                            </div>
                                        ) : (
                                            <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">None</span>
                                        )}
                                    </td>
                                    <td className="py-5 px-6">
                                        {client.currentScooter ? (
                                            <div className="inline-flex flex-col">
                                                <span className="text-[10px] font-bold text-orange uppercase tracking-widest">Active</span>
                                                <span className="text-[9px] text-white/40">{client.currentScooter}</span>
                                            </div>
                                        ) : (
                                            <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Inactive</span>
                                        )}
                                    </td>
                                    <td className="py-5 px-8 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => setEditingClient(client)}
                                                className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-white/60 hover:text-white transition-colors"
                                                title="Edit"
                                            >
                                                <Edit2 className="w-3.5 h-3.5" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(client.id, client.fullName)}
                                                className="p-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg text-red-500 transition-colors"
                                                title="Delete"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredClients.length === 0 && (
                    <div className="text-center py-24">
                        <Users className="w-12 h-12 text-white/10 mx-auto mb-4" />
                        <h3 className="text-xl font-anton tracking-tighter text-white uppercase">No Clients Found</h3>
                        <p className="text-muted-foreground text-[10px] tracking-[0.2em] uppercase">Add a new client to get started</p>
                    </div>
                )}
            </div>
        </div>
    );
}

function SubmitButton({ label }: { label: string }) {
    const { pending } = useFormStatus();
    return (
        <div className="flex gap-4 pt-4">
            <button
                type="submit"
                disabled={pending}
                className="flex-1 bg-orange text-white font-bold py-4 rounded-xl hover:bg-orange/90 transition-all duration-300 orange-glow uppercase tracking-wide disabled:opacity-50 flex justify-center items-center gap-2"
            >
                {pending && <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />}
                {pending ? 'Saving...' : label}
            </button>
        </div>
    );
}
