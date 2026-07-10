import Link from 'next/link';
import ListIcon from '@/components/ui/ListIcon';
import CalendarIcon from '@/components/ui/CalendarIcon';
import SearchIcon from '@/components/ui/SearchIcon';
import styles from './projectSingle.module.css';
import { getProjectById, getTasksByProjectId } from '@/services/projects.service';
import { getInitials } from '@/utils/string';
import TaskListItem from '@/components/projects/TaskListItem';
import ProjectActionButtons from '@/components/projects/ProjectActionButtons';
import EditProjectTrigger from '@/components/projects/EditProjectTrigger';
import { getAccountInfo } from '@/services/account.service';

// Infer types directly from service return signatures
type Project = Awaited<ReturnType<typeof getProjectById>>;
type AssignedTask = Awaited<ReturnType<typeof getTasksByProjectId>> extends (infer U)[] ? U : never;

// Define a safe UI structure to replace 'any'
interface SafeProjectData {
  id: string;
  name: string;
  description?: string;
  owner?: { id: string; name: string };
  members?: Array<{ id: string; user: { name: string } }>;
}

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export default async function SingleProjectPage({ params }: ProjectPageProps) {
  const resolvedParams = await params;
  const projectId = resolvedParams.id;

  let project: Project | null = null;
  let tasks: AssignedTask[] = [];
  let currentUser = null;
  let isError = false;

  try {
    currentUser = await getAccountInfo();
    // 1. Fetch and extract project details safely
    const projectResponse = await getProjectById(projectId);
    const rawProject = projectResponse as unknown as Record<string, unknown>;

    if (rawProject && rawProject.data) {
      project = rawProject.data as unknown as Project;
    } else if (rawProject && rawProject.project) {
      project = rawProject.project as unknown as Project;
    } else if (projectResponse) {
      project = projectResponse as unknown as Project;
    }

    // 2. Fetch and extract tasks safely
    if (project) {
      const tasksResponse = await getTasksByProjectId(projectId);
      const rawTasks = tasksResponse as unknown as Record<string, unknown>;

      if (rawTasks && Array.isArray(rawTasks.data)) {
        tasks = rawTasks.data as unknown as AssignedTask[];
      } else if (rawTasks && Array.isArray(rawTasks.tasks)) {
        tasks = rawTasks.tasks as unknown as AssignedTask[];
      } else if (Array.isArray(tasksResponse)) {
        tasks = tasksResponse as unknown as AssignedTask[];
      }
    }
  } catch (error) {
    console.error(`API Error fetching single project (ID: ${projectId}):`, error);
    isError = true;
  }

  // Fallback UI
  if (isError || !project) {
    return (
      <div className={styles.pageWrapper}>
        <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>
          <h2>Projet introuvable ou erreur de chargement</h2>
          <Link href="/projects" style={{ color: '#D3590B', textDecoration: 'underline' }}>
            Retour à la liste des projets
          </Link>
        </div>
      </div>
    );
  }

  // Safely cast project to our defined UI interface to avoid 'any'
  const safeProject = project as unknown as SafeProjectData;
  const totalContributors = (safeProject.members?.length || 0) + (safeProject.owner ? 1 : 0);
  const isOwner = currentUser?.id === safeProject.owner?.id;
  return (
    <div className={styles.pageWrapper}>
      {/* Main Header */}
      <div className={styles.topBar}>
        <Link href="/projects" className={styles.backBtn}>
          ←
        </Link>

        <div className={styles.projectHeaderContent}>
          <div className={styles.titleRow}>
            <h1 className={styles.projectTitle}>{safeProject.name}</h1>
            {isOwner && (
              <EditProjectTrigger
                projectId={projectId}
                className={styles.modifyLink}
                projectData={{
                  title: safeProject.name,
                  description: safeProject.description || '',
                  contributors: "2_collabs"
                }}
              />
            )}
          </div>
          <p className={styles.projectDescription}>
            {safeProject.description}
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
          {safeProject.owner && (
            <div className={styles.contributorItem}>
              <div className={`${styles.avatarCircle} ${styles.ownerAvatar}`}>
                {getInitials(safeProject.owner.name)}
              </div>
              <div className={`${styles.rolePill} ${styles.ownerPill}`}>Propriétaire</div>
            </div>
          )}

          {/* Members Tags - TypeScript infers 'member' automatically from SafeProjectData */}
          {safeProject.members?.map((member) => (
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
        {/* Toolbar */}
        <div className={styles.toolbar}>
          <div>
            <h2 style={{ fontSize: '18px', margin: '0 0 4px 0', color: '#1A1A1A' }}>Tâches</h2>
            <p style={{ fontSize: '13px', color: '#888', margin: '0' }}>Par ordre de priorité</p>
          </div>

          <div className={styles.toolbarRight}>
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

            <button className={styles.filterSelect}>
              <span>Statut</span>
              <span style={{ fontSize: '10px' }}>▼</span>
            </button>

            <div className={styles.searchContainer}>
              <input
                type="text"
                placeholder="Rechercher une tâche"
                className={styles.searchInput}
              />
              <span className={styles.searchIcon}><SearchIcon /></span>
            </div>
          </div>
        </div>

        {/* Tasks list */}
        <div style={{ borderTop: '1px solid #F5F5F5', paddingTop: '24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <TaskListItem
                  key={(task as unknown as { id: string }).id}
                  task={task as never}
                  currentUser={safeProject.owner as never}
                />
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