import ProjectCard from '@/components/projects/ProjectCard';
import styles from './projects.module.css';
import CreateProjectButton from '@/components/projects/CreateProjectButton';
import { getProjects, getTasksByProjectId } from '@/services/projects.service';

// Infer types directly from service return signatures
type Project = Awaited<ReturnType<typeof getProjects>> extends (infer U)[] ? U : never;
type AssignedTask = Awaited<ReturnType<typeof getTasksByProjectId>> extends (infer U)[] ? U : never;

export default async function ProjectsPage() {
  let projects: Project[] = [];
  let completedTasksByProjectId: Record<string, number> = {};
  let isError = false;

  try {
    const response = await getProjects();
    const rawData = response as unknown as Record<string, unknown>;

    // Safely extract projects array
    if (rawData && Array.isArray(rawData.data)) {
      projects = rawData.data as unknown as Project[];
    } else if (rawData && Array.isArray(rawData.projects)) {
      projects = rawData.projects as unknown as Project[];
    } else if (Array.isArray(response)) {
      projects = response as unknown as Project[];
    }

    // Fetch and calculate completed tasks per project
    if (projects.length > 0) {
      completedTasksByProjectId = Object.fromEntries(
        await Promise.all(
          projects.map(async (project) => {
            try {
              const tasksResponse = await getTasksByProjectId(project.id);
              const rawTasksData = tasksResponse as unknown as Record<string, unknown>;
              let tasks: AssignedTask[] = [];

              // Safely extract tasks array
              if (rawTasksData && Array.isArray(rawTasksData.data)) {
                tasks = rawTasksData.data as unknown as AssignedTask[];
              } else if (rawTasksData && Array.isArray(rawTasksData.tasks)) {
                tasks = rawTasksData.tasks as unknown as AssignedTask[];
              } else if (Array.isArray(tasksResponse)) {
                tasks = tasksResponse as unknown as AssignedTask[];
              }

              // Count tasks with 'DONE' status
              const doneCount = tasks.filter(
                (task) => (task as { status?: string }).status === 'DONE'
              ).length;
              
              return [project.id, doneCount] as const;
            } catch (taskError) {
              console.error(`Error fetching tasks for project ${project.id}:`, taskError);
              return [project.id, 0] as const;
            }
          })
        )
      );
    }
  } catch (error) {
    console.error("Error fetching projects:", error);
    isError = true;
  }

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Mes projets</h1>
          <p className={styles.pageSubtitle}>Gérez vos projets</p>
        </div>

        <CreateProjectButton buttonClassName={styles.createProjectBtn} />
      </div>

      {isError ? (
        <div className={styles.projectsGrid}>
          <p style={{ color: '#DC2626' }}>
            Une erreur est survenue lors du chargement des projets.
          </p>
        </div>
      ) : (
        <div className={styles.projectsGrid}>
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              completedTasks={completedTasksByProjectId[project.id] ?? 0}
            />
          ))}

          {projects.length === 0 && (
            <p style={{ color: '#666' }}>
              Aucun projet n&apos;a encore été créé.
            </p>
          )}
        </div>
      )}
    </div>
  );
}