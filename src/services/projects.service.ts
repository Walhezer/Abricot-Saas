import { cookies } from 'next/headers';
import { Project } from '@/types/dashboard';
import { AssignedTask } from '@/types/dashboard';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

// Fetch all projects for the authenticated user
export async function getProjects(): Promise<Project[]> {
    const cookieStore = await cookies();
    const token = cookieStore.get('abricot_token')?.value;

    if (!token) {
        throw new Error('Utilisateur non authentifié');
    }

    try {
        const response = await fetch(`${API_URL}/projects`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            cache: 'no-store',
        });

        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des projets');
        }

        const json = await response.json();
        return json.data.projects || [];

    } catch (error) {
        console.error('API Error getProjects:', error);
        return [];
    }
}

// Filter projects to find a specific one by ID
export async function getProjectById(id: string): Promise<Project | null> {
  try {
    const projects = await getProjects();
    const project = projects.find((p) => p.id === id);
    
    return project || null;
  } catch (error) {
    console.error('Error filtering project by ID:', error);
    return null;
  }
}

// Fetch all tasks associated with a specific project
export async function getTasksByProjectId(id: string): Promise<AssignedTask[]> {
  const cookieStore = await cookies();
  const token = cookieStore.get('abricot_token')?.value;

  if (!token) {
    console.error('Utilisateur non authentifié');
    return [];
  }

  try {
    const response = await fetch(`${API_URL}/projects/${id}/tasks`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des tâches');
    }

    const json = await response.json();
    return json.data?.tasks || []; 
    
  } catch (error) {
    console.error('API Error getTasksByProjectId:', error);
    return [];
  }
}