'use client';

import { useState } from 'react';
import Modal from '@/components/ui/Modal';
import CreateProjectForm from './CreateProjectForm';
interface CreateProjectButtonProps {
    buttonClassName: string;
}

export default function CreateProjectButton({ buttonClassName}: CreateProjectButtonProps) {
    const [activeModal, setActiveModal] = useState<'create_project' | null>(null);

    return (
        <>
            <button
                className={buttonClassName}
                onClick={() => setActiveModal('create_project')}
            >
                <span>+ Créer un projet</span>
            </button>

            <Modal
                isOpen={activeModal === 'create_project'}
                onClose={() => setActiveModal(null)}
                title="Créer un projet"
            >

                <CreateProjectForm
                    onClose={() => setActiveModal(null)}
                />
            </Modal>
        </>
    );
}