'use server';

import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export async function setAuthToken(token: string) {
  const cookieStore = await cookies();
  
  cookieStore.set('abricot_token', token, {
    httpOnly: true, 
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24, 
    path: '/',
  });
}
// To retrieve the token and include it in your API requests
export async function getAuthToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get('abricot_token');
  return token?.value;
}

// To handle user logout
export async function removeAuthToken() {
  const cookieStore = await cookies();
  cookieStore.delete('abricot_token');
}

export async function loginWithCredentials(email: string, password: string) {
  try {
      const response = await fetch(`${API_URL}/auth/login`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
          throw new Error(data.message || 'Identifiants incorrects');
      }

      // If the connection is successful and a token is returned, we store it in a cookie
      if (data.success && data.data?.token) {
        await setAuthToken(data.data.token);
      }

      return data;
  } catch (error) {
      if (error instanceof Error) {
          throw new Error(error.message);
      }
      throw new Error('Une erreur inattendue est survenue');
  }
}

export async function registerWithCredentials(email: string, password: string) {
  try {
      const response = await fetch(`${API_URL}/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
          throw new Error(data.message || "Une erreur est survenue lors de l'inscription");
      }

      return data;
  } catch (error) {
      if (error instanceof Error) {
          throw new Error(error.message);
      }
      throw new Error('Une erreur inattendue est survenue');
  }
}