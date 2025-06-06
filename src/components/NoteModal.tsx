'use client';

import { useState, useEffect } from 'react';
import { Note, NoteInput } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';
import RichTextEditor from './RichTextEditor';
import { X } from 'lucide-react';

interface NoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (note: NoteInput) => void;
  onDelete?: () => void;
  note?: Note | null;
  mode: 'create' | 'edit';
}

export default function NoteModal({ 
  isOpen, 
  onClose, 
  onSave, 
  onDelete, 
  note, 
  mode 
}: NoteModalProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    } else {
      setTitle('');
      setContent('');
    }
  }, [note, isOpen]);

  const handleSave = () => {
    if (title.trim() && content.trim()) {
      onSave({ title: title.trim(), content: content.trim() });
      onClose();
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete();
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="modal-content"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2 className="modal-title">
                {mode === 'create' ? 'Add Notes' : note?.title}
              </h2>
              <button className="close-btn" onClick={onClose}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              {mode === 'create' && (
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Title"
                  className="title-input"
                />
              )}
              
              <div className="content-editor">
                <RichTextEditor
                  value={content}
                  onChange={setContent}
                  placeholder={mode === 'create' ? 'Hello World' : ''}
                />
              </div>
            </div>

            <div className="modal-footer">
              {mode === 'create' ? (
                <>
                  <button className="btn btn-primary" onClick={handleSave}>
                    Add
                  </button>
                  <button className="btn btn-secondary" onClick={onClose}>
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button className="btn btn-primary" onClick={handleSave}>
                    Save
                  </button>
                  <button className="btn btn-danger" onClick={handleDelete}>
                    Delete
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}