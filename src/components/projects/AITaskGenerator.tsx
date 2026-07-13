'use client';

import { useState } from 'react';
import styles from './AITaskGenerator.module.css';
import SparklesIcon from '@/components/ui/SparklesIcon';
import TrashIcon from '@/components/ui/TrashIcon';
import PencilIcon from '@/components/ui/PencilIcon';
import IAButton from '@/components/ui/IAButton';

interface AITaskGeneratorProps {
  onClose: () => void;
}

export default function AITaskGenerator({ onClose }: AITaskGeneratorProps) {
  const [step, setStep] = useState<'input' | 'results'>('input');
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const handleGenerateTasks = () => {
    if (!prompt.trim()) return;

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setStep('results');
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleGenerateTasks();
    }
  };

  return (
    <div className={styles.container}>

      {/* --- HEADER --- */}
      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <div className={styles.sparkleIcon}>
            <SparklesIcon />
          </div>
          <h2 className={styles.title}>{step === 'input' ? 'Créer une tâche' : 'Vos tâches...'}</h2>
        </div>
      </div>
      {step === 'input' && <div className={styles.spacer}></div>}
      {step === 'results' && (
        <div className={styles.resultsContainer}>
          {[1, 2, 3].map((index) => (
            <div key={index} className={styles.taskCard}>
              <h3>Nom de la tâche générée {index}</h3>
              <p>Description détaillée de la tâche suggérée par l&apos;intelligence artificielle pour faire avancer le projet.</p>

              <div className={styles.cardActions}>
                <button type="button" className={styles.actionBtn}>
                  <span className={styles.actionIcon}>
                    <TrashIcon />
                  </span>{' '}
                  Supprimer
                </button>
                <span className={styles.separator}>|</span>
                <button type="button" className={styles.actionBtn}>
                  <span className={styles.actionIcon}>
                    <PencilIcon />
                  </span>{' '}
                  Modifier
                </button>
              </div>
            </div>
          ))}
          <div className={styles.addTasksAction}>
            <button type="button" className={styles.blackBtn} onClick={onClose}>
              + Ajouter les tâches
            </button>
          </div>
        </div>
      )}
      <div className={styles.inputWrapper}>
        <input
          type="text"
          placeholder="Décrivez les tâches que vous souhaitez ajouter..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          className={styles.input}
        />
        <IAButton
          onClick={handleGenerateTasks}
          isLoading={isLoading}
        />
      </div>

    </div>
  );
}