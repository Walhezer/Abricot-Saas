import Header from '@/components/layout/Header/Header';
// Attention au chemin d'import du CSS qui descend d'un niveau maintenant :
import styles from './dashboard/dashboard.module.css';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.dashboardContainer}>
      <Header />
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
}