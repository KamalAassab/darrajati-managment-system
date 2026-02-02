import { getClients } from '@/app/actions';
import ClientsPageClient from './ClientsPageClient';

export default async function ClientsPage() {
    const clients = await getClients();
    return <ClientsPageClient initialClients={clients} />;
}
