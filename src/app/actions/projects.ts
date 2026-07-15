'use server';

import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export interface UpdateProjectData {
  title?: string;
  description?: string;
  contributors?: string[];
}

export interface CreateProjectData {
  title: string;
  description: string;
  contributors?: string[];
}

// Updating an Existing Project 
export async function updateProject(projectId: string, updateData: UpdateProjectData) {
  const cookieStore = await cookies();
  const token = cookieStore.get('abricot_token')?.value;

  if (!token) {
    throw new Error('Utilisateur non authentifié');
  }

  try {
    const response = await fetch(`${API_URL}/projects/${projectId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(updateData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Erreur lors de la mise à jour du projet');
    }

    return await response.json();

  } catch (error) {
    console.error('API Error updateProject:', error);
    throw error;
  }
}

// Creating a New Project
export async function createProject(data: CreateProjectData) {
  const cookieStore = await cookies();
  const token = cookieStore.get('abricot_token')?.value;

  if (!token) throw new Error('Utilisateur non authentifié');

  const response = await fetch(`${API_URL}/projects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      name: data.title,
      description: data.description,
      contributors: data.contributors
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Erreur lors de la création du projet');
  }

  return await response.json();
}
