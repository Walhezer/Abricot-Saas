import { cookies } from 'next/headers';
import { Project, AssignedTask } from '@/types/dashboard';

const API_URL = 'http://localhost:8000'; 

export async function getDashboardProjects(): Promise<Project[]> {
  const cookieStore = await cookies();
  const token = cookieStore.get('abricot_token')?.value;

  const response = await fetch(`${API_URL}/dashboard/projects-with-tasks`, {
    headers: { 'Authorization': `Bearer ${token}` },
    cache: 'no-store',
  });

  if (!response.ok) throw new Error('Erreur lors de la récupération des projets');
  const json = await response.json();
  return json.data.projects;
}

export async function getAssignedTasks(): Promise<AssignedTask[]> {
  const cookieStore = await cookies();
  const token = cookieStore.get('abricot_token')?.value;

  if (!token) {
    throw new Error('Utilisateur non authentifié');
  }

  const response = await fetch(`${API_URL}/dashboard/assigned-tasks`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des tâches assignées');
  }

  const json = await response.json();
  return json.data.tasks; 
}