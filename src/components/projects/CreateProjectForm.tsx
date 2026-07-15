'use client';

import { useState } from 'react'; 
import { useRouter } from 'next/navigation';
import styles from './FormModal.module.css';
import { createProject } from '@/app/actions/projects';

interface CreateProjectFormProps {
  onClose: () => void;
}

export default function CreateProjectForm({ onClose }: CreateProjectFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      await createProject({
        title,
        description,
      });

      router.refresh();
      onClose();
    } catch (err: unknown) {
      console.error(err);
      let errorMessage = "Erreur lors de la création du projet.";
      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (typeof err === 'string') {
        errorMessage = err;
      }
      setError(errorMessage);    
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = title.trim() !== '' && description.trim() !== '';

  return (
    <form className={styles.form} onSubmit={handleSubmit}>

      {error && <div style={{ color: '#DC2626', marginBottom: '16px', fontSize: '14px' }}>{error}</div>}

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

      <div className={styles.actions}>
        <button
          type="submit"
          className={styles.submitBtn}
          disabled={!isFormValid || isSubmitting}
        >
          {isSubmitting ? 'Création...' : 'Ajouter un projet'}
        </button>
      </div>
    </form>
  );
}