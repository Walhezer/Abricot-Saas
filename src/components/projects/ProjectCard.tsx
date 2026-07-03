import Link from 'next/link';
import styles from './ProjectCard.module.css';

export interface Project {
  id: string;
  title: string;
  description: string;
  progress: number;
  tasksCount: string;
  teamSize: string;
}

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.id}`} className={styles.projectCard}>
      
      <h3 className={styles.cardTitle}>{project.title}</h3>
      <p className={styles.cardDescription}>{project.description}</p>
      
      {/* Spacer to push bottom content down */}
      <div className={styles.spacer}></div>

      {/* --- Progress Section --- */}
      <div className={styles.progressContainer}>
        <div className={styles.progressHeader}>
          <span className={styles.progressLabel}>Progression</span>
          <span className={styles.progressValue}>{project.progress}%</span>
        </div>
        
        <div className={styles.progressBar}>
          <div 
            className={styles.progressFill} 
            style={{ width: `${project.progress}%` }} 
          />
        </div>
        
        <span className={styles.tasksCount}>{project.tasksCount}</span>
      </div>

      {/* --- Team Section --- */}
      <div className={styles.teamContainer}>
        
        {/* Team header */}
        <div className={styles.teamHeader}>
          <span>👥</span>
          <span>{project.teamSize}</span>
        </div>

        {/* Team members row */}
        <div className={styles.teamMembersRow}>
          
          {/* Owner group (Avatar + Pill) */}
          <div className={styles.ownerGroup}>
            <div className={`${styles.avatar} ${styles.ownerAvatar}`}>AD</div>
            <div className={`${styles.pill} ${styles.ownerPill}`}>Propriétaire</div>
          </div>

          {/* Members group (Overlapping avatars) */}
          <div className={styles.memberGroup}>
            <div className={`${styles.avatar} ${styles.memberAvatar}`} style={{ zIndex: 2 }}>BD</div>
            <div className={`${styles.avatar} ${styles.memberAvatar}`} style={{ zIndex: 1 }}>CV</div>
          </div>

        </div>
      </div>

    </Link>
  );
}