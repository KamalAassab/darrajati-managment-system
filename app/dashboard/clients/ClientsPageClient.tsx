'use client';

import { useState } from 'react';
import { Client } from '@/types/admin';
import { deleteClient } from '@/app/actions';
import { Plus, Search, Users } from 'lucide-react';
import { ClientStats } from '@/components/admin/ClientStats';
import { ClientCard } from '@/components/admin/ClientCard';
import { ClientFormModal } from '@/components/admin/ClientFormModal';
import { ConfirmModal } from '@/components/admin/ConfirmModal';

interface ClientsPageClientProps {
    initialClients: Client[];
}

export default function ClientsPageClient({ initialClients }: ClientsPageClientProps) {
    // State
    const [clients, setClients] = useState<Client[]>(initialClients);
    const [searchTerm, setSearchTerm] = useState('');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingClient, setEditingClient] = useState<Client | null>(null);

    // Confirm Modal
    const [confirmModal, setConfirmModal] = useState<{
        isOpen: boolean;
        title: string;
        message: string;
        onConfirm: () => void;
        type?: 'danger' | 'warning' | 'info' | 'success';
    }>({
        isOpen: false,
        title: '',
        message: '',
        onConfirm: () => { },
    });

    // Filtering
    const filteredClients = initialClients.filter(client =>
        client.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.documentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.phone.includes(searchTerm)
    );

    // Handlers
    const handleCreate = () => {
        setEditingClient(null);
        setIsFormOpen(true);
    };

    const handleEdit = (client: Client) => {
        setEditingClient(client);
        setIsFormOpen(true);
    };

    const handleDelete = (id: string, name: string) => {
        setConfirmModal({
            isOpen: true,
            title: 'Delete Client',
            message: `Are you sure you want to delete ${name}? This action cannot be undone.`,
            type: 'danger',
            onConfirm: async () => {
                try {
                    const result = await deleteClient(id);
                    if (!result.success) {
                        alert(result.message); // Fallback for error
                    } else {
                        setConfirmModal(prev => ({ ...prev, isOpen: false }));
                    }
                } catch (error) {
                    console.error('Delete failed', error);
                }
            }
        });
    };

    return (
        <div className="space-y-10 font-inter pb-20">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <h1 className="text-2xl md:text-3xl text-white uppercase flex items-center gap-3 font-anton">
                        <Users className="w-6 h-6 md:w-8 md:h-8 text-[#ea6819]" />
                        Client Database
                    </h1>
                </div>

                <div className="flex flex-col-reverse md:flex-row items-center gap-4 w-full md:w-auto">
                    {/* Search */}
                    <div className="relative w-full md:w-72 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within:text-primary transition-colors" />
                        <input
                            type="text"
                            placeholder="Search clients..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-11 pr-4 py-3 text-sm text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all font-medium placeholder:text-white/20 shadow-xl shadow-black/5"
                        />
                    </div>

                    {/* Add Button */}
                    <button
                        onClick={handleCreate}
                        className="bg-[#ea6819] text-white w-full md:w-auto h-12 md:h-auto px-6 py-3 rounded-2xl flex items-center justify-center gap-2 hover:bg-[#ea6819]/90 transition-all duration-300 primary-glow font-bold uppercase tracking-tight active:scale-95 cursor-pointer shadow-lg shadow-[#ea6819]/20"
                    >
                        <Plus className="w-5 h-5" />
                        <span>Add Client</span>
                    </button>
                </div>
            </div>

            {/* Stats Overview */}
            <ClientStats clients={initialClients} />

            {/* Content Area */}
            {filteredClients.length === 0 ? (
                <div className="glass-panel p-16 rounded-3xl text-center border-dashed border-white/10">
                    <Users className="w-16 h-16 text-white/10 mx-auto mb-6" />
                    <h3 className="text-2xl text-white uppercase mb-2">No Clients Found</h3>
                    <p className="text-white/40 text-sm font-mono uppercase tracking-widest">Try adjusting your search</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in slide-in-from-bottom-4 duration-700 delay-100">
                    {filteredClients.map((client) => (
                        <ClientCard
                            key={client.id}
                            client={client}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            )}

            {/* Modals */}
            <ClientFormModal
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                client={editingClient}
            />

            <ConfirmModal
                isOpen={confirmModal.isOpen}
                onClose={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
                onConfirm={confirmModal.onConfirm}
                title={confirmModal.title}
                message={confirmModal.message}
                type={confirmModal.type}
            />
        </div >
    );
}
