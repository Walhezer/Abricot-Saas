'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { registerWithCredentials } from '@/services/auth.service';
import styles from './register.module.css';

export default function RegisterPage() {
  const router = useRouter();
  

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Appel à notre service d'inscription
      await registerWithCredentials(email, password);
      
      // Si tout se passe bien, on renvoie vers la page de connexion
      router.push('/login');
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
      
      {/* Côté Gauche : Le Formulaire */}
      <div className={styles.leftPanel}>
        <div className={styles.formWrapper}>
          
          <div className={styles.logoContainer}>
            <Image 
              src="/images/logo-abricot.svg" 
              alt="Logo Abricot" 
              width={250} 
              height={30} 
              priority
            />
          </div>

          <h1 className={styles.title}>Inscription</h1>
          
          {error && <div className={styles.errorAlert}>{error}</div>}

          <form onSubmit={handleSubmit} className={styles.form}>
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

      {/* Côté Droit : L'Image de couverture*/}
      <div className={styles.rightPanel}>
        <Image 
          src="/images/cover-register.jpg" 
          alt="Matériel de bureau bleu et orange" 
          fill 
          style={{ objectFit: 'cover' }}
          priority
        />
      </div>

    </div>
  );
}