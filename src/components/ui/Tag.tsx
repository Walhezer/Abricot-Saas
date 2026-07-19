import styles from './Tag.module.css';

interface TagProps {
    status: 'TODO' | 'IN_PROGRESS' | 'DONE' | 'ALL';
}

/**
 * Renders a visual status badge.
 * Dynamically maps the provided status string to its corresponding French label and CSS class.
 */
export default function Tag({ status }: TagProps) {
    const getTagConfig = () => {
        switch (status) {
            case 'TODO': 
                return { label: 'À faire', className: styles.tagTodo };
            case 'IN_PROGRESS': 
                return { label: 'En cours', className: styles.tagInProgress };
            case 'DONE': 
                return { label: 'Terminée', className: styles.tagDone };
            case 'ALL':
                return { label: 'Tous', className: styles.tagAll };
            default: 
                return { label: status, className: styles.tagDefault };
        }
    };

    const config = getTagConfig();

    return (
        <span className={`${styles.tagBase} ${config.className}`}>
            {config.label}
        </span>
    );
}