import ProjectCard from '@/components/projects/ProjectCard';
import styles from './projects.module.css';
import { getProjects, getTasksByProjectId } from '@/services/projects.service';

export default async function ProjectsPage() {
  const projects = await getProjects();
  const completedTasksByProjectId = Object.fromEntries(
    await Promise.all(
      projects.map(async (project) => {
        const tasks = await getTasksByProjectId(project.id);
        return [
          project.id,
          tasks.filter((task) => task.status === 'DONE').length,
        ] as const;
      })
    )
  );

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Mes projets</h1>
          <p className={styles.pageSubtitle}>Gérez vos projets</p>
        </div>

        <button className={styles.createProjectBtn}>
          <span>+ Créer un projet</span>
        </button>
      </div>

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
    </div>
  );
}
