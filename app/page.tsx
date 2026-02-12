'use client';

import { useFormStatus } from 'react-dom';
import { useState, useEffect, Suspense, useActionState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Lock, User, Eye, EyeOff, ShieldCheck, Zap } from 'lucide-react';
import { authenticate } from '@/app/actions';

function LoginButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="w-full bg-gradient-to-r from-[#ea6819] to-[#d4560e] text-white font-anton uppercase tracking-wider py-4 rounded-2xl hover:shadow-[0_0_30px_-5px_rgba(234,104,25,0.4)] transition-all duration-300 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3 text-lg relative overflow-hidden group"
        >
            {pending ? (
                <>
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Authenticating...</span>
                </>
            ) : (
                <>
                    <span>Access Dashboard</span>
                    <Zap className="w-5 h-5 fill-white group-hover:scale-110 transition-transform" />
                </>
            )}
        </button>
    );
}

function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [formState, dispatch, isPending] = useActionState(authenticate, undefined);
    const [showPassword, setShowPassword] = useState(false);
    const [uiError, setUiError] = useState<string | null>(null);

    // Initial check for query params
    useEffect(() => {
        const errorParam = searchParams.get('error');
        if (errorParam === 'SessionExpired') {
            setUiError('Session expired. Please log in again.');
        }
    }, [searchParams]);

    // Sync form state errors
    useEffect(() => {
        if (formState === 'success') {
            router.push('/dashboard');
        } else if (formState) {
            setUiError(formState);
        }
    }, [formState, router]);

    return (
        <div className="w-full max-w-md relative z-10 px-6">
            <div className="relative bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 sm:p-10 shadow-2xl shadow-black/50 overflow-hidden group">
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50" />
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 blur-[80px] rounded-full pointer-events-none" />
                <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-primary/10 blur-[80px] rounded-full pointer-events-none" />

                {/* Header / Logo */}
                <div className="flex flex-col items-center justify-center mb-10 text-center space-y-4">
                    <div className="relative w-24 h-24 mb-2 group-hover:scale-105 transition-transform duration-500">
                        <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full animate-pulse-slow" />
                        <img
                            src="/logo.webp"
                            alt="Darrajati"
                            className="relative w-full h-full object-contain drop-shadow-[0_0_15px_rgba(234,104,25,0.3)]"
                        />
                    </div>
                    <div>
                        <h1 className="text-3xl font-anton text-white uppercase tracking-wide">
                            Admin <span className="text-primary">Portal</span>
                        </h1>
                        <p className="text-white/40 text-xs font-outfit uppercase tracking-[0.2em] mt-1">
                            Darrajati Management System
                        </p>
                    </div>
                </div>

                <form action={dispatch} className="space-y-6">
                    {uiError && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                            <ShieldCheck className="w-5 h-5 shrink-0" />
                            {uiError}
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-white/50 uppercase tracking-widest ml-1">
                            Username
                        </label>
                        <div className="relative group/input">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <User className="w-5 h-5 text-white/30 group-focus-within/input:text-primary transition-colors" />
                            </div>
                            <input
                                type="text"
                                name="username"
                                required
                                className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/20 focus:bg-white/[0.07] focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all duration-300 font-outfit"
                                placeholder="Enter your username"
                                onChange={() => setUiError(null)}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-white/50 uppercase tracking-widest ml-1">
                            Password
                        </label>
                        <div className="relative group/input">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Lock className="w-5 h-5 text-white/30 group-focus-within/input:text-primary transition-colors" />
                            </div>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                required
                                className="w-full pl-12 pr-12 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/20 focus:bg-white/[0.07] focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all duration-300 font-outfit"
                                placeholder="••••••••"
                                onChange={() => setUiError(null)}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/30 hover:text-white transition-colors"
                            >
                                {showPassword ? (
                                    <EyeOff className="w-5 h-5" />
                                ) : (
                                    <Eye className="w-5 h-5" />
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="pt-2">
                        <LoginButton />
                    </div>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-[10px] text-white/20 uppercase tracking-widest hover:text-white/40 transition-colors cursor-default">
                        Secured by Darrajati Systems
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function LoginPage() {
    return (
        <div className="min-h-screen w-full flex items-center justify-center relative bg-[#050505] overflow-hidden font-outfit">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-cyber-grid opacity-10" />

            {/* Ambient Lighting */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none opacity-60" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

            <Suspense fallback={
                <div className="flex flex-col items-center gap-4">
                    <span className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                    <span className="text-white/50 text-sm font-anton uppercase tracking-widest">Loading...</span>
                </div>
            }>
                <LoginForm />
            </Suspense>
        </div>
    );
}
