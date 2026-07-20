'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { registerWithCredentials } from '@/app/actions/auth';
import styles from './register.module.css';

/**
 * Renders the registration page.
 * Captures user input, merges the first and last name, and handles the signup flow.
 */
export default function RegisterPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Handles form submission, triggers the server action, and redirects on success.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const fullName = `${firstName} ${lastName}`.trim();
      await registerWithCredentials(email, password, fullName);
      router.push('/dashboard');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Impossible de créer le compte.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.splitContainer}>
      <div className={styles.leftPanel}>
        <div className={styles.formWrapper}>

          <div className={styles.logoContainer}>
            <Image
              src="/images/logo-abricot.svg"
              alt="Logo de l'application L'abricot" 
              width={250}
              height={30}
              priority
            />
          </div>

          <h1 className={styles.title}>Inscription</h1>

          {error && <div className={styles.errorAlert}>{error}</div>}

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label htmlFor="firstName">Prénom</label>
              <input
                id="firstName"
                type="text"
                className={styles.inputField}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="lastName">Nom</label>
              <input
                id="lastName"
                type="text"
                className={styles.inputField}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                className={styles.inputField}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="password">Mot de passe</label>
              <input
                id="password"
                type="password"
                className={styles.inputField}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '4px', display: 'block' }}>
                * Le mot de passe doit contenir au moins 8 caractères, dont une majuscule et un chiffre.
              </span>
            </div>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={isLoading}
            >
              {isLoading ? "Création en cours..." : "S'inscrire"}
            </button>
          </form>

          <div className={styles.loginPrompt}>
            Déjà inscrit ? <Link href="/login">Se connecter</Link>
          </div>

        </div>
      </div>

      <div className={styles.rightPanel}>
        <Image
          src="/images/cover-register.jpg"
          alt="" 
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      </div>

    </div>
  );
}