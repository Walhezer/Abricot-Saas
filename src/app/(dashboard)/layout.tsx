import Header from '@/components/layout/Header/Header';
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