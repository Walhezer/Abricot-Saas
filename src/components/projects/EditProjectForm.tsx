'use client';

import { useState } from 'react';
import styles from './FormModal.module.css'; 
import ChevronIcon from '@/components/ui/ChevronIcon';

interface EditProjectFormProps {
  projectId: string;
  onClose: () => void;
  // Next, I need to add: initialData: TaskType
}

export default function EditProjectForm({ projectId, onClose }: EditProjectFormProps) {
  // Valeurs initiales "en dur" basées sur ta maquette
  const [title, setTitle] = useState('Input');
  const [description, setDescription] = useState('Input');
  const [contributors, setContributors] = useState('2_collabs');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Projet mis à jour :", { projectId, title, description, contributors });
    onClose();
  };

  const isFormValid = title.trim() !== '' && description.trim() !== '';

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      
      <div className={styles.formGroup}>
        <label htmlFor="edit-project-title">Titre*</label>
        <input
          type="text"
          id="edit-project-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="edit-project-description">Description*</label>
        <input
          type="text"
          id="edit-project-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="edit-project-contributors">Contributeurs</label>
        <div className={styles.selectWrapper}>
          <select 
            id="edit-project-contributors" 
            value={contributors} 
            onChange={(e) => setContributors(e.target.value)}
            className={`${contributors === "" ? styles.placeholderSelect : ""} ${styles.customSelect}`}
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