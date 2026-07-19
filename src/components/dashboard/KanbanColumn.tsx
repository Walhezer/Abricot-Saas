import { AssignedTask } from '@/types/dashboard';
import TaskCardKanban from './TaskCardKanban';
import styles from './KanbanColumn.module.css';

interface KanbanColumnProps {
  title: string;
  count: number;
  tasks: AssignedTask[];
}

/**
 * Renders a single column within the Kanban board.
 * Displays a status title, a task count badge, and a vertical list of task cards.
 */
export default function KanbanColumn({ title, count, tasks }: KanbanColumnProps) {
  return (
    <div className={styles.column}>
      <div className={styles.columnHeader}>
        <h2 className={styles.title}>{title}</h2>
        <span className={styles.countBadge}>{count}</span>
      </div>
      <div className={styles.cardsContainer}>
        {tasks.map((task) => (
          <TaskCardKanban key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}