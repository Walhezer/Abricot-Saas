import Link from 'next/link';
import ListIcon from '@/components/ui/ListIcon';
import CalendarIcon from '@/components/ui/CalendarIcon';
import styles from './projectSingle.module.css';

interface ProjectPageProps {
  params: {
    id: string;
  };
}

export default function SingleProjectPage({ params }: ProjectPageProps) {
  const projectId = params.id;

  // Mock data for dynamic contributors rendering
  const projectContributors = [
    { id: '1', role: 'owner', initials: 'AD', name: 'Propriétaire' },
    { id: '2', role: 'member', initials: 'BD', name: 'Bertrand Dupont' },
    { id: '3', role: 'member', initials: 'AD', name: 'Anne Dupont' },
    { id: '4', role: 'member', initials: 'EE', name: 'Etienne Espin' },
  ];

  return (
    <div className={styles.pageWrapper}>

      {/* Main Header */}
      <div className={styles.topBar}>
        <Link href="/projects" className={styles.backBtn}>
          ←
        </Link>

        <div className={styles.projectHeaderContent}>
          <div className={styles.titleRow}>
            {/* For testing purposes, the ID is displayed dynamically next to the title */}
            <h1 className={styles.projectTitle}>Nom du projet ({projectId})</h1>
            <span className={styles.modifyLink}>Modifier</span>
          </div>
          <p className={styles.projectDescription}>
            Développement de la nouvelle version de l&apos;API REST avec authentification JWT
          </p>
        </div>

        <div className={styles.actionButtons}>
          <button className={styles.createTaskBtn}>Créer une tâche</button>
          <button className={styles.iaBtn}>IA</button>
        </div>
      </div>

      {/* Dynamic Contributors Bar */}
      <div className={styles.contributorsBar}>

        <div className={styles.contributorsLabel}>
          {/* Dynamically display the total number of contributors */}
          Contributeurs <span>{projectContributors.length} personnes</span>
        </div>

        <div className={styles.contributorsList}>
          {/* Map through the array to generate each contributor tag */}
          {projectContributors.map((contributor) => {
            const isOwner = contributor.role === 'owner';

            return (
              <div key={contributor.id} className={styles.contributorItem}>
                <div 
                  className={`${styles.avatarCircle} ${isOwner ? styles.ownerAvatar : styles.memberAvatar}`}
                >
                  {contributor.initials}
                </div>
                <div 
                  className={`${styles.rolePill} ${isOwner ? styles.ownerPill : styles.memberPill}`}
                >
                  {contributor.name}
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Tasks Area */}
      <div className={styles.tasksSection}>

        {/* Toolbar (Filters, Views, Search) */}
        <div className={styles.toolbar}>
          <div>
            <h2 style={{ fontSize: '18px', margin: '0 0 4px 0', color: '#1A1A1A' }}>Tâches</h2>
            <p style={{ fontSize: '13px', color: '#888', margin: '0' }}>Par ordre de priorité</p>
          </div>

          <div className={styles.toolbarRight}>
            {/* View selector */}
            <div className={styles.viewSelector}>
              <button className={`${styles.viewBtn} ${styles.viewBtnActive}`}>
                <ListIcon />
                <span>Liste</span>
              </button>
              <button className={styles.viewBtn}>
                <CalendarIcon />
                <span>Calendrier</span>
              </button>
            </div>

            {/* Filter by Status */}
            <button className={styles.filterSelect}>
              <span>Statut</span>
              <span style={{ fontSize: '10px' }}>▼</span>
            </button>

            {/* Search bar */}
            <div className={styles.searchContainer}>
              <input
                type="text"
                placeholder="Rechercher une tâche..."
                className={styles.searchInput}
              />
              <span className={styles.searchIcon}>🔍</span>
            </div>
          </div>
        </div>

        {/* Temporary container for the to-do list */}
        <div style={{ borderTop: '1px solid #F5F5F5', paddingTop: '24px' }}>
          <div style={{ color: '#888', textAlign: 'center', padding: '40px 0' }}>
            La liste des tâches (composant)
          </div>
        </div>
      </div>
      
    </div>
  );
}