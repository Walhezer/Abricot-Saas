'use client';

import { useState } from 'react';
import { Member } from '@/types/dashboard';
import Modal from '@/components/ui/Modal';
import CreateTaskForm from './CreateTaskForm';
import AITaskGenerator from './AITaskGenerator';
import SparklesIcon from '../ui/SparklesIcon';

interface ProjectActionButtonsProps {
    projectId: string;
    btnClassName: string;
    iaBtnClassName: string;
    members: Member[];
}

export default function ProjectActionButtons({ projectId, btnClassName, iaBtnClassName, members }: ProjectActionButtonsProps) {
    const [activeModal, setActiveModal] = useState<'create_task' | 'ai_task' | null>(null);

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

            <Modal
                isOpen={activeModal === 'create_task'}
                onClose={() => setActiveModal(null)}
                title="Créer une tâche"
            >
                <CreateTaskForm
                    projectId={projectId}
                    onClose={() => setActiveModal(null)}
                    members={members}
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