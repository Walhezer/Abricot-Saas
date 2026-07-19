'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';
import DashboardIcon from '@/components/ui/DashboardIcon';
import FolderIcon from '@/components/ui/FolderIcon';
import LogoAbricot from '@/components/ui/LogoAbricot';

const getInitials = (name: string) => {
  if (!name) return 'AM';
  const parts = name.trim().split(' ');
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

interface HeaderProps {
  userName?: string;
}

/**
 * Renders the main application header.
 * Provides primary navigation links and displays a dynamic user avatar.
 */
export default function Header({ userName = 'Alice Martin' }: HeaderProps) {
  const pathname = usePathname();
  const isAccountPage = pathname === '/account';
  const initials = getInitials(userName);

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
              {initials}
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}