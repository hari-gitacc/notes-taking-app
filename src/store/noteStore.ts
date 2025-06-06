import { create } from 'zustand';
import { Note, NoteInput } from '@/types';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

interface NoteState {
  notes: Note[];
  loading: boolean;
  error: string | null;
  setNotes: (notes: Note[]) => void;
  addNote: (note: Note) => void;
  updateNoteInState: (id: string, note: Note) => void;
  removeNote: (id: string) => void;
  clearError: () => void;
}

const useNoteStore = create<NoteState>((set, get) => ({
  notes: [],
  loading: false,
  error: null,
  
  setNotes: (notes: Note[]) => set({ notes }),
  addNote: (note: Note) => set((state) => ({ notes: [...state.notes, note] })),
  updateNoteInState: (id: string, note: Note) =>
    set((state) => ({
      notes: state.notes.map((n) => (n._id === id ? note : n)),
    })),
  removeNote: (id: string) =>
    set((state) => ({
      notes: state.notes.filter((note) => note._id !== id),
    })),
  clearError: () => set({ error: null }),
}));

export const useNotes = () => {
  const store = useNoteStore();
  const queryClient = useQueryClient();

  const { data } = useQuery('notes', async () => {
    const response = await axios.get('/api/notes');
    store.setNotes(response.data);
    return response.data;
  });

  const createMutation = useMutation(
    async (note: NoteInput) => {
      const response = await axios.post('/api/notes', note);
      return response.data;
    },
    {
      onSuccess: (newNote) => {
        queryClient.invalidateQueries('notes');
        store.addNote(newNote);
      },
      onError: () => store.clearError(),
    }
  );

  const updateMutation = useMutation(
    async ({ id, note }: { id: string; note: NoteInput }) => {
      const response = await axios.put(`/api/notes/${id}`, note);
      return response.data;
    },
    {
      onSuccess: (updatedNote) => {
        queryClient.invalidateQueries('notes');
        store.updateNoteInState(updatedNote._id, updatedNote);
      },
      onError: () => store.clearError(),
    }
  );

  const deleteMutation = useMutation(
    async (id: string) => {
      await axios.delete(`/api/notes/${id}`);
      return id;
    },
    {
      onSuccess: (id) => {
        queryClient.invalidateQueries('notes');
        store.removeNote(id);
      },
      onError: () => store.clearError(),
    }
  );

  return {
    notes: store.notes,
    loading: store.loading,
    error: store.error,
    createNote: createMutation.mutate,
    updateNote: updateMutation.mutate,
    deleteNote: deleteMutation.mutate,
    clearError: store.clearError,
  };
};
