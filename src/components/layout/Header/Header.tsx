'use client'; 

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';
import DashboardIcon from '@/components/ui/DashboardIcon'; // Ajuste le chemin
import FolderIcon from '@/components/ui/FolderIcon';       // Ajuste le chemin

export default function Header() {
  const pathname = usePathname(); 

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
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
          <Link 
            href="/dashboard" 
            className={`${styles.navLink} ${pathname === '/dashboard' ? styles.activeLink : ''}`}
          >
            <DashboardIcon />
            <span>Tableau de bord</span>
          </Link>
          
          <Link 
            href="/projects" 
            className={`${styles.navLink} ${pathname.startsWith('/projects') ? styles.activeLink : ''}`}
          >
            <FolderIcon />
            <span>Projets</span>
          </Link>
        </nav>

        <div className={styles.headerRight}>
          <div className={styles.avatar}>AD</div>
        </div>
      </div>
    </header>
  );
}