'use client';

import React, { useEffect, useState, Suspense, lazy, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useNoteStore } from '@/store/noteStore';
import { Note } from '@/types';
import { Plus } from 'lucide-react';

const Header = lazy(() => import('@/components/Header'));
const NoteCard = lazy(() => import('@/components/NoteCard'));
const NoteModal = lazy(() => import('@/components/NoteModal'));
const Breadcrumb = lazy(() => import('@/components/Breadcrumb'));

const MemoizedNoteCard = React.memo(NoteCard);

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { notes, loading, fetchNotes, createNote, updateNote, deleteNote } = useNoteStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated') {
      fetchNotes();
    }
  }, [status, router, fetchNotes]);

  const handleCreateNote = () => {
    setModalMode('create');
    setSelectedNote(null);
    setIsModalOpen(true);
  };

  const handleEditNote = (note: Note) => {
    setModalMode('edit');
    setSelectedNote(note);
    setIsModalOpen(true);
  };

  const handleSaveNote = async (noteData: { title: string; content: string }) => {
    if (modalMode === 'create') {
      await createNote(noteData);
    } else if (selectedNote) {
      await updateNote(selectedNote._id, noteData);
    }
  };

  const handleDeleteNote = async () => {
    if (selectedNote) {
      await deleteNote(selectedNote._id);
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getUserName = () => {
    if (session?.user?.name) {
      return session.user.name;
    }
    return 'User';
  };

  const breadcrumbItems = useMemo(() => [
    { label: 'Homepage', href: '/' },
    { label: 'Your Notes', active: true }
  ], []);

  if (status === 'loading') {
    return <div className="loading">Loading...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <div className="app">
      <Suspense fallback={<div>Loading Header...</div>}>
        <Header />
      </Suspense>

      <main className="main-content">
        <Suspense fallback={<div>Loading Breadcrumb...</div>}>
          <Breadcrumb items={breadcrumbItems} />
        </Suspense>

        <h1 className="page-title">
          {getGreeting()} {getUserName()}!
        </h1>

        {loading ? (
          <div className="loading">Loading notes...</div>
        ) : (
          <div className="notes-grid">
            {notes.map((note) => (
              <Suspense key={note._id} fallback={<div>Loading Note...</div>}>
                <MemoizedNoteCard
                  note={note}
                  onClick={() => handleEditNote(note)}
                />
              </Suspense>
            ))}
            {notes.length === 0 && (
              <motion.div
                className="empty-state"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="empty-icon">📝</div>
                <h3>No notes yet</h3>
                <p>Start creating your first note by clicking the + button</p>
              </motion.div>
            )}
          </div>
        )}

        <motion.button
          className="fab"
          onClick={handleCreateNote}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Plus size={24} />
        </motion.button>
      </main>

      <Suspense fallback={<div>Loading Note Modal...</div>}>
        <NoteModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveNote}
          onDelete={modalMode === 'edit' ? handleDeleteNote : undefined}
          note={selectedNote}
          mode={modalMode}
        />
      </Suspense>
    </div>
  );
}
