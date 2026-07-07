import Link from 'next/link';
import ListIcon from '@/components/ui/ListIcon';
import CalendarIcon from '@/components/ui/CalendarIcon';
import styles from './projectSingle.module.css';
import { getProjectById, getTasksByProjectId } from '@/services/projects.service';
import { getInitials } from '@/utils/string';
import TaskListItem from '@/components/projects/TaskListItem';
import ProjectActionButtons from '@/components/projects/ProjectActionButtons';

interface ProjectPageProps {
  params: {
    id: string;
  };
}

export default async function SingleProjectPage({ params }: ProjectPageProps) {
  const resolvedParams = await params;
  const projectId = resolvedParams.id;

  // We retrieve the project and its tasks
  const project = await getProjectById(projectId);
  const tasks = await getTasksByProjectId(projectId);

  // If project is not found or API fails, show a fallback
  if (!project) {
    return (
      <div className={styles.pageWrapper}>
        <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>
          <h2>Projet introuvable</h2>
          <Link href="/projects" style={{ color: '#D3590B', textDecoration: 'underline' }}>
            Retour à la liste des projets
          </Link>
        </div>
      </div>
    );
  }

  // Calculate total contributors (members + 1 owner)
  const totalContributors = (project.members?.length || 0) + (project.owner ? 1 : 0);


  // Render the project details page
  return (
    <div className={styles.pageWrapper}>

      {/* Main Header */}
      <div className={styles.topBar}>
        <Link href="/projects" className={styles.backBtn}>
          ←
        </Link>

        <div className={styles.projectHeaderContent}>
          <div className={styles.titleRow}>
            {/* Dynamic Title */}
            <h1 className={styles.projectTitle}>{project.name}</h1>
            <span className={styles.modifyLink}>Modifier</span>
          </div>
          {/* Dynamic Description */}
          <p className={styles.projectDescription}>
            {project.description}
          </p>
        </div>

        <div className={styles.actionButtons}>
          <ProjectActionButtons
            projectId={projectId}
            btnClassName={styles.createTaskBtn}
            iaBtnClassName={styles.iaBtn}
          />
        </div>
      </div>

      {/* Dynamic Contributors Bar */}
      <div className={styles.contributorsBar}>

        <div className={styles.contributorsLabel}>
          Contributeurs <span>{totalContributors} {totalContributors > 1 ? 'personnes' : 'personne'}</span>
        </div>

        <div className={styles.contributorsList}>

          {/* Owner Tag */}
          {project.owner && (
            <div className={styles.contributorItem}>
              <div className={`${styles.avatarCircle} ${styles.ownerAvatar}`}>
                {getInitials(project.owner.name)}
              </div>
              <div className={`${styles.rolePill} ${styles.ownerPill}`}>Propriétaire</div>
            </div>
          )}

          {/* Members Tags */}
          {project.members?.map((member) => (
            <div key={member.id} className={styles.contributorItem}>
              <div className={`${styles.avatarCircle} ${styles.memberAvatar}`}>
                {getInitials(member.user.name)}
              </div>
              <div className={`${styles.rolePill} ${styles.memberPill}`}>
                {member.user.name}
              </div>
            </div>
          ))}

        </div>

      </div>

      {/* Tasks Area */}
      <div className={styles.tasksSection}>

        {/* Toolbar (Filters, Views, Search) */}
        <div className={styles.toolbar}>
          <div>
            <h2 style={{ fontSize: '18px', margin: '0 0 4px 0', color: '#1A1A1A' }}>Tâches</h2>
            <p style={{ fontSize: '13px', color: '#888', margin: '0' }}>Par ordre de priorité</p>
          </div>

          <div className={styles.toolbarRight}>
            {/* View selector */}
            <div className={styles.viewSelector}>
              <button className={`${styles.viewBtn} ${styles.viewBtnActive}`}>
                <ListIcon />
                <span>Liste</span>
              </button>
              <button className={styles.viewBtn}>
                <CalendarIcon />
                <span>Calendrier</span>
              </button>
            </div>

            {/* Filter by Status */}
            <button className={styles.filterSelect}>
              <span>Statut</span>
              <span style={{ fontSize: '10px' }}>▼</span>
            </button>

            {/* Search bar */}
            <div className={styles.searchContainer}>
              <input
                type="text"
                placeholder="Rechercher une tâche..."
                className={styles.searchInput}
              />
              <span className={styles.searchIcon}>🔍</span>
            </div>
          </div>
        </div>

        {/* Tasks list */}
        <div style={{ borderTop: '1px solid #F5F5F5', paddingTop: '24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            {/* We check to see if there are any tasks; if not, we display an empty message */}
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <TaskListItem key={task.id} task={task} currentUser={project.owner} />
              ))
            ) : (
              <div style={{ textAlign: 'center', color: '#888', padding: '40px 0' }}>
                Aucune tâche n&apos;a encore été créée pour ce projet.
              </div>
            )}

          </div>
        </div>
      </div>

    </div>
  );
}