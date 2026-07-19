import { Metadata } from 'next';
import { getAccountInfo } from '@/services/account.service';
import AccountForm from '@/components/account/AccountForm';
import styles from './account.module.css';

export const metadata: Metadata = {
  title: 'Mon compte',
};

/**
 * Server component that renders the account management page.
 * Fetches the user profile and formats the data for the client-side form.
 */
export default async function AccountPage() {
  const initialData = {
    firstName: '',
    lastName: '',
    email: ''
  };

  try {
    const user = await getAccountInfo();
    const rawData = user as unknown as Record<string, unknown>;

    if (rawData && typeof rawData.name === 'string') {
      const nameParts = rawData.name.split(' ');
      initialData.firstName = nameParts[0] || '';
      initialData.lastName = nameParts.slice(1).join(' ') || '';
      initialData.email = typeof rawData.email === 'string' ? rawData.email : '';
    } else {
      const dataNode = rawData?.data as Record<string, unknown> | undefined;
      const userNode = rawData?.user as Record<string, unknown> | undefined;
      
      const nestedUser = dataNode?.user as Record<string, unknown> | undefined 
        || userNode 
        || dataNode;
      
      if (nestedUser && typeof nestedUser.name === 'string') {
        const nameParts = nestedUser.name.split(' ');
        initialData.firstName = nameParts[0] || '';
        initialData.lastName = nameParts.slice(1).join(' ') || '';
        initialData.email = typeof nestedUser.email === 'string' ? nestedUser.email : '';
      }
    }
  } catch (err) {
    console.error("Erreur API :", err);
  }

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.card}>
        <AccountForm initialData={initialData} />
      </div>
    </div>
  );
}