'use client';

import { useState } from 'react';
import styles from './CreateTaskForm.module.css';
import CalendarIcon from '@/components/ui/CalendarIcon';
import ChevronIcon from '@/components/ui/ChevronIcon';

interface CreateTaskFormProps {
    projectId: string;
    onClose: () => void;
}

export default function CreateTaskForm({ projectId, onClose }: CreateTaskFormProps) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [assignedTo, setAssignedTo] = useState('');
    const [status, setStatus] = useState<'todo' | 'in_progress' | 'done'>('todo');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Nouvelle tâche à créer :", { title, description, dueDate, assignedTo, status, projectId });
        onClose();
    };

    const isFormValid = title.trim() !== '' && description.trim() !== '' && dueDate !== '';

    return (
        <form className={styles.form} onSubmit={handleSubmit}>

            <div className={styles.formGroup}>
                <label htmlFor="title">Titre*</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="description">Description*</label>
                <input
                    type="text"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="dueDate">Échéance*</label>
                <div className={styles.dateInputWrapper}>
                    <input
                        type="date"
                        id="dueDate"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        required
                        className={`${styles.customDateInput} ${dueDate === '' ? styles.emptyDateInput : ''}`}
                    />
                    <span className={styles.customIcon}>
                        <CalendarIcon />
                    </span>
                </div>
            </div>


            <div className={styles.formGroup}>
                <label htmlFor="assignedTo">Assigné à :</label>
                <div className={styles.selectWrapper}>
                    <select
                        id="assignedTo"
                        value={assignedTo}
                        onChange={(e) => setAssignedTo(e.target.value)}
                        className={`${assignedTo === "" ? styles.placeholderSelect : ""} ${styles.customSelect}`}
                    >
                        <option value="" disabled>Choisir un ou plusieurs collaborateurs</option>
                        <option value="user1">Caroline Leroy</option>
                        <option value="user2">David Moreau</option>
                    </select>

                    <span className={styles.customChevron}>
                        <ChevronIcon />
                    </span>
                </div>
            </div>

            <div className={styles.formGroup}>
                <label>Statut :</label>
                <div className={styles.statusContainer}>
                    <button
                        type="button"
                        className={`${styles.statusPill} ${styles.todoColor} ${status === 'todo' ? styles.activePill : styles.inactivePill}`}
                        onClick={() => setStatus('todo')}
                    >
                        À faire
                    </button>
                    <button
                        type="button"
                        className={`${styles.statusPill} ${styles.inProgressColor} ${status === 'in_progress' ? styles.activePill : styles.inactivePill}`}
                        onClick={() => setStatus('in_progress')}
                    >
                        En cours
                    </button>
                    <button
                        type="button"
                        className={`${styles.statusPill} ${styles.doneColor} ${status === 'done' ? styles.activePill : styles.inactivePill}`}
                        onClick={() => setStatus('done')}
                    >
                        Terminée
                    </button>
                </div>
            </div>

            <div className={styles.actions}>
                <button
                    type="submit"
                    className={styles.submitBtn}
                    disabled={!isFormValid}
                >
                    + Ajouter une tâche
                </button>
            </div>
        </form>
    );
}