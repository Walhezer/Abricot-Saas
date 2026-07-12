'use client';

import { useState } from 'react';
import ChevronIcon from '@/components/ui/ChevronIcon';
import Tag from '@/components/ui/Tag'; 
import styles from './StatusDropdown.module.css';

interface StatusDropdownProps {
    onStatusChange: (statusValue: string) => void;
}

export default function StatusDropdown({ onStatusChange }: StatusDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    
   
    const [activeStatus, setActiveStatus] = useState<'TODO' | 'IN_PROGRESS' | 'DONE' | 'ALL' | null>(null);

    const handleSelect = (statusValue: 'TODO' | 'IN_PROGRESS' | 'DONE' | 'ALL') => {
        setActiveStatus(statusValue);
        onStatusChange(statusValue);
        setIsOpen(false);
    };

    return (
        <div className={styles.filterWrapper}>
            <button 
                className={styles.filterSelect}
                onClick={() => setIsOpen(!isOpen)}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                {activeStatus ? (
                    <Tag status={activeStatus} />
                ) : (
                    <span>Statut</span>
                )}
                
                <span className={isOpen ? styles.chevronOpen : ''}>
                    <ChevronIcon />
                </span>
            </button>

            {isOpen && (
                <div className={styles.dropdownMenu} role="listbox">
                    <button role="option" aria-selected={activeStatus === 'ALL'} onClick={() => handleSelect('ALL')}>
                        <Tag status="ALL" />
                    </button>
                    <button role="option" aria-selected={activeStatus === 'TODO'} onClick={() => handleSelect('TODO')}>
                        <Tag status="TODO" />
                    </button>
                    <button role="option" aria-selected={activeStatus === 'IN_PROGRESS'} onClick={() => handleSelect('IN_PROGRESS')}>
                        <Tag status="IN_PROGRESS" />
                    </button>
                    <button role="option" aria-selected={activeStatus === 'DONE'} onClick={() => handleSelect('DONE')}>
                        <Tag status="DONE" />
                    </button>
                </div>
            )}
        </div>
    );
}