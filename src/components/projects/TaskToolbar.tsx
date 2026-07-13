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