import { getAuthToken } from '@/app/actions/auth'; 
import { User } from '../types/dashboard';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export interface UpdateAccountDTO {
  name: string;
  email: string;
  password?: string;
}

// Retrieves information about the logged-in user
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
    throw new Error("Erreur lors de la récupération des données du compte.");
  }

  return response.json();
}

// Updates the user's information
export async function updateAccountInfo(data: UpdateAccountDTO): Promise<User> {
  const token = await getAuthToken();

  if (!token) {
    throw new Error("Utilisateur non authentifié.");
  }

const response = await fetch(`${API_URL}/auth/profile`, {
    method: 'PUT', 
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || "Erreur lors de la mise à jour des informations.");
  }

  return response.json();
}