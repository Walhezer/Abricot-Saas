'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createTask } from '@/app/actions/tasks';
import styles from './FormModal.module.css';
import CalendarIcon from '@/components/ui/CalendarIcon';
import ChevronIcon from '@/components/ui/ChevronIcon';

interface CreateTaskFormProps {
    projectId: string;
    onClose: () => void;
}

export default function CreateTaskForm({ projectId, onClose }: CreateTaskFormProps) {
    const router = useRouter();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [assignedTo, setAssignedTo] = useState('');
    const [status, setStatus] = useState<'todo' | 'in_progress' | 'done'>('todo');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const assigneeIdsArray = assignedTo ? [assignedTo] : [];

            await createTask({
                title,
                description,
                dueDate,
                projectId,
                assigneeIds: assigneeIdsArray
            });
            router.refresh();
            onClose();
        } catch (err) {
            console.error("Erreur lors de la création de la tâche :", err);
            setError("Impossible de créer la tâche. Veuillez réessayer.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const isFormValid = title.trim() !== '' && description.trim() !== '' && dueDate !== '';

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            {error && (
                <div style={{ color: '#DC2626', marginBottom: '16px', fontSize: '14px', textAlign: 'center', backgroundColor: '#FEE2E2', padding: '10px', borderRadius: '6px' }}>
                    {error}
                </div>
            )}

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
                        {/* Assure-toi que ces "value" correspondent bien aux vrais IDs de tes utilisateurs en BDD */}
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
                    disabled={!isFormValid || isSubmitting}
                >
                    {isSubmitting ? 'Création en cours...' : '+ Ajouter une tâche'}
                </button>
            </div>
        </form>
    );
}