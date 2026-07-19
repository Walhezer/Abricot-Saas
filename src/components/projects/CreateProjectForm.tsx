'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './FormModal.module.css';
import { createProject } from '@/app/actions/projects';
import ChevronIcon from '../ui/ChevronIcon';

export interface User {
  id: string;
  name: string | null;
  email: string;
}

const MOCK_USERS: User[] = [
  { id: '1', name: 'Alice Martin', email: 'alice@example.com' },
  { id: '2', name: 'Bob Dupont', email: 'bob@example.com' },
  { id: '3', name: 'Caroline Leroy', email: 'caroline@example.com' },
  { id: '4', name: 'David Moreau', email: 'david@example.com' },
  { id: '5', name: 'Emma Rousseau', email: 'emma@example.com' },
  { id: '6', name: 'François Dubois', email: 'francois@example.com' },
  { id: '7', name: 'Gabrielle Simon', email: 'gabrielle@example.com' },
  { id: '8', name: 'Henri Laurent', email: 'henri@example.com' },
  { id: '9', name: 'Isabelle Petit', email: 'isabelle@example.com' },
  { id: '10', name: 'Jacques Durand', email: 'jacques@example.com' }
];

interface CreateProjectFormProps {
  onClose: () => void;
}

/**
 * Client component that renders the project creation form.
 * Handles form state, contributor selection, and triggers the creation server action.
 */
export default function CreateProjectForm({ onClose }: CreateProjectFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedContributors, setSelectedContributors] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const selectedEmails = MOCK_USERS
        .filter(u => selectedContributors.includes(u.id))
        .map(u => u.email);

      await createProject({
        name: title, 
        description: description,
        contributors: selectedEmails,
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

  const toggleContributor = (userId: string) => {
    setSelectedContributors((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

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
      
      <div className={styles.formGroup}>
        <label>Contributeurs</label>

        <div className={styles.dropdownContainer}>
          <div
            className={styles.dropdownHeader}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span className={selectedContributors.length > 0 ? styles.textSelected : styles.textPlaceholder}>
              {selectedContributors.length > 0
                ? `${selectedContributors.length} sélectionné(s)`
                : "Choisir un ou plusieurs collaborateurs"}
            </span>
            <div
              className={`${styles.chevronIcon} ${isDropdownOpen ? styles.chevronIconOpen : ''}`}
            >
              <ChevronIcon />
            </div>
          </div>
          {isDropdownOpen && (
            <div className={styles.dropdownList}>
              {MOCK_USERS.map((user) => (
                <label key={user.id} className={styles.contributorItem}>
                  <input
                    type="checkbox"
                    value={user.id}
                    checked={selectedContributors.includes(user.id)}
                    onChange={() => toggleContributor(user.id)}
                  />
                  {user.name ? user.name : user.email}
                </label>
              ))}
            </div>
          )}
        </div>
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