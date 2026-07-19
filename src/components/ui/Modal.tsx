'use client';

import { useEffect, useSyncExternalStore } from 'react';
import styles from './Modal.module.css';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string; 
  children: React.ReactNode;
  variant?: 'default' | 'compact'; 
  bodyClassName?: string;
}

/**
 * Custom hook to safely detect client-side hydration.
 * Prevents SSR mismatch errors when rendering portals.
 */
function useIsHydrated() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

/**
 * Renders a reusable modal dialog using React Portals.
 * Manages keyboard accessibility (Escape key to close) and SSR hydration.
 */
export default function Modal({ isOpen, onClose, title, children, variant = 'default', bodyClassName = '' }: ModalProps) {
  const isHydrated = useIsHydrated();
  const isCompact = variant === 'compact';

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
      <div className={`${styles.modalBox} ${isCompact ? styles.compactBox : ''}`} onClick={(e) => e.stopPropagation()}>
        {!isCompact && (
          <div className={styles.header}>
            {title && <h2 className={styles.title}>{title}</h2>}
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
        )}
        <div className={`${isCompact ? styles.compactBody : styles.body} ${bodyClassName}`}>
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}