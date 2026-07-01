import { AssignedTask } from '@/types/dashboard';
import { Folder, Calendar, MessageSquareText } from 'lucide-react';
import styles from './TaskCard.module.css';

interface TaskCardProps {
  task: AssignedTask;
}

export default function TaskCard({ task }: TaskCardProps) {
  // 1. Determine the badge color based on your backend status
  const getStatusBadgeClass = (status: AssignedTask['status']) => {
    switch (status) {
      case 'TODO': return styles.badgeTodo;
      case 'IN_PROGRESS': return styles.badgeInProgress;
      case 'DONE': return styles.badgeDone;
      default: return '';
    }
  };

  // 2. Convert the technical status into text that can be displayed to the user
  const getStatusLabel = (status: AssignedTask['status']) => {
    switch (status) {
      case 'TODO': return 'À faire';
      case 'IN_PROGRESS': return 'En cours';
      case 'DONE': return 'Terminée';
      default: return status;
    }
  };

  // 3. Format the date correctly 
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' });
  };

  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <h4 className={styles.title}>{task.title}</h4>
          <p className={styles.description}>{task.description}</p>
        </div>
        <span className={`${styles.badge} ${getStatusBadgeClass(task.status)}`}>
          {getStatusLabel(task.status)}
        </span>
      </div>
      
      <div className={styles.meta}>
        <span className={styles.metaItem}>
            <Folder size={15} fill="currentColor" className={styles.metaIcon} />
          {task.project?.name || 'Projet inconnu'}
        </span>
        <span className={styles.separator}>|</span>
        <span className={styles.metaItem}>
            <Calendar size={15} className={styles.metaIcon} />
          {formatDate(task.dueDate)}
        </span>
        <span className={styles.separator}>|</span>
        <span className={styles.metaItem}>
            <MessageSquareText size={15} fill="currentColor" className={styles.metaIcon} />
          {task.comments?.length || 0}
        </span>
      </div>

      <button className={styles.actionButton}>Voir</button>
    </article>
  );
}