import Link from 'next/link';
import { AssignedTask } from '@/types/dashboard';
import { Folder, Calendar, MessageSquareText } from 'lucide-react';
import styles from './TaskCardKanban.module.css'; // 👈 Nouveau fichier CSS

interface TaskCardKanbanProps {
  task: AssignedTask;
}

export default function TaskCardKanban({ task }: TaskCardKanbanProps) {
  // On garde tes fonctions utilitaires
  const getStatusBadgeClass = (status: AssignedTask['status']) => {
    switch (status) {
      case 'TODO': return styles.badgeTodo;
      case 'IN_PROGRESS': return styles.badgeInProgress;
      case 'DONE': return styles.badgeDone;
      default: return '';
    }
  };

  const getStatusLabel = (status: AssignedTask['status']) => {
    switch (status) {
      case 'TODO': return 'À faire';
      case 'IN_PROGRESS': return 'En cours';
      case 'DONE': return 'Terminée';
      default: return status;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' });
  };

  return (
    <article className={styles.card}>
      {/* HEADER : Titre + Badge */}
      <div className={styles.header}>
        <h4 className={styles.title}>{task.title}</h4>
        <span className={`${styles.badge} ${getStatusBadgeClass(task.status)}`}>
          {getStatusLabel(task.status)}
        </span>
      </div>

      {/* CORPS : Description */}
      <p className={styles.description}>{task.description}</p>

      {/* META : Icônes (Projet, Date, Commentaires) */}
      <div className={styles.meta}>
        <span className={styles.metaItem}>
          <Folder size={15} fill="currentColor" className={styles.metaIcon} />
          <span className={styles.truncate}>{task.project?.name || 'Projet inconnu'}</span>
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

      {/* FOOTER : Bouton d'action */}
      <div className={styles.footer}>
        <Link href={`/projects/${task.projectId}#task-${task.id}`} className={styles.actionButton}>
          Voir
        </Link>
      </div>
    </article>
  );
}