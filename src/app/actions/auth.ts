'use server';

import { cookies } from 'next/headers';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

/**
 * Stores the JWT token in an HTTP-Only cookie to secure the user session.
 */
export async function setAuthToken(token: string) {
    const cookieStore = await cookies();

    cookieStore.set('abricot_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24,
        path: '/',
    });
}

/**
 * Retrieves the HTTP-Only token from cookies.
 * Used for authenticated server-side API requests.
 */
export async function getAuthToken() {
    const cookieStore = await cookies();
    return cookieStore.get('abricot_token')?.value;
}

/**
 * Registers a new user and automatically logs them in upon success.
 */
export async function registerWithCredentials(email: string, password: string, name: string) {
    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, name }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "An error occurred during registration");
        }

        if (data.success && data.data?.token) {
            await setAuthToken(data.data.token);
        }

        return data;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error('An unexpected error occurred');
    }
}

/**
 * Authenticates a user and establishes a secure HTTP-Only session.
 */
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

        if (data.success && data.data?.token) {
            await setAuthToken(data.data.token);
        }

        return data;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error('An unexpected error occurred during login');
    }
}

/**
 * Logs out the user by deleting the HTTP-Only authentication cookie.
 */
export async function removeAuthToken() {
    const cookieStore = await cookies();
    cookieStore.delete('abricot_token');
}