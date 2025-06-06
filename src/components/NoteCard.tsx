'use client';

import { Note } from '@/types';
import { motion } from 'framer-motion';

interface NoteCardProps {
    note: Note;
    onClick: () => void;
}

export default function NoteCard({ note, onClick }: NoteCardProps) {
    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString('en-US', {
            weekday: 'short',
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };


    const isEmpty = (html: string) => {
        const textOnly = html.replace(/<[^>]*>/g, '').trim();
        return textOnly === '';
    };

    return (
        <motion.div
            className="note-card"
            onClick={onClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
        >
            <div className="note-header">
                <h3 className="note-title">{note.title}</h3>
                <button className="edit-btn">✎</button>
            </div>

            <div
                className="note-content rich-text-preview"
                dangerouslySetInnerHTML={{
                    __html: isEmpty(note.content)
                        ? '<p class="empty-note">No content</p>'
                        : note.content
                }}
            />



            <div className="note-footer">
                <span className="note-date">
                    Last Modified: {formatDate(note.updatedAt)}
                </span>
            </div>
        </motion.div>
    );
}