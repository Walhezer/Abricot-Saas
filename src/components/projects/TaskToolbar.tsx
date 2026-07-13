'use client';

import ListIcon from '@/components/ui/ListIcon';
import CalendarIcon from '@/components/ui/CalendarIcon';
import SearchBar from '@/components/ui/SearchBar';
import StatusDropdown from '../ui/StatusDropdown';
import styles from './TaskToolbar.module.css';

interface TaskToolbarProps {
    onFilterChange?: (status: string) => void;
    onSearchChange?: (query: string) => void;
}

export default function TaskToolbar({ onFilterChange, onSearchChange }: TaskToolbarProps) {
    return (
        <div className={styles.toolbar}>
            <div className={styles.headerTitles}>
                <h2 className={styles.title}>Tâches</h2>
                <p className={styles.subtitle}>Par ordre de priorité</p>
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
                <div className={styles.dropdownWrapper}>
                    <StatusDropdown
                        onStatusChange={(status) => onFilterChange && onFilterChange(status)}
                    />
                </div>

                <div className={styles.searchWrapper}>
                    <SearchBar
                        placeholder="Rechercher une tâche..."
                        onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
}