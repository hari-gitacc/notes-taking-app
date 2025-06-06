'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import axios from 'axios';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      await axios.post('/api/register', {
        username,
        email,
        password,
      });

      router.push('/login?message=Registration successful');
    } catch (error: any) {
      setError(error.response?.data?.error || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <Header />
      
      <main className="auth-main">
        <div className="breadcrumb">
          <span>Homepage</span> / <span>Signup Page</span>
        </div>

        <div
          className="auth-card"
        >
          <div className="auth-header">
            <div className="window-controls">
              <span className="control red"></span>
              <span className="control yellow"></span>
              <span className="control green"></span>
            </div>
            <h2 className="auth-title">Sign up</h2>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="form-input"
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="form-actions">
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary register-btn"
              >
                {loading ? 'Creating account...' : 'Register'}
              </button>
              <Link href="/login" className="btn btn-secondary">
                Login
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}