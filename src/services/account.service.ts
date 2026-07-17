import { getAuthToken } from '@/app/actions/auth';
import { User } from '@/types/dashboard';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface UpdateAccountDTO {
  name: string;
  email: string;
  password?: string;
}

/**
 * Fetches the authenticated user's profile data.
 * Requires a valid HTTP-Only token.
 */
export async function getAccountInfo(): Promise<User> {
  const token = await getAuthToken();
  
  if (!token) {
      throw new Error("Utilisateur non authentifié.");
  }

  const response = await fetch(`${API_URL}/auth/profile`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` 
    },
    cache: 'no-store', 
  });

  if (!response.ok) {
    throw new Error(`Erreur lors de la récupération du profil (Statut: ${response.status})`);
  }

  return response.json();
}