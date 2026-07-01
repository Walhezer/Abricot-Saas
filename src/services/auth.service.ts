const API_URL = '/api';

export async function registerWithCredentials(email: string, password: string) {
    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, password }),
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

        return data;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error('Une erreur inattendue est survenue');
    }
}