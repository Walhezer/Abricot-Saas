'use client';

import ListIcon from '@/components/ui/ListIcon';
import CalendarIcon from '@/components/ui/CalendarIcon';
import SearchBar from '@/components/ui/SearchBar';
import ChevronIcon from '@/components/ui/ChevronIcon';
import styles from './TaskToolbar.module.css';

export default function TaskToolbar() {
  return (
    <div className={styles.toolbar}>
      <div>
        <h2 style={{ fontSize: '18px', margin: '0 0 4px 0', color: '#1A1A1A' }}>Tâches</h2>
        <p style={{ fontSize: '13px', color: '#888', margin: '0' }}>Par ordre de priorité</p>
      </div>

      <div className={styles.toolbarRight}>
        <div className={styles.viewSelector}>
          <button className={`${styles.viewBtn} ${styles.viewBtnActive}`}>
            <ListIcon />
            <span>Liste</span>
          </button>
          <button className={styles.viewBtn}>
            <CalendarIcon />
            <span>Calendrier</span>
          </button>
        </div>

        <button className={styles.filterSelect}>
          <span>Statut</span>
          <ChevronIcon />
        </button>
        <SearchBar placeholder="Rechercher une tâche..." />
      </div>
    </div>
  );
}