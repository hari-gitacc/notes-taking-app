'use client';

import { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import { motion } from 'framer-motion';
import { useNotes,  } from '@/store/noteStore';
import { User, Mail, FileText, LogOut } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';

interface UserStats {
    totalNotes: number;
    joinDate: string;
}

export default function AccountPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const { notes } = useNotes();
    const [userStats, setUserStats] = useState<UserStats>({
        totalNotes: 0,
        joinDate: '',
    });

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login');
        }
    }, [status, router]);

    useEffect(() => {
        if (notes.length > 0) {
            setUserStats({
                totalNotes: notes.length,
                joinDate: 'January 2025', // Default join date since createdAt is not available
            });
        } else {
            setUserStats(prev => ({
                ...prev,
                totalNotes: 0,
                joinDate: 'January 2025',
            }));
        }
    }, [notes]);

    const handleSignOut = () => {
        signOut({ callbackUrl: '/login' });
    };

    if (status === 'loading') {
        return (
            <div className="app">
                <Header />
                <div className="loading">Loading...</div>
            </div>
        );
    }

    if (!session?.user) {
        return null;
    }

    const minimalMotion = {
        initial: { opacity: 0, y: 5 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.3 },
    };

    const breadcrumbItems = [
        { label: 'Homepage', href: '/' },
        { label: 'Account', active: true }
    ];

    return (
        <div className="app">
            <Header />

            <main className="main-content">
                <Breadcrumb items={breadcrumbItems} />

                <motion.div className="account-container" {...minimalMotion}>
                    <h1 className="page-title">My Account</h1>

                    <div className="account-content">
                        {/* Profile */}
                        <motion.div className="profile-card" {...minimalMotion}>
                            <div className="profile-header">
                                <div className="avatar">
                                    <User size={48} />
                                </div>
                                <div className="profile-info">
                                    <h2>{session.user.name || 'User'}</h2>
                                    <p className="user-email">
                                        <Mail size={16} />
                                        {session.user.email}
                                    </p>
                                    <p className="join-date">
                                        Member since {userStats.joinDate || 'Recently'}
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Stats */}
                        <motion.div className="stats-card" {...minimalMotion}>
                            <h3>Your Activity</h3>
                            <div className="stat-item">
                                <div className="stat-icon">
                                    <FileText size={24} />
                                </div>
                                <div className="stat-info">
                                    <span className="stat-number">{userStats.totalNotes}</span>
                                    <span className="stat-label">Total Notes</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Actions */}
                        <motion.div className="actions-card" {...minimalMotion}>
                            <button className="action-btn sign-out" onClick={handleSignOut}>
                                <LogOut size={20} />
                                Sign Out
                            </button>
                        </motion.div>
                    </div>
                </motion.div>
            </main>
        </div>
    );
}