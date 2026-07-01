"use client";

import { useState } from 'react';
import { AssignedTask } from '@/types/dashboard';
import { Folder, Calendar, MessageSquareText, Search } from 'lucide-react';
import styles from './TaskList.module.css';

interface TaskListProps {
  tasks: AssignedTask[];
}

const getStatusBadge = (status: string) => {
    switch (status) {
      case 'TODO': return { label: 'À faire', className: styles.badgeTODO || '' };
      case 'IN_PROGRESS': return { label: 'En cours', className: styles.badgeIN_PROGRESS || '' };
      case 'DONE': return { label: 'Terminée', className: styles.badgeDONE || '' };
      default: return { label: status, className: styles.badgeTODO || '' };
    }
};

export default function TaskList({ tasks }: TaskListProps) {
  // Status for storing the user's search
  const [searchQuery, setSearchQuery] = useState('');

  // Dynamic Task Filtering
  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.listContainer}>
      {/* --- HEADER AND SEARCH --- */}
      <div className={styles.tasksHeader}>
        <div className={styles.headerTitles}>
          <h2>Mes tâches assignées</h2>
          <p>Par ordre de priorité</p>
        </div>
        
        <div className={styles.searchContainer}>
          <Search size={16} className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Rechercher une tâche" 
            className={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* --- TASK LIST --- */}
      <div className={styles.taskList}>
        {filteredTasks.length === 0 ? (
          <p className={styles.emptyMessage}>Aucune tâche ne correspond à votre recherche.</p>
        ) : (
          filteredTasks.map((task) => {
            const statusData = getStatusBadge(task.status);
            const dateObj = new Date(task.dueDate);
            const formattedDate = dateObj.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' });

            return (
              <div key={task.id} className={styles.taskCard}>
                <div className={styles.taskInfo}>
                  <h3 className={styles.taskTitle}>{task.title}</h3>
                  <p className={styles.taskDescription}>{task.description}</p>
                  
                  <div className={styles.taskMeta}>
                    <span className={styles.metaItem}>
                      <Folder size={15} fill="currentColor" className={styles.metaIcon} />
                      {task.project?.name || 'Projet inconnu'}
                    </span>
                    
                    <span className={styles.separator}>|</span>
                    
                    <span className={styles.metaItem}>
                      <Calendar size={15} className={styles.metaIcon} />
                      {formattedDate}
                    </span>
                    
                    <span className={styles.separator}>|</span>
                    
                    <span className={styles.metaItem}>
                      <MessageSquareText size={15} fill="currentColor" className={styles.metaIcon} />
                      {task.comments?.length || 0}
                    </span>
                  </div>

                </div>
                
                <div className={styles.taskActions}>
                  <span className={`${styles.badge} ${statusData.className}`}>{statusData.label}</span>
                  <button className={styles.viewBtn}>Voir</button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}