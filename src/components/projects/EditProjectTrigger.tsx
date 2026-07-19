'use client';

import { useState } from 'react';
import EditProjectForm from './EditProjectForm';
import Modal from '@/components/ui/Modal';

interface EditProjectTriggerProps {
    projectId: string;
    projectData: {
        title: string;
        description: string;
        contributors: string;
    };
    className: string;
}

/**
 * Renders a trigger button that opens the project editing modal.
 * Manages the visibility state of the underlying modal component.
 */
export default function EditProjectTrigger({ projectId, projectData, className }: EditProjectTriggerProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <button
                type="button"
                className={className}
                onClick={() => setIsModalOpen(true)}
            >
                Modifier
            </button>
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Modifier un projet"
            >
                <EditProjectForm
                    projectId={projectId}
                    initialData={projectData}
                    onClose={() => setIsModalOpen(false)}
                />
            </Modal>
        </>
    );
}