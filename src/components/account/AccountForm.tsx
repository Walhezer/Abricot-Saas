'use client';

import { useState } from 'react';
import styles from './AccountForm.module.css';
import { updateAccountInfo } from '@/app/actions/account';

interface InitialAccountData {
    lastName?: string;
    firstName?: string;
    email?: string;
}

interface AccountFormProps {
    initialData: InitialAccountData;
}

export default function AccountForm({ initialData }: AccountFormProps) {
    const [lastName, setLastName] = useState(initialData.lastName ?? '');
    const [firstName, setFirstName] = useState(initialData.firstName ?? '');
    const [email, setEmail] = useState(initialData.email ?? '');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setIsSubmitting(true);
        try {
            await updateAccountInfo({
                name: `${firstName} ${lastName}`.trim(),
                email,
                password: password ? password : undefined
            });
            setSuccess("Vos informations ont été mises à jour !");
            setPassword('');
        } catch (err: unknown) {
            let message = 'Erreur lors de la mise à jour';
            if (err instanceof Error && typeof err.message === 'string') {
                message = err.message;
            } else if (typeof err === 'string') {
                message = err;
            }
            setError(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            {/* Le header reste ici pour que le prénom/nom se mettent à jour en temps réel */}
            <div className={styles.header}>
                <h1 className={styles.title}>Mon compte</h1>
                <p className={styles.subtitle}>{firstName} {lastName}</p>
            </div>

            {error && <div role="alert" style={{ color: '#DC2626', marginBottom: '16px', fontSize: '14px' }}>{error}</div>}
            {success && <div role="alert" style={{ color: '#16A34A', marginBottom: '16px', fontSize: '14px' }}>{success}</div>}

            <form className={styles.form} onSubmit={handleSubmit}>

                <div className={styles.formGroup}>
                    <label htmlFor="lastName">Nom</label>
                    <input
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className={styles.input}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="firstName">Prénom</label>
                    <input
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className={styles.input}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={styles.input}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="password">Nouveau mot de passe</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={styles.input}
                        placeholder="••••••••••"
                    />
                </div>

                <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                    {isSubmitting ? 'Modification en cours...' : 'Modifier les informations'}
                </button>

            </form>
        </>
    );
}