import Link from 'next/link';
import styles from './projectSingle.module.css';
import { getProjectById, getTasksByProjectId } from '@/services/projects.service';
import { getInitials } from '@/utils/string';
import ProjectActionButtons from '@/components/projects/ProjectActionButtons';
import EditProjectTrigger from '@/components/projects/EditProjectTrigger';
import { getAccountInfo } from '@/services/account.service';
import TaskSection from '@/components/projects/TaskSection';
import BackButton from '@/components/ui/BackButton';

type Project = Awaited<ReturnType<typeof getProjectById>>;
type AssignedTask = Awaited<ReturnType<typeof getTasksByProjectId>> extends (infer U)[] ? U : never;

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
    // Fetch and extract project details safely
    const projectResponse = await getProjectById(projectId);
    const rawProject = projectResponse as unknown as Record<string, unknown>;

    if (rawProject && rawProject.data) {
      project = rawProject.data as unknown as Project;
    } else if (rawProject && rawProject.project) {
      project = rawProject.project as unknown as Project;
    } else if (projectResponse) {
      project = projectResponse as unknown as Project;
    }

    // Fetch and extract tasks safely
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

  const safeProject = project as unknown as SafeProjectData;
  const totalContributors = (safeProject.members?.length || 0) + (safeProject.owner ? 1 : 0);
  const isOwner = currentUser?.id === safeProject.owner?.id;
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.topBar}>
        <div className={styles.leftGroup}>
          <BackButton href="/projects" />
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
        </div>
        <div className={styles.actionButtons}>
          <ProjectActionButtons
            projectId={projectId}
            btnClassName={styles.createTaskBtn}
            iaBtnClassName={styles.iaBtn}
          />
        </div>

      </div>

      <div className={styles.contributorsBar}>
        <div className={styles.contributorsLabel}>
          Contributeurs <span>{totalContributors} {totalContributors > 1 ? 'personnes' : 'personne'}</span>
        </div>

        <div className={styles.contributorsList}>
          {safeProject.owner && (
            <div className={styles.contributorItem}>
              <div className={`${styles.avatarCircle} ${styles.ownerAvatar}`}>
                {getInitials(safeProject.owner.name)}
              </div>
              <div className={`${styles.rolePill} ${styles.ownerPill}`}>Propriétaire</div>
            </div>
          )}
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
      <div className={styles.tasksSection}>
        <TaskSection
          tasks={tasks as never[]}
          currentUser={safeProject.owner as never}
        />
      </div>
    </div>
  );
}