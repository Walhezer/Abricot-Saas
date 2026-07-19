import Image from 'next/image';
import styles from './Footer.module.css';

/**
 * Renders the global footer component.
 * Displays the application logo and a dynamic copyright year.
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        
        <div className={styles.logoContainer}>
          <Image
            src="/images/logo-footer.svg"
            alt="Logo L'abricot"
            width={120}
            height={24}
            priority={false}
          />
        </div>

        <div className={styles.copyright}>
          Abricot {currentYear}
        </div>

      </div>
    </footer>
  );
}