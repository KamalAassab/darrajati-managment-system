'use server';

import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        const username = formData.get('username') as string;
        const password = formData.get('password') as string;

        // Validate inputs
        if (!username || !password) {
            return 'Please enter both username and password';
        }

        if (username.trim().length < 3) {
            return 'Username must be at least 3 characters';
        }

        if (password.length < 4) {
            return 'Password must be at least 4 characters';
        }

        await signIn('credentials', {
            username: username.trim(),
            password: password,
            redirect: false,
        });

        return 'success';
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid username or password';
                case 'CallbackRouteError':
                    return 'Invalid username or password';
                default:
                    console.error('Auth error:', error);
                    return 'Authentication failed. Please try again';
            }
        }
        console.error('Unexpected error:', error);
        return 'An unexpected error occurred';
    }
}

export async function logout() {
    try {
        await signOut({ redirectTo: '/' });
    } catch (error) {
        console.error('Logout error:', error);
        throw error;
    }
}
