'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Lock, User, ShieldCheck, Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import { authenticate } from '@/app/actions';

function LoginButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="w-full bg-orange text-white font-bold py-3 sm:py-4 rounded-2xl hover:bg-orange/90 transition-all duration-300 orange-glow active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 text-base sm:text-lg tracking-tight"
        >
            {pending ? (
                <>
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Authenticating...
                </>
            ) : 'Access Control'}
        </button>
    );
}

function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [formState, dispatch] = useFormState(authenticate, undefined);
    const [showPassword, setShowPassword] = useState(false);
    const [uiError, setUiError] = useState<string | null>(null);

    // Initial check for query params
    useEffect(() => {
        const errorParam = searchParams.get('error');
        if (errorParam === 'SessionExpired') {
            setUiError('Session expired due to inactivity. Please log in again.');
        }
    }, [searchParams]);

    // Sync form state errors
    useEffect(() => {
        if (formState === 'success') {
            router.push('/dashboard');
            router.refresh();
        } else if (formState) {
            setUiError(formState);
        }
    }, [formState, router]);

    return (
        <div className="w-full max-w-md relative z-10 px-4 sm:px-6 md:px-0">
            <div className="glass-panel-dark rounded-3xl p-6 sm:p-8 md:p-10 orange-glow-border">
                <div className="flex justify-center mb-8 sm:mb-10">
                    <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 transition-all duration-300 hover:scale-105">
                        <div className="absolute inset-0 bg-orange/20 blur-3xl rounded-full" />
                        <Image
                            src="/logo.webp"
                            alt="Darrajati Logo"
                            fill
                            className="object-contain drop-shadow-2xl relative z-10"
                            priority
                            sizes="(max-width: 640px) 192px, (max-width: 768px) 224px, 256px"
                            quality={90}
                        />
                    </div>
                </div>



                <form action={dispatch} className="space-y-5 sm:space-y-6">
                    {uiError && (
                        <div className="bg-red-500/10 border border-red-500/30 text-red-500 px-4 py-3 rounded-xl text-sm text-center animate-pulse">
                            {uiError}
                        </div>
                    )}

                    <div className="space-y-2">
                        <label htmlFor="username" className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground ml-1">
                            Username
                        </label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <User className="w-5 h-5 text-muted-foreground group-focus-within:text-orange transition-colors" />
                            </div>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                required
                                className="w-full pl-12 pr-4 py-3 sm:py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/20 focus:ring-2 focus:ring-orange/50 focus:border-orange/50 outline-none transition-all duration-300"
                                placeholder="Enter username"
                                onChange={() => setUiError(null)}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground ml-1">
                            Password
                        </label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Lock className="w-5 h-5 text-muted-foreground group-focus-within:text-orange transition-colors" />
                            </div>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                name="password"
                                required
                                className="w-full pl-12 pr-12 py-3 sm:py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/20 focus:ring-2 focus:ring-orange/50 focus:border-orange/50 outline-none transition-all duration-300"
                                placeholder="••••••••"
                                onChange={() => setUiError(null)}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-muted-foreground hover:text-white transition-colors"
                            >
                                {showPassword ? (
                                    <EyeOff className="w-5 h-5" />
                                ) : (
                                    <Eye className="w-5 h-5" />
                                )}
                            </button>
                        </div>
                    </div>

                    <LoginButton />
                </form>

                <p className="text-center text-xs text-white/30 mt-6 sm:mt-8 tracking-tighter uppercase font-medium">
                    System encrypted & secured
                </p>
            </div>
        </div>
    );
}

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center relative bg-black overflow-hidden font-inter p-4 sm:p-0">
            {/* Background elements */}
            <div className="absolute inset-x-0 top-0 h-64 sm:h-96 bg-gradient-to-b from-orange/20 to-transparent pointer-events-none" />
            <div className="absolute top-[-10%] left-[-10%] w-[50%] sm:w-[40%] h-[50%] sm:h-[40%] bg-orange/10 blur-[80px] sm:blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] sm:w-[40%] h-[50%] sm:h-[40%] bg-orange/5 blur-[80px] sm:blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute inset-0 bg-cyber-grid opacity-30 pointer-events-none" />

            <Suspense fallback={<div className="text-white">Loading security gateway...</div>}>
                <LoginForm />
            </Suspense>
        </div>
    );
}
