import { create } from 'zustand';
import { Note, NoteInput } from '@/types';
import axios from 'axios';

interface NoteStore {
  notes: Note[];
  loading: boolean;
  error: string | null;
  fetchNotes: () => Promise<void>;
  createNote: (note: NoteInput) => Promise<void>;
  updateNote: (id: string, note: NoteInput) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
  clearError: () => void;
}

export const useNoteStore = create<NoteStore>((set, get) => ({
  notes: [],
  loading: false,
  error: null,

  fetchNotes: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get('/api/notes');
      set({ notes: response.data, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch notes', loading: false });
    }
  },

  createNote: async (note: NoteInput) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post('/api/notes', note);
      set({ 
        notes: [...get().notes, response.data], 
        loading: false 
      });
    } catch (error) {
      set({ error: 'Failed to create note', loading: false });
    }
  },

  updateNote: async (id: string, note: NoteInput) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.put(`/api/notes/${id}`, note);
      set({ 
        notes: get().notes.map(n => n._id === id ? response.data : n), 
        loading: false 
      });
    } catch (error) {
      set({ error: 'Failed to update note', loading: false });
    }
  },

  deleteNote: async (id: string) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`/api/notes/${id}`);
      set({ 
        notes: get().notes.filter(n => n._id !== id), 
        loading: false 
      });
    } catch (error) {
      set({ error: 'Failed to delete note', loading: false });
    }
  },

  clearError: () => set({ error: null }),
}));