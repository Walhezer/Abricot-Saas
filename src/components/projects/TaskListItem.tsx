'use client';

import { useState } from 'react';
import styles from './TaskListItem.module.css';
import CalendarIcon from '@/components/ui/CalendarIcon';
import { AssignedTask, User } from '@/types/dashboard';
import { getInitials } from '@/utils/string';

interface TaskListItemProps {
    task: AssignedTask;
    currentUser: User;
}

export default function TaskListItem({ task }: TaskListItemProps) {
    // State for managing the opening and closing of the accordion
    const [isExpanded, setIsExpanded] = useState(false);

    // Utility for setting the color and text of the status badge
    const getStatusDisplay = (status: string) => {
        switch (status) {
            case 'TODO': return { label: 'À faire', className: styles.statusTodo };
            case 'IN_PROGRESS': return { label: 'En cours', className: styles.statusInProgress };
            case 'DONE': return { label: 'Terminée', className: styles.statusDone };
            default: return { label: status, className: styles.statusDefault };
        }
    };

    const statusData = getStatusDisplay(task.status);

    // Date format (e.g., “March 9”)
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long'
        });
    };

    // Date and time format for comments (e.g., “March 23, 11:20”)
    const formatDateTime = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            hour: '2-digit',
            minute: '2-digit'
        }).replace(' à', ',');
    };

    return (
        <div className={styles.taskCard}>

            {/* Top of the map (Always visible) */}
            <div className={styles.cardMain}>
                <div className={styles.header}>
                    <div className={styles.titleArea}>
                        <h3 className={styles.title}>{task.title}</h3>
                        <span className={`${styles.statusBadge} ${statusData.className}`}>
                            {statusData.label}
                        </span>
                    </div>
                    <button className={styles.moreBtn}>•••</button>
                </div>

                <p className={styles.description}>{task.description}</p>

                <div className={styles.metaData}>
                    <div className={styles.dueDate}>
                        <span className={styles.metaLabel}>Échéance : </span>
                        <CalendarIcon />
                        <span className={styles.metaValue}>{formatDate(task.dueDate)}</span>
                    </div>

                    <div className={styles.assignees}>
                        <span className={styles.metaLabel}>Assigné à :</span>
                        <div className={styles.assigneeList}>
                            {task.assignees?.map((assignee) => (
                                <div key={assignee.id} className={styles.assigneePill}>
                                    <div className={styles.avatar}>{getInitials(assignee.user.name)}</div>
                                    <span className={styles.name}>{assignee.user.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Accordion Button */}
            <button
                className={styles.toggleBtn}
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <span>Commentaires ({task.comments?.length || 0})</span>
                <span className={styles.chevron}>
                    {isExpanded ? '⌃' : '⌄'}
                </span>
            </button>

            {/* Comments Section (Visible when clicked)  */}
            {isExpanded && (
                <div className={styles.commentsSection}>

                    {/* List of Comments  */}
                    {task.comments?.map((comment) => (
                        <div key={comment.id} className={styles.commentItem}>
                            <div className={styles.commentAvatar}>{getInitials(comment.author.name)}</div>
                            <div className={styles.commentContent}>
                                <div className={styles.commentHeader}>
                                    <span className={styles.commentAuthor}>{comment.author.name}</span>
                                    <span className={styles.commentDate}>{formatDateTime(comment.createdAt)}</span>
                                </div>
                                <div className={styles.commentBubble}>
                                    <p className={styles.commentText}>{comment.content}</p>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Field for entering a new comment */}
                    <div className={styles.addCommentArea}>
                        <div className={styles.commentAvatar}>
                           BE
                        </div>
                        <div className={styles.inputWrapper}>
                            <input
                                type="text"
                                placeholder="Ajouter un commentaire..."
                                className={styles.commentInput}
                            />
                            <div className={styles.submitRow}>
                                <button className={styles.submitBtn}>Envoyer</button>
                            </div>
                        </div>
                    </div>

                </div>
            )}
        </div>
    );
}