import { getCurrentUser } from '@/app/actions';
import SettingsPageClient from './SettingsPageClient';

export default async function SettingsPage() {
    const currentUser = await getCurrentUser();

    return <SettingsPageClient currentUser={currentUser} />;
}
