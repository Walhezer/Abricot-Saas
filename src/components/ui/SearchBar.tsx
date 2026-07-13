import SearchIcon from '@/components/ui/SearchIcon';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  placeholder?: string; 
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchBar({ 
  placeholder = "Rechercher une tâche...", 
  value, 
  onChange 
}: SearchBarProps) {
  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        placeholder={placeholder}
        aria-label={placeholder}
        value={value}
        onChange={onChange}
        className={styles.searchInput}
      />
      <span className={styles.searchIcon}>
        <SearchIcon />
      </span>
    </div>
  );
}