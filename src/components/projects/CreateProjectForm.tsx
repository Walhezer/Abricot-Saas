'use client';

import { useState } from 'react';
import styles from './FormModal.module.css'; 
import ChevronIcon from '@/components/ui/ChevronIcon';

interface CreateProjectFormProps {
  onClose: () => void;
}

export default function CreateProjectForm({ onClose }: CreateProjectFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [contributors, setContributors] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Nouveau projet à créer :", { title, description, contributors });
    onClose();
  };

  const isFormValid = title.trim() !== '' && description.trim() !== '';

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      
      <div className={styles.formGroup}>
        <label htmlFor="project-title">Titre*</label>
        <input
          type="text"
          id="project-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="project-description">Description*</label>
        <input
          type="text"
          id="project-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="project-contributors">Contributeurs</label>
        <div className={styles.selectWrapper}>
          <select 
            id="project-contributors" 
            value={contributors} 
            onChange={(e) => setContributors(e.target.value)}
            className={`${contributors === "" ? styles.placeholderSelect : ""} ${styles.customSelect}`}
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

      <div className={styles.actions}>
        <button 
          type="submit" 
          className={styles.submitBtn}
          disabled={!isFormValid}
        >
          Ajouter un projet
        </button>
      </div>
    </form>
  );
}