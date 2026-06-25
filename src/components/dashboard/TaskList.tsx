import { AssignedTask } from '@/types/dashboard';
import { Folder, Calendar, MessageSquare } from 'lucide-react';
import styles from './TaskList.module.css';

interface TaskListProps {
  tasks: AssignedTask[];
}

const getStatusBadge = (status: string) => {
    switch (status) {
      case 'TODO': return { label: 'À faire', className: styles.badgeTODO };
      case 'IN_PROGRESS': return { label: 'En cours', className: styles.badgeIN_PROGRESS };
      case 'DONE': return { label: 'Terminé', className: styles.badgeDONE };
      default: return { label: status, className: styles.badgeTODO };
    }
};

export default function TaskList({ tasks }: TaskListProps) {
  return (
    <div className={styles.taskList}>
      {tasks.length === 0 ? (
        <p>Aucune tâche assignée pour le moment.</p>
      ) : (
        tasks.map((task) => {
          const statusData = getStatusBadge(task.status);
          const dateObj = new Date(task.dueDate);
          const formattedDate = dateObj.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' });

          return (
            <div key={task.id} className={styles.taskCard}>
              <div className={styles.taskInfo}>
                <h3>{task.title}</h3>
                <p className={styles.taskDescription}>{task.description}</p>
                
                <div className={styles.taskMeta}>
                  <span className={styles.metaItem}>
                    <Folder className={styles.metaIcon} />
                    {task.project.name}
                  </span>
                  
                  <span className={styles.separator}>|</span>
                  
                  <span className={styles.metaItem}>
                    <Calendar className={styles.metaIcon} />
                    {formattedDate}
                  </span>
                  
                  <span className={styles.separator}>|</span>
                  
                  <span className={styles.metaItem}>
                    <MessageSquare className={styles.metaIcon} />
                    {task.comments.length}
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
  );
}