import styles from './dashboard.module.css';

export default async function DashboardPage() {
  return (
    <div className={styles.pageWrapper}>
      {/* HEADER DE LA PAGE */}
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Tableau de bord</h1>
          <p className={styles.pageSubtitle}>
            Bonjour, voici un aperçu de vos projets et tâches
          </p>
        </div>
        <button className={styles.createProjectBtn}>+ Créer un projet</button>
      </div>

      {/* Le contenu du dashboard (tâches, etc.) sera ajouté ici plus tard */}
    </div>
  );
}