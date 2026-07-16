'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './FormModal.module.css';
import ChevronIcon from '@/components/ui/ChevronIcon';
import { updateProject, deleteProject } from '@/app/actions/projects';

export interface EditProjectData {
  title: string;
  description: string;
  contributors: string;
}

interface EditProjectFormProps {
  projectId: string;
  initialData: EditProjectData;
  onClose: () => void;
}

export default function EditProjectForm({ projectId, initialData, onClose }: EditProjectFormProps) {
  const router = useRouter();

  const [title, setTitle] = useState(initialData.title);
  const [description, setDescription] = useState(initialData.description);
  const [contributors, setContributors] = useState(initialData.contributors);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

const handleDelete = async () => {
    if (confirm("Es-tu sûr de vouloir supprimer ce projet ? Cette action est irréversible.")) {
      setIsSubmitting(true);
      setError(null);
      
      try {
        await deleteProject(projectId);
        onClose(); 
        router.push('/projects'); 
      } catch (err) {
        console.error("Erreur suppression :", err);
        setError("Erreur lors de la suppression du projet.");
        setIsSubmitting(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await updateProject(projectId, {
        title,
        description
      });

      router.refresh();
      onClose();
    } catch (err) {
      console.error("Erreur lors de la mise à jour du projet :", err);
      setError("Impossible de modifier le projet.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = title.trim() !== '' && description.trim() !== '';

  return (
    <form className={styles.form} onSubmit={handleSubmit}>

      {error && (
        <div style={{ color: '#DC2626', marginBottom: '16px', fontSize: '14px', textAlign: 'center' }}>
          {error}
        </div>
      )}

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
          disabled={!isFormValid || isSubmitting}
        >
          {isSubmitting ? 'Enregistrement...' : 'Enregistrer'}
        </button>
        <button
          type="button"
          onClick={handleDelete}
          className={styles.deleteBtn}
          disabled={isSubmitting}
        >
          Supprimer le projet
        </button>

      </div>
    </form>
  );
}