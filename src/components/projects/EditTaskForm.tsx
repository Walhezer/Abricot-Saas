'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './FormModal.module.css'; 
import CalendarIcon from '../ui/CalendarIcon';
import ChevronIcon from '../ui/ChevronIcon';
import { updateTask } from '@/app/actions/tasks';

// Define the expected shape of the initial task data
export interface EditTaskData {
  title: string;
  description: string;
  dueDate: string; // Expected format: YYYY-MM-DD
  assignedTo: string;
  status: 'TODO' | 'IN_PROGRESS' | 'DONE'; 
}

interface EditTaskFormProps {
  projectId: string; 
  taskId: string;
  initialData: EditTaskData;
  onClose: () => void;
}

/**
 * Client component that renders the task editing form.
 * Handles state updates for task details, dates, and status modifications.
 */
export default function EditTaskForm({ projectId, taskId, initialData, onClose }: EditTaskFormProps) {
  const router = useRouter(); 

  const [title, setTitle] = useState(initialData.title);
  const [description, setDescription] = useState(initialData.description);
  const [dueDate, setDueDate] = useState(initialData.dueDate); 
  const [assignedTo, setAssignedTo] = useState(initialData.assignedTo);
  const [status, setStatus] = useState(initialData.status);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      await updateTask(projectId, taskId, {
        title,
        description,
        dueDate,
        status,
      });
      
      router.refresh();
      
      onClose();
    } catch (err) {
      console.error("Erreur lors de la sauvegarde :", err);
      setError("Impossible de mettre à jour la tâche. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = title.trim() !== '' && description.trim() !== '' && dueDate !== '';

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      
      {error && (
        <div style={{ color: '#DC2626', marginBottom: '16px', fontSize: '14px', textAlign: 'center' }}>
          {error}
        </div>
      )}
      
      <div className={styles.formGroup}>
        <label htmlFor="edit-title">Titre</label>
        <input
          type="text"
          id="edit-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="edit-description">Description</label>
        <input
          type="text"
          id="edit-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="edit-dueDate">Échéance</label>
        <div className={styles.dateInputWrapper}>
          <input
            type="date"
            id="edit-dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
            className={`${styles.customDateInput} ${dueDate === '' ? styles.emptyDateInput : ''}`}
          />
          <span className={styles.customIcon}>
            <CalendarIcon/> 
          </span>
        </div>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="edit-assignedTo">Assigné à :</label>
        <div className={styles.selectWrapper}>
          <select 
            id="edit-assignedTo" 
            value={assignedTo} 
            onChange={(e) => setAssignedTo(e.target.value)}
            className={`${assignedTo === "" ? styles.placeholderSelect : ""} ${styles.customSelect}`}
          >
            <option value="" disabled>Choisir un ou plusieurs collaborateurs</option>
            <option value="2_collabs">2 collaborateurs</option> 
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
            className={`${styles.statusPill} ${styles.todoColor} ${status === 'TODO' ? styles.activePill : styles.inactivePill}`}
            onClick={() => setStatus('TODO')}
          >
            À faire
          </button>
          <button
            type="button"
            className={`${styles.statusPill} ${styles.inProgressColor} ${status === 'IN_PROGRESS' ? styles.activePill : styles.inactivePill}`}
            onClick={() => setStatus('IN_PROGRESS')}
          >
            En cours
          </button>
          <button
            type="button"
            className={`${styles.statusPill} ${styles.doneColor} ${status === 'DONE' ? styles.activePill : styles.inactivePill}`}
            onClick={() => setStatus('DONE')}
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
          {isSubmitting ? 'Enregistrement...' : 'Enregistrer'}
        </button>
      </div>
      
    </form>
  );
}