'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();



  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated') {
      // fetch
    }
  }, [status, router,]);


  const getUserName = () => {
    if (session?.user?.name) {
      return session.user.name;
    }
    return 'User';
  };

  if (status === 'loading') {
    return <div className="loading">Loading...</div>;
  }

  if (!session) {
    return null;
  }


  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="app">
      <Header />

      <main className="main-content">
        <div className="breadcrumb">
          <span>Homepage</span> / <span>Your Notes</span>
        </div>

        <h1 className="page-title">
          {getGreeting()} {getUserName()}!
        </h1>


      </main>

    </div>
  );
}