import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
            const isOnLogin = nextUrl.pathname === '/';

            // Protect dashboard routes
            if (isOnDashboard) {
                if (!isLoggedIn) {
                    return false; // Redirect to login
                }
                return true;
            }

            // Redirect logged-in users away from login page (root)
            if (isOnLogin && isLoggedIn) {
                return Response.redirect(new URL('/dashboard', nextUrl));
            }

            return true;
        },
    },
    providers: [],
} satisfies NextAuthConfig;
