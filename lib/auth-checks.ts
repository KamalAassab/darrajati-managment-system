import { redirect } from 'next/navigation';
import { auth } from '@/auth';

export interface AuthUser {
    userId: string;
    username: string;
}

export async function getAuthUser(): Promise<AuthUser | null> {
    try {
        const session = await auth();

        if (!session?.user) {
            return null;
        }

        return {
            userId: session.user.id || '',
            username: session.user.name || '',
        };
    } catch (error) {
        return null;
    }
}

export async function requireAuth(): Promise<AuthUser> {
    const user = await getAuthUser();

    if (!user) {
        redirect('/login');
    }

    return user;
}
