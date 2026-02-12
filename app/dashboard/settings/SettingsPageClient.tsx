'use client';

import { useState } from 'react';
import { Settings, User, Lock, Check, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { updateUsername, updatePassword, logout } from '@/app/actions';

interface SettingsPageClientProps {
    currentUser: { id: string; username: string } | null;
}

export default function SettingsPageClient({ currentUser }: SettingsPageClientProps) {
    // Username form state
    const [newUsername, setNewUsername] = useState(currentUser?.username || '');
    const [usernameLoading, setUsernameLoading] = useState(false);
    const [usernameMessage, setUsernameMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    // Password form state
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordLoading, setPasswordLoading] = useState(false);
    const [passwordMessage, setPasswordMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    const handleUsernameSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setUsernameLoading(true);
        setUsernameMessage(null);

        try {
            const result = await updateUsername(newUsername);
            if (result.success) {
                setUsernameMessage({ type: 'success', text: 'Username updated! Logging out...' });
                // Auto logout after 1.5 seconds
                setTimeout(async () => {
                    await logout();
                }, 1500);
            } else {
                setUsernameMessage({ type: 'error', text: result.message || 'Failed to update username' });
            }
        } catch (error) {
            setUsernameMessage({ type: 'error', text: 'An error occurred' });
        } finally {
            setUsernameLoading(false);
        }
    };

    const handlePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setPasswordLoading(true);
        setPasswordMessage(null);

        if (newPassword !== confirmPassword) {
            setPasswordMessage({ type: 'error', text: 'New passwords do not match' });
            setPasswordLoading(false);
            return;
        }

        try {
            const result = await updatePassword(currentPassword, newPassword);
            if (result.success) {
                setPasswordMessage({ type: 'success', text: 'Password updated! Logging out...' });
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
                // Auto logout after 1.5 seconds
                setTimeout(async () => {
                    await logout();
                }, 1500);
            } else {
                setPasswordMessage({ type: 'error', text: result.message || 'Failed to update password' });
            }
        } catch (error) {
            setPasswordMessage({ type: 'error', text: 'An error occurred' });
        } finally {
            setPasswordLoading(false);
        }
    };

    if (!currentUser) {
        return (
            <div className="glass-panel p-16 rounded-3xl text-center">
                <Settings className="w-16 h-16 text-white/10 mx-auto mb-6" />
                <h3 className="text-2xl text-white uppercase mb-2">Not Authenticated</h3>
                <p className="text-white/40 text-sm">Please log in to access settings</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-20 font-outfit">
            {/* Header */}
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#ea6819]/10 border border-[#ea6819]/20 flex items-center justify-center">
                    <Settings className="w-6 h-6 text-[#ea6819]" />
                </div>
                <div>
                    <h1 className="text-2xl md:text-3xl text-white uppercase font-bold">Settings</h1>
                    <p className="text-xs text-white/40 uppercase tracking-widest mt-1">Manage your account</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Change Username */}
                <div className="glass-panel rounded-3xl p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <User className="w-5 h-5 text-primary" />
                        <h2 className="text-lg text-white uppercase font-bold">Change Username</h2>
                    </div>

                    <form onSubmit={handleUsernameSubmit} className="space-y-4">
                        <div>
                            <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold block mb-2">
                                New Username
                            </label>
                            <input
                                type="text"
                                value={newUsername}
                                onChange={(e) => setNewUsername(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:border-primary/50 focus:outline-none transition-colors"
                                placeholder="Enter new username"
                                minLength={3}
                                maxLength={50}
                                required
                            />
                            <p className="text-[9px] text-white/30 mt-1">Letters, numbers, and underscores only</p>
                        </div>

                        {usernameMessage && (
                            <div className={`flex items-center gap-2 p-3 rounded-xl ${usernameMessage.type === 'success' ? 'bg-green-500/10 border border-green-500/20' : 'bg-red-500/10 border border-red-500/20'}`}>
                                {usernameMessage.type === 'success' ? (
                                    <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                                ) : (
                                    <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                                )}
                                <p className={`text-xs ${usernameMessage.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                                    {usernameMessage.text}
                                </p>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={usernameLoading || newUsername === currentUser.username}
                            className="w-full bg-[#ea6819] text-white py-3 rounded-xl font-bold uppercase tracking-tight hover:bg-[#ea6819]/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {usernameLoading ? 'Updating...' : 'Update Username'}
                        </button>
                    </form>
                </div>

                {/* Change Password */}
                <div className="glass-panel rounded-3xl p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <Lock className="w-5 h-5 text-primary" />
                        <h2 className="text-lg text-white uppercase font-bold">Change Password</h2>
                    </div>

                    <form onSubmit={handlePasswordSubmit} className="space-y-4">
                        <div>
                            <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold block mb-2">
                                Current Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showCurrentPassword ? "text" : "password"}
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:border-primary/50 focus:outline-none transition-colors"
                                    placeholder="Enter current password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors"
                                >
                                    {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold block mb-2">
                                New Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showNewPassword ? "text" : "password"}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:border-primary/50 focus:outline-none transition-colors"
                                    placeholder="Enter new password"
                                    minLength={4}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors"
                                >
                                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold block mb-2">
                                Confirm New Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:border-primary/50 focus:outline-none transition-colors"
                                    placeholder="Confirm new password"
                                    minLength={4}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors"
                                >
                                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        {passwordMessage && (
                            <div className={`flex items-center gap-2 p-3 rounded-xl ${passwordMessage.type === 'success' ? 'bg-green-500/10 border border-green-500/20' : 'bg-red-500/10 border border-red-500/20'}`}>
                                {passwordMessage.type === 'success' ? (
                                    <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                                ) : (
                                    <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                                )}
                                <p className={`text-xs ${passwordMessage.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                                    {passwordMessage.text}
                                </p>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={passwordLoading || !currentPassword || !newPassword || !confirmPassword}
                            className="w-full bg-[#ea6819] text-white py-3 rounded-xl font-bold uppercase tracking-tight hover:bg-[#ea6819]/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {passwordLoading ? 'Updating...' : 'Update Password'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
