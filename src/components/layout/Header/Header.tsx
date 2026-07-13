'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';
import DashboardIcon from '@/components/ui/DashboardIcon';
import FolderIcon from '@/components/ui/FolderIcon';
import LogoAbricot from '@/components/ui/LogoAbricot';

export default function Header() {
  const pathname = usePathname();
  const isAccountPage = pathname === '/account';

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.headerLeft}>
            <LogoAbricot className={styles.logo} />
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
          <Link href="/account" style={{ textDecoration: 'none' }} aria-label="Accéder à mon profil">
            <div className={`${styles.avatar} ${isAccountPage ? styles.avatarOrange : ''}`}>
              AD
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}