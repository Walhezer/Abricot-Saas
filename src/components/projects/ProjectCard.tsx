import Link from 'next/link';
import styles from './ProjectCard.module.css';
import TeamIcon from '@/components/ui/TeamIcon';
import { Project } from '@/types/dashboard';
import { getInitials } from '@/utils/string';

interface ProjectCardProps {
  project: Project;
  completedTasks: number;
}

export default function ProjectCard({
  project,
  completedTasks,
}: ProjectCardProps) {
  // Dynamic calculations based on your data
  const totalTasks = project._count?.tasks || 0;
  const progress =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);
  const teamSize = (project.members?.length || 0) + 1;

  return (
    <Link href={`/projects/${project.id}`} className={styles.projectCard}>
      {/* Using `project.name` instead of `title` to match the database */}
      <h2 className={styles.cardTitle}>{project.name}</h2>
      <p className={styles.cardDescription}>{project.description}</p>

      <div className={styles.spacer}></div>

      {/* --- Progression Section --- */}
      <div className={styles.progressContainer}>
        <div className={styles.progressHeader}>
          <span className={styles.progressLabel}>Progression</span>
          <span className={styles.progressValue}>{progress}%</span>
        </div>

        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${progress}%` }}
          />
        </div>

        <span className={styles.tasksCount}>
          {completedTasks}/{totalTasks} tâches terminées
        </span>
      </div>

      {/* --- Team Section --- */}
      <div className={styles.teamContainer}>
        <div className={styles.teamHeader}>
          <span className={styles.TeamIcon}>
            <TeamIcon />
          </span>
          <span>Équipe ({teamSize})</span>
        </div>

        <div className={styles.teamMembersRow}>
          {/* Owner Group (Circle + Pill) */}
          {project.owner && (
            <div className={styles.ownerGroup}>
              <div className={`${styles.avatar} ${styles.ownerAvatar}`}>
                {getInitials(project.owner.name)}
              </div>
              <div className={`${styles.pill} ${styles.ownerPill}`}>
                Propriétaire
              </div>
            </div>
          )}

          {/* Member Groups (Overlapping Circles) */}
          <div className={styles.memberGroup}>
            {project.members?.map((member, index) => (
              <div
                key={member.id}
                className={`${styles.avatar} ${styles.memberAvatar}`}
                style={{ zIndex: 10 - index }}
                title={member.user.name}
              >
                {getInitials(member.user.name)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
