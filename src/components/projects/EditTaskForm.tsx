'use client';

import { useState } from 'react';
import styles from './CreateTaskForm.module.css'; 
import CalendarIcon from '../ui/CalendarIcon';
import ChevronIcon from '../ui/ChevronIcon';

interface EditTaskFormProps {
  taskId: string;
  onClose: () => void;
  // Next, I need to add: initialData: TaskType
}

export default function EditTaskForm({ taskId, onClose }: EditTaskFormProps) {

  const [title, setTitle] = useState('Authentification JWT');
  const [description, setDescription] = useState('Implémenter le système d\'authentification avec tokens JWT');
  const [dueDate, setDueDate] = useState('2026-03-09'); 
  const [assignedTo, setAssignedTo] = useState('2_collabs');
  const [status, setStatus] = useState<'todo' | 'in_progress' | 'done'>('todo');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Tâche mise à jour :", { taskId, title, description, dueDate, assignedTo, status });
    onClose();
  };

  const isFormValid = title.trim() !== '' && description.trim() !== '' && dueDate !== '';

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      
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
          Enregistrer
        </button>
      </div>
    </form>
  );
}