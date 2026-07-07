'use client';

import { useEffect, useSyncExternalStore } from 'react';
import styles from './Modal.module.css';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

// Le fameux hook parfait pour l'hydratation (sans erreur de rendu en cascade !)
function useIsHydrated() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const isHydrated = useIsHydrated();

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !isHydrated) return null;

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modalBox} onClick={(e) => e.stopPropagation()}>
        
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Fermer">
            <svg 
              width="24" height="24" viewBox="0 0 24 24" 
              fill="none" stroke="currentColor" strokeWidth="1.5" 
              strokeLinecap="round" strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className={styles.body}>{children}</div>
      </div>
    </div>,
    document.body
  );
}