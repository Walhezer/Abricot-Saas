import { AssignedTask } from '@/types/dashboard';
import KanbanColumn from './KanbanColumn';
import styles from './KanbanView.module.css';

interface KanbanViewProps {
  tasks: AssignedTask[];
}

export default function KanbanView({ tasks }: KanbanViewProps) {
  if (!tasks || tasks.length === 0) {
    return (
      <div className={styles.emptyBoard}>
        <p>Aucune tâche assignée pour le moment.</p>
      </div>
    );
  }
  
  // 1. Filtering Tasks by Status
  const todoTasks = tasks.filter(task => task.status === 'TODO');
  const inProgressTasks = tasks.filter(task => task.status === 'IN_PROGRESS');
  const doneTasks = tasks.filter(task => task.status === 'DONE');

  // 2. Display the 3 columns side by side
  return (
    <div className={styles.boardContainer}>
      <KanbanColumn 
        title="À faire" 
        count={todoTasks.length} 
        tasks={todoTasks} 
      />
      <KanbanColumn 
        title="En cours" 
        count={inProgressTasks.length} 
        tasks={inProgressTasks} 
      />
      <KanbanColumn 
        title="Terminées" 
        count={doneTasks.length} 
        tasks={doneTasks} 
      />
    </div>
  );
}