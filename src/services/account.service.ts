import { getAuthToken } from '@/app/actions/auth';
import { User } from '@/types/dashboard';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export interface UpdateAccountDTO {
  name: string;
  email: string;
  password?: string;
}

// Retrieves information about the logged-in user (GET)
export async function getAccountInfo(): Promise<User> {
  const token = await getAuthToken();
  if (!token) throw new Error("Utilisateur non authentifié.");

  try {
    const response = await fetch(`${API_URL}/auth/profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
      cache: 'no-store', 
    });

    if (!response.ok) {
       return { id: '', name: 'Erreur', email: '' } as User; 
    }

    return response.json();
  } catch {
    return { id: '', name: 'Erreur', email: '' } as User;
  }
}