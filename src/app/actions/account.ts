'use server';

import { getAuthToken } from '@/app/actions/auth'; 
import { User } from '@/types/dashboard';
import { UpdateAccountDTO } from '@/services/account.service';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

/**
 * Server action to update the authenticated user's profile information.
 * Requires a valid HTTP-Only authorization token.
 */
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

/**
 * Server action to change the authenticated user's password.
 * Validates the current password before applying the new one.
 */
export async function updateUserPassword(data: { currentPassword: string, newPassword: string }) {
  const token = await getAuthToken();
  
  if (!token) {
    throw new Error("Utilisateur non authentifié.");
  }

  const response = await fetch(`${API_URL}/auth/password`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || "Erreur lors de la mise à jour du mot de passe.");
  }

  return response.json();
}