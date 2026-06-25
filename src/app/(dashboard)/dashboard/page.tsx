import { getAssignedTasks } from '@/services/dashboard.service';
import { AssignedTask } from '@/types/dashboard';
import TaskList from '@/components/dashboard/TaskList';
import KanbanView from '@/components/dashboard/KanbanView';
import { ViewToggle } from '@/components/dashboard/ViewToggle';
import styles from './dashboard.module.css';

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
    tasks = await getAssignedTasks();
  } catch (error) {
    console.error("Erreur API:", error);
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
           <button className={styles.createProjectBtn}>+ Créer un projet</button>
        </div>
      </div>

      <div className={styles.toggleContainerPlacement}>
         <ViewToggle currentView={isKanbanView ? 'kanban' : 'list'} />
      </div>

      {/* ZONE BLANCHE CENTRALE */}
      {isError ? (
        <div className={styles.tasksContainer}>
          <p>Une erreur est survenue lors du chargement des tâches.</p>
        </div>
      ) : (
        <div className={styles.tasksContainer}>
          {/* On n'affiche cet en-tête que pour la vue liste (selon ta maquette) */}
          {!isKanbanView && (
             <div className={styles.tasksHeader}>
               <h2>Mes tâches assignées</h2>
               <p>Par ordre de priorité</p>
             </div>
          )}

          {/* RENDU CONDITIONNEL : LISTE OU KANBAN */}
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