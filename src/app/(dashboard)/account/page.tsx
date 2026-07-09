'use client';

import { useState, useEffect } from 'react';
import styles from './account.module.css';
import { updateAccountInfo } from '@/app/actions/account';
import { getAccountInfo } from '@/services/account.service';

export default function AccountPage() {
  // Initialize form states
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // UI states
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch user data on mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await getAccountInfo();
        
        // Safely cast response to avoid 'any' type errors
        const rawData = user as unknown as Record<string, unknown>;

        // Handle flat API response
        if (rawData && typeof rawData.name === 'string') {
          const nameParts = rawData.name.split(' ');
          setFirstName(nameParts[0] || '');
          setLastName(nameParts.slice(1).join(' ') || '');
          setEmail(typeof rawData.email === 'string' ? rawData.email : '');
        } else {
          // Handle nested API response structures (.data or .user)
          const dataNode = rawData?.data as Record<string, unknown> | undefined;
          const userNode = rawData?.user as Record<string, unknown> | undefined;
          
          const nestedUser = dataNode?.user as Record<string, unknown> | undefined 
            || userNode 
            || dataNode;
          
          if (nestedUser && typeof nestedUser.name === 'string') {
            const nameParts = nestedUser.name.split(' ');
            setFirstName(nameParts[0] || '');
            setLastName(nameParts.slice(1).join(' ') || '');
            setEmail(typeof nestedUser.email === 'string' ? nestedUser.email : '');
          } else {
            setError("Structure de données utilisateur inconnue.");
          }
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message || 'Erreur lors du chargement des données');
        } else {
          setError(String(err) || 'Erreur lors du chargement des données');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      // Reconstruct full name for the API payload
      const fullName = `${firstName} ${lastName}`.trim();
      
      await updateAccountInfo({
        name: fullName,
        email,
        password: password ? password : undefined 
      });

      setSuccess("Vos informations ont été mises à jour !");
      setPassword(''); // Clear password field for security
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Erreur lors de la mise à jour');
      } else {
        setError(String(err) || 'Erreur lors de la mise à jour');
      }
    }
  };

  // Render loading state
  if (isLoading) {
    return (
      <div className={styles.pageWrapper}>
        <div className={styles.card} style={{ textAlign: 'center' }}>
          Chargement de vos informations...
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Mon compte</h1>
          <p className={styles.subtitle}>{firstName} {lastName}</p>
        </div>

        {error && <div style={{ color: '#DC2626', marginBottom: '16px', fontSize: '14px' }}>{error}</div>}
        {success && <div style={{ color: '#16A34A', marginBottom: '16px', fontSize: '14px' }}>{success}</div>}

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
              placeholder="Laisser vide pour ne pas modifier"
            />
          </div>

          <button type="submit" className={styles.submitBtn}>
            Modifier les informations
          </button>
          
        </form>
      </div>
    </div>
  );
}