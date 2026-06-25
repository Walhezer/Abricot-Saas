import { AssignedTask } from '@/types/dashboard';

interface KanbanViewProps {
  tasks: AssignedTask[];
}

export default function KanbanView({ tasks }: KanbanViewProps) {
  return (
    <div>Vue Kanban - {tasks.length} tâches à afficher ici.</div>
  );
}