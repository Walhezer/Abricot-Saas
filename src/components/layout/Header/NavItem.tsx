import Link from 'next/link';
import styles from './Header.module.css';

interface NavItemProps {
    href: string;
    label: string;
    isActive: boolean;
    icon: React.ReactNode;
}

/**
 * Renders a reusable navigation link component.
 * Automatically handles active and inactive visual states.
 */
export default function NavItem({ href, label, isActive, icon }: NavItemProps) {
    return (
        <Link  href={href}  className={`${styles.navButton} ${isActive ? styles.activeBtn : styles.inactiveBtn}`} >
            <span className={styles.iconWrapper}>{icon}</span>
            {label}
        </Link>
    );
}