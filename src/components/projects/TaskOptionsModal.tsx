import Modal from '@/components/ui/Modal';
import TrashIcon from '@/components/ui/TrashIcon';
import EditIcon from '@/components/ui/EditIcon';
import styles from './TaskOptionsModal.module.css';
import { AssignedTask } from '@/types/dashboard';

interface TaskOptionsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onEdit: () => void;
    task: AssignedTask;
}

export default function TaskOptionsModal({
    isOpen,
    onClose,
    onEdit,
    task
}: TaskOptionsModalProps) {

    return (
        <Modal isOpen={isOpen} onClose={onClose} variant="compact">
            <div className={styles.optionsModalContent}>
                <h3 className={styles.optionsTitle}>{task.title}</h3>
                <p className={styles.optionsDescription}>{task.description}</p>

                <div className={styles.optionsActions}>
                    <button className={styles.deleteAction} onClick={() => {
                        console.log("Supprimer la tâche :", task.id);
                    }}>
                        <TrashIcon />
                        Supprimer
                    </button>

                    <span className={styles.actionDivider}>|</span>

                    <button className={styles.editAction} onClick={() => {
                        onClose();
                        onEdit();
                    }}>
                        <EditIcon />
                        Modifier
                    </button>
                </div>
            </div>
        </Modal>
    );
}