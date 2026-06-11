import Button from '@/components/ui/Button';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Bienvenue sur Abricot</h1>
      
      <p className={styles.description}>
        Votre future application de gestion de projets, en construction avec Next.js 🚀
      </p>

      <div className={styles.buttonGroup}>
        <Button>Démarrer</Button>
        <Button variant="outline">En savoir plus</Button>
      </div>
    </main>
  );
}
