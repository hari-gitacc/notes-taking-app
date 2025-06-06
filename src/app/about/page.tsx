'use client';

import Header from '@/components/Header'
import { motion } from 'framer-motion'

export default function AboutPage() {
  return (
    <div className="app">
      <Header />
      
      <main className="main-content">
        <div className="breadcrumb">
          <span>Homepage</span> / <span>About</span>
        </div>
        
        <motion.div
          className="about-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="page-title">About Keep Notes</h1>
          
          <div className="about-content">
            <div className="about-section">
              <h2>Welcome to Keep Notes</h2>
              <p>
                Keep Notes is a simple, elegant, and powerful note-taking application designed to help you 
                capture, organize, and manage your thoughts, ideas, and important information effortlessly.
              </p>
            </div>

            <div className="about-section">
              <h2>Features</h2>
              <div className="features-grid">
                <div className="feature-card">
                  <div className="feature-icon">📝</div>
                  <h3>Rich Text Editor</h3>
                  <p>Create beautifully formatted notes with our advanced rich text editor supporting bold, italic, lists, and more.</p>
                </div>
                
                <div className="feature-card">
                  <div className="feature-icon">🔒</div>
                  <h3>Secure & Private</h3>
                  <p>Your notes are securely stored and protected. Only you have access to your personal notes.</p>
                </div>
                
                <div className="feature-card">
                  <div className="feature-icon">📱</div>
                  <h3>Responsive Design</h3>
                  <p>Access your notes from any device - desktop, tablet, or mobile. Your notes sync seamlessly.</p>
                </div>
                
                <div className="feature-card">
                  <div className="feature-icon">⚡</div>
                  <h3>Fast & Reliable</h3>
                  <p>Built with modern technology for lightning-fast performance and reliability you can count on.</p>
                </div>
              </div>
            </div>

            <div className="about-section">
              <h2>Technology Stack</h2>
              <div className="tech-stack">
                <div className="tech-item">
                  <strong>Frontend:</strong> Next.js 14 with TypeScript
                </div>
                <div className="tech-item">
                  <strong>Authentication:</strong> NextAuth.js
                </div>
                <div className="tech-item">
                  <strong>Database:</strong> MongoDB with Mongoose
                </div>
                <div className="tech-item">
                  <strong>State Management:</strong> Zustand
                </div>
                <div className="tech-item">
                  <strong>Animations:</strong> Framer Motion
                </div>
                <div className="tech-item">
                  <strong>Rich Text:</strong> React Quill
                </div>
              </div>
            </div>

            <div className="about-section">
              <h2>Get Started</h2>
              <p>
                Ready to organize your thoughts? Create an account and start taking notes today. 
                Keep Notes makes it easy to capture ideas on the go and access them whenever you need them.
              </p>
              <div className="cta-buttons">
                <motion.a
                  href="/register"
                  className="btn btn-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started
                </motion.a>
                <motion.a
                  href="/"
                  className="btn btn-secondary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Notes
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}