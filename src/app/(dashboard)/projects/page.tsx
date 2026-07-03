import ProjectCard from '@/components/projects/ProjectCard';
import styles from './projects.module.css';

// Simulation of Model Data
const MOCK_PROJECTS = Array.from({ length: 9 }, (_, index) => ({
  id: `proj-${index + 1}`,
  title: 'Nom du projet',
  description: "Développement de la nouvelle version de l'API REST avec authentification JWT.",
  progress: index === 0 ? 35 : 0,
  tasksCount: '0/2 tâches terminées',
  teamSize: 'Équipe (3)'
}));

export default function ProjectsPage() {
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
        {MOCK_PROJECTS.map((project) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
          />
        ))}
      </div>
    </div>
  );
}