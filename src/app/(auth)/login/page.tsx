'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { loginWithCredentials } from '@/app/actions/auth';
import styles from './login.module.css';


export default function LoginPage() {
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
      const res = await loginWithCredentials(email, password);
      
      if (res.success) {
        router.push('/dashboard');
      } else {
        setError(res.message || 'Identifiants invalides.');
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Impossible de se connecter au serveur.');
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
          
          {/* Logo */}
          <div className={styles.logoContainer}>
            <Image 
              src="/images/logo-abricot.svg"
              alt="Logo Abricot" 
              width={250} 
              height={30} 
              priority
            />
          </div>

          <h1 className={styles.title}>Connexion</h1>
          
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
              {isLoading ? '...' : 'Se connecter'}
            </button>
          </form>

          {/* Liens secondaires */}
          <div className={styles.forgotPassword}>
            <Link href="#">Mot de passe oublié ?</Link>
          </div>

          <div className={styles.signupPrompt}>
            Pas encore de compte ? <Link href="/register">Créer un compte</Link>
          </div>

        </div>
      </div>
      <div className={styles.rightPanel}>
        <Image 
          src="/images/cover-login.jpg"
          alt="Bureau avec clavier et mètre" 
          fill 
          style={{ objectFit: 'cover' }}
          priority
        />
      </div>

    </div>
  );
}