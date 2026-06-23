import Image from 'next/image';
import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerLeft}>
        <Image 
          src="/images/logo-abricot.svg" 
          alt="Logo Abricot" 
          width={120} 
          height={35} 
          priority
        />
      </div>
      
      <nav className={styles.navigation}>
        <Link href="/dashboard" className={`${styles.navLink} ${styles.activeLink}`}>
          Tableau de bord
        </Link>
        <Link href="/dashboard/projects" className={styles.navLink}>
          Projets
        </Link>
      </nav>

      <div className={styles.headerRight}>
        <div className={styles.avatar}>AD</div>
      </div>
    </header>
  );
}