import { AssignedTask } from '@/types/dashboard';
import TaskCardKanban from './TaskCardKanban';
import styles from './KanbanColumn.module.css';

interface KanbanColumnProps {
  title: string;
  count: number;
  tasks: AssignedTask[];
}

export default function KanbanColumn({ title, count, tasks }: KanbanColumnProps) {
  return (
    <div className={styles.column}>
      <div className={styles.columnHeader}>
        <h3 className={styles.title}>{title}</h3>
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