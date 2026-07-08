'use client';

import { useState } from 'react';
import Modal from '@/components/ui/Modal';
import CreateTaskForm from './CreateTaskForm';

interface ProjectActionButtonsProps {
    projectId: string;
    btnClassName: string;
    iaBtnClassName: string;
}

export default function ProjectActionButtons({ projectId, btnClassName, iaBtnClassName }: ProjectActionButtonsProps) {
    const [activeModal, setActiveModal] = useState<'create_task' | null>(null);

    return (
        <>
            <button
                type="button"
                className={btnClassName}
                onClick={() => setActiveModal('create_task')}
            >
                Créer une tâche
            </button>

            <button type="button" className={iaBtnClassName}>
                 IA
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
        </>
    );
}