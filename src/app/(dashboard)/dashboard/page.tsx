import { Metadata } from 'next';
import { getAssignedTasks } from '@/services/dashboard.service';
import { AssignedTask } from '@/types/dashboard';
import TaskList from '@/components/dashboard/TaskList';
import KanbanView from '@/components/dashboard/KanbanView';
import { ViewToggle } from '@/components/dashboard/ViewToggle';
import CreateProjectButton from '@/components/projects/CreateProjectButton';
import styles from './dashboard.module.css';

export const metadata: Metadata = {
  title: 'Tableau de bord',
};

/**
 * Server component that renders the main dashboard.
 * Fetches user tasks and handles the display view (List or Kanban).
 */
export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string }>;
}) {
  let tasks: AssignedTask[] = [];
  let isError = false;

  const resolvedParams = await searchParams;
  const isKanbanView = resolvedParams.view === 'kanban';

  try {
    const response = await getAssignedTasks();
    const rawData = response as unknown as Record<string, unknown>;

    // Handle different API response structures safely
    if (rawData && Array.isArray(rawData.data)) {
      tasks = rawData.data as AssignedTask[];
    } else if (rawData && Array.isArray(rawData.tasks)) {
      tasks = rawData.tasks as AssignedTask[];
    } else if (Array.isArray(response)) {
      tasks = response as AssignedTask[];
    } else {
      tasks = [];
    }
  } catch (error) {
    console.error("API Error:", error);
    isError = true;
  }

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Tableau de bord</h1>
          <p className={styles.pageSubtitle}>
            Bonjour Alice Dupont, voici un aperçu de vos projets et tâches
          </p>
        </div>

        <div>
          <CreateProjectButton buttonClassName={styles.createProjectBtn} />
        </div>
      </div>

      <div className={styles.toggleContainerPlacement}>
        <ViewToggle currentView={isKanbanView ? 'kanban' : 'list'} />
      </div>

      {isError ? (
        <div className={styles.tasksContainer}>
          <p>Une erreur est survenue lors du chargement des tâches.</p>
        </div>
      ) : (
        <div className={isKanbanView ? styles.kanbanWrapper : styles.tasksContainer}>
          {isKanbanView ? (
            <KanbanView tasks={tasks} />
          ) : (
            <TaskList tasks={tasks} />
          )}
        </div>
      )}
    </div>
  );
}