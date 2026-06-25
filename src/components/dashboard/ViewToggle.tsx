import Link from 'next/link';
import styles from './ViewToggle.module.css';

interface ViewToggleProps {
  currentView: 'list' | 'kanban';
}

export function ViewToggle({ currentView }: ViewToggleProps) {
  return (
    <div className={styles.toggleContainer}>
      <Link 
        href="/dashboard"
        className={`${styles.toggleBtn} ${currentView === 'list' ? styles.active : styles.inactive}`}
      >
        {/* Icône Liste */}
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        Liste
      </Link>

      <Link 
        href="/dashboard?view=kanban"
        className={`${styles.toggleBtn} ${currentView === 'kanban' ? styles.active : styles.inactive}`}
      >
        {/* Icône Kanban */}
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={2}>
          <rect x="3" y="3" width="6" height="18" rx="1" strokeLinecap="round" strokeLinejoin="round"/>
          <rect x="15" y="3" width="6" height="12" rx="1" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Kanban
      </Link>
    </div>
  );
}