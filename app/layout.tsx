import type { Metadata } from 'next';
import { Anton, Poppins, Alexandria } from 'next/font/google';
import 'flag-icons/css/flag-icons.min.css';
import './globals.css';

const anton = Anton({
    weight: '400',
    subsets: ['latin'],
    variable: '--font-anton',
    display: 'swap',
    preload: true,
});

const poppins = Poppins({
    subsets: ['latin'],
    variable: '--font-poppins',
    weight: ['400', '500', '600', '700'],
});

const alexandria = Alexandria({
    subsets: ['latin', 'arabic'],
    variable: '--font-alexandria',
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
    title: {
        default: 'Darrajati Management System',
        template: '%s | Darrajati Management'
    },
    description: 'Management system for Darrajati scooter rental business.',
    robots: {
        index: false,
        follow: false,
    },
    icons: {
        icon: '/favicon.svg',
        shortcut: '/favicon.svg',
        apple: '/favicon.svg',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" dir="ltr">
            <body suppressHydrationWarning className={`${poppins.variable} ${anton.variable} ${alexandria.variable} font-poppins bg-black text-white min-h-screen overflow-x-hidden`}>
                {children}
            </body>
        </html>
    );
}
