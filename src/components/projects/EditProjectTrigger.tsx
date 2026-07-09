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

export default function EditProjectTrigger({ projectId, projectData, className }: EditProjectTriggerProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <span
                className={className}
                onClick={() => setIsModalOpen(true)}
                style={{ cursor: 'pointer' }}
            >
                Modifier
            </span>
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