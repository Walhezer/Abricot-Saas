import Link from 'next/link';
import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <div className={styles.pageWrapper}>
      <Header />
      
      <main className={styles.mainContent}>
        <h1 className={styles.title}>404</h1>
        <h2 className={styles.subtitle}>Oups ! La page est introuvable.</h2>
        <p className={styles.text}>Il semble que vous vous soyez égaré dans l&apos;application L&apos;abricot.</p>
        
        <Link href="/dashboard" className={styles.link}>
          Retourner au tableau de bord
        </Link>
      </main>

      <Footer />
    </div>
  );
}