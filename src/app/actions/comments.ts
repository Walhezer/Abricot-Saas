'use server';

import { revalidatePath } from 'next/cache';
import { getAuthToken } from './auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export async function addComment(projectId: string, taskId: string, formData: FormData) {
  const content = formData.get('content');
  if (!content || typeof content !== 'string' || content.trim() === '') {
    throw new Error('Le commentaire ne peut pas être vide.');
  }

  const token = await getAuthToken();
  if (!token) {
    throw new Error('Non authentifié.');
  }

  try {
    const response = await fetch(`${API_URL}/projects/${projectId}/tasks/${taskId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ content }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Erreur lors de l\'ajout du commentaire.');
    }

    // Revalidate the project page after creating a new comment.
    revalidatePath(`/projects/${projectId}`);
    return { success: true, data };
  } catch (error) {
    return { success: false, message: error instanceof Error ? error.message : 'Une erreur inattendue est survenue.' };
  }
}