'use client';

import { useRouter } from 'next/navigation'; // Ajoute ceci
import { deleteTask } from '@/app/actions/tasks'; // Ajoute ceci
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
    projectId: string; 
}

export default function TaskOptionsModal({
    isOpen,
    onClose,
    onEdit,
    task,
    projectId 
}: TaskOptionsModalProps) {
    
    const router = useRouter(); 
    const handleDelete = async () => {
        if (confirm("Êtes-vous sûr de vouloir supprimer cette tâche ?")) {
            try {
                await deleteTask(projectId, task.id);
                router.refresh(); 
                onClose(); 
            } catch (error) {
                console.error("Erreur suppression :", error);
                alert("Une erreur est survenue lors de la suppression.");
            }
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} variant="compact">
            <div className={styles.optionsModalContent}>
                <h3 className={styles.optionsTitle}>{task.title}</h3>
                <p className={styles.optionsDescription}>{task.description}</p>

                <div className={styles.optionsActions}>
                    <button className={styles.deleteAction} onClick={handleDelete}>
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