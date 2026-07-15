'use client';

import { useState } from 'react';
import { deleteProject } from '@/app/actions/projects'; 
import { useRouter } from 'next/navigation';
import Modal from '@/components/ui/Modal';
import CreateTaskForm from './CreateTaskForm';
import AITaskGenerator from './AITaskGenerator';
import SparklesIcon from '../ui/SparklesIcon';

interface ProjectActionButtonsProps {
    projectId: string;
    btnClassName: string;
    iaBtnClassName: string;
}

export default function ProjectActionButtons({ projectId, btnClassName, iaBtnClassName }: ProjectActionButtonsProps) {
    const router = useRouter(); 
    const [activeModal, setActiveModal] = useState<'create_task' | 'ai_task' | null>(null);

    const handleDelete = async () => {
        if (confirm("Es-tu sûr de vouloir supprimer ce projet ? Cette action est irréversible.")) {
            try {
                await deleteProject(projectId);
                router.push('/projects'); 
                router.refresh();
            } catch (error) {
                console.error("Erreur suppression :", error);
                alert("Erreur lors de la suppression du projet.");
            }
        }
    };

    return (
        <>
            <button
                type="button"
                className={btnClassName}
                onClick={() => setActiveModal('create_task')}
            >
                Créer une tâche
            </button>
            <button
                type="button"
                className={iaBtnClassName}
                onClick={() => setActiveModal('ai_task')}
            >
                <SparklesIcon /> IA
            </button>
            <button
                type="button"
                onClick={handleDelete}
                style={{ marginLeft: '10px', color: '#DC2626', cursor: 'pointer', background: 'none', border: 'none', textDecoration: 'underline' }}
            >
                Supprimer le projet
            </button>

            <Modal
                isOpen={activeModal === 'create_task'}
                onClose={() => setActiveModal(null)}
                title="Créer une tâche"
            >
                <CreateTaskForm
                    projectId={projectId}
                    onClose={() => setActiveModal(null)}
                />
            </Modal>
            <Modal
                isOpen={activeModal === 'ai_task'}
                onClose={() => setActiveModal(null)}
                title="Générer une tâche via IA"
            >
                <AITaskGenerator onClose={() => setActiveModal(null)} />
            </Modal>
        </>
    );
}