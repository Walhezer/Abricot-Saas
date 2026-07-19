'use client';

import { useState } from 'react';
import TaskToolbar from './TaskToolbar';
import TaskListItem from './TaskListItem';
import { AssignedTask, User } from '@/types/dashboard'; 

interface TaskSectionProps {
    tasks: AssignedTask[];
    currentUser: User;
}

/**
 * Client component that manages the primary list of tasks within a project.
 * Handles local state for filtering by status and searching by text.
 */
export default function TaskSection({ tasks, currentUser }: TaskSectionProps) {
    const [statusFilter, setStatusFilter] = useState('ALL');
    const [searchQuery, setSearchQuery] = useState('');
    const filteredTasks = tasks.filter((task) => {
        const matchesStatus = statusFilter === 'ALL' || task.status === statusFilter;
        const taskName = task.title || ''; 
        const matchesSearch = taskName.toLowerCase().includes(searchQuery.toLowerCase());
        
        return matchesStatus && matchesSearch;
    });

    return (
        <div style={{ marginTop: '24px' }}>
            <TaskToolbar 
                onFilterChange={(status) => setStatusFilter(status)} 
                onSearchChange={(query) => setSearchQuery(query)} 
            />
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '24px' }}>
                {filteredTasks.length > 0 ? (
                    filteredTasks.map((task) => (
                        <TaskListItem
                            key={task.id}
                            task={task}
                            currentUser={currentUser}
                        />
                    ))
                ) : (
                    <div style={{ textAlign: 'center', color: '#888', padding: '40px 0' }}>
                        Aucune tâche ne correspond à vos critères.
                    </div>
                )}
            </div>
        </div>
    );
}