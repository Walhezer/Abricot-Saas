'use server';

import { cookies } from 'next/headers';

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