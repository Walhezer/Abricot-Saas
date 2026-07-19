import Header from '@/components/layout/Header/Header';
import Footer from '@/components/layout/Footer/Footer';
import styles from './dashboard/dashboard.module.css';
import { getAccountInfo } from '@/services/account.service';

interface AuthResponse {
  data?: {
    user?: {
      id?: string;
      email?: string;
      name?: string;
    };
  };
  name?: string; 
}

/**
 * Renders the layout wrapper for the dashboard and private routes.
 * Fetches the authenticated user's data to populate the Header dynamically.
 */
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  const response = await getAccountInfo().catch(() => null) as AuthResponse | null;
  const userName = response?.data?.user?.name || response?.name;

  return (
    <div className={styles.dashboardContainer}>
      <Header userName={userName} />
      
      <main className={styles.mainContent}>
        {children}
      </main>
      <Footer />
    </div>
  );
}