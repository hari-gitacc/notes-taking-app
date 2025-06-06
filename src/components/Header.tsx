'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const { data: session } = useSession();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="header">
      <div className="header-content">
        <Link href="/" className="logo">
          Keep Notes
        </Link>
        <nav className="nav">
          <Link 
            href="/about" 
            className={`nav-link ${isActive('/about') ? 'active' : ''}`}
          >
            About
          </Link>
          <Link 
            href="/" 
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
          >
            Notes
          </Link>
          {session && (
            <Link 
              href="/account" 
              className={`nav-link ${isActive('/account') ? 'active' : ''}`}
            >
              Account
            </Link>
          )}
          {session ? (
            <button onClick={() => signOut()} className="nav-link logout-btn">
              Logout
            </button>
          ) : (
            <Link href="/login" className="nav-link">Login</Link>
          )}
        </nav>
      </div>
    </header>
  );
}