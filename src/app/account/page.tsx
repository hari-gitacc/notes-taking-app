'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import { motion } from 'framer-motion';
import { useNoteStore } from '@/store/noteStore';
import { User, Mail, Calendar, FileText, Edit3 } from 'lucide-react';

export default function AccountPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { notes } = useNoteStore();
  const [userStats, setUserStats] = useState({
    totalNotes: 0,
    totalWords: 0,
    joinDate: '',
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (notes.length > 0) {
      const totalWords = notes.reduce((acc, note) => {
        // Strip HTML and count words
        const textContent = note.content.replace(/<[^>]*>/g, '');
        const wordCount = textContent.trim().split(/\s+/).length;
        return acc + wordCount;
      }, 0);

      setUserStats({
        totalNotes: notes.length,
        totalWords,
        joinDate: session?.user?.email ? 'January 2025' : '', // You can get this from user creation date
      });
    }
  }, [notes, session]);

  if (status === 'loading') {
    return <div className="loading">Loading...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <div className="app">
      <Header />
      
      <main className="main-content">
        <div className="breadcrumb">
          <span>Homepage</span> / <span>Account</span>
        </div>
        
        <motion.div
          className="account-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="page-title">My Account</h1>
          
          <div className="account-content">
            <div className="profile-section">
              <motion.div
                className="profile-card"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="profile-header">
                  <div className="avatar">
                    <User size={48} />
                  </div>
                  <div className="profile-info">
                    <h2>{session.user?.name || 'User'}</h2>
                    <p className="user-email">
                      <Mail size={16} />
                      {session.user?.email}
                    </p>
                  </div>
                  <button className="edit-profile-btn">
                    <Edit3 size={16} />
                    Edit Profile
                  </button>
                </div>
              </motion.div>

              <motion.div
                className="stats-grid"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="stat-card">
                  <div className="stat-icon">
                    <FileText size={24} />
                  </div>
                  <div className="stat-info">
                    <h3>{userStats.totalNotes}</h3>
                    <p>Total Notes</p>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon">
                    <Edit3 size={24} />
                  </div>
                  <div className="stat-info">
                    <h3>{userStats.totalWords}</h3>
                    <p>Words Written</p>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon">
                    <Calendar size={24} />
                  </div>
                  <div className="stat-info">
                    <h3>{userStats.joinDate}</h3>
                    <p>Member Since</p>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="account-sections">
              <motion.div
                className="account-section"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <h3>Account Settings</h3>
                <div className="settings-list">
                  <div className="setting-item">
                    <div className="setting-info">
                      <h4>Email Notifications</h4>
                      <p>Receive email updates about your notes</p>
                    </div>
                    <label className="toggle">
                      <input type="checkbox" defaultChecked />
                      <span className="slider"></span>
                    </label>
                  </div>

                  <div className="setting-item">
                    <div className="setting-info">
                      <h4>Auto-save</h4>
                      <p>Automatically save notes while typing</p>
                    </div>
                    <label className="toggle">
                      <input type="checkbox" defaultChecked />
                      <span className="slider"></span>
                    </label>
                  </div>

                  <div className="setting-item">
                    <div className="setting-info">
                      <h4>Dark Mode</h4>
                      <p>Use dark theme for better night reading</p>
                    </div>
                    <label className="toggle">
                      <input type="checkbox" />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="account-section"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h3>Privacy & Security</h3>
                <div className="security-actions">
                  <button className="action-btn">
                    <span>Change Password</span>
                    <span className="arrow">→</span>
                  </button>
                  <button className="action-btn">
                    <span>Export Data</span>
                    <span className="arrow">→</span>
                  </button>
                  <button className="action-btn danger">
                    <span>Delete Account</span>
                    <span className="arrow">→</span>
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}