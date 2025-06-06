import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AppProviders } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Keep Notes - Your Personal Note Taking App',
  description: 'A simple and elegant note-taking application built with Next.js',
  keywords: 'notes, note-taking, productivity, Next.js',
  openGraph: {
    title: 'Keep Notes',
    description: 'Your Personal Note Taking App',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}