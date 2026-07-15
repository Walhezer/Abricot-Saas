'use server';

import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export interface CreateTaskData {
  title: string;
  description: string;
  dueDate: string;
  projectId: string;
  assigneeIds?: string[];
}

export async function updateTask(projectId: string, taskId: string, updateData: Record<string, unknown>) {
  const cookieStore = await cookies();
  const token = cookieStore.get('abricot_token')?.value;

  if (!token) {
    throw new Error('Utilisateur non authentifié');
  }

  try {
    const response = await fetch(`${API_URL}/projects/${projectId}/tasks/${taskId}`, {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(updateData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Erreur lors de la mise à jour de la tâche');
    }

    return await response.json();
    
  } catch (error) {
    console.error('API Error updateTask:', error);
    throw error;
  }
}

export async function createTask(data: CreateTaskData) {
  const cookieStore = await cookies();
  const token = cookieStore.get('abricot_token')?.value;

  if (!token) throw new Error('Utilisateur non authentifié');

  try {
    const response = await fetch(`${API_URL}/projects/${data.projectId}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        title: data.title,
        description: data.description,
        dueDate: data.dueDate,
        assigneeIds: data.assigneeIds
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Erreur lors de la création de la tâche');
    }

    return await response.json();
  } catch (error) {
    console.error('API Error createTask:', error);
    throw error;
  }
}