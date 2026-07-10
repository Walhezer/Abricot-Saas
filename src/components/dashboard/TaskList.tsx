"use client";

import { useState } from 'react';
import { AssignedTask } from '@/types/dashboard';
import SearchBar from '@/components/ui/SearchBar';
import TaskCard from './TaskCard'; // Import de ton composant existant
import styles from './TaskList.module.css';

interface TaskListProps {
  tasks: AssignedTask[];
}

export default function TaskList({ tasks }: TaskListProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.listContainer}>
      <div className={styles.tasksHeader}>
        <div className={styles.headerTitles}>
          <h2>Mes tâches assignées</h2>
          <p>Par ordre de priorité</p>
        </div>

        <SearchBar
          placeholder="Rechercher une tâche"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className={styles.taskList}>
        {filteredTasks.length === 0 ? (
          <p className={styles.emptyMessage}>Aucune tâche ne correspond à votre recherche.</p>
        ) : (
          filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))
        )}
      </div>
    </div>
  );
}