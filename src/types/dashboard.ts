/**
 * Represents a standard system user.
 */
export interface User {
  id: string;
  email: string;
  name: string;
}

/**
 * Represents a user's membership and specific role within a project.
 */
export interface Member {
  id: string;
  role: string;
  userId: string;
  user: User;
}

/**
 * Lightweight project representation for nested relations to minimize payload size.
 */
export interface ProjectShort {
  id: string;
  name: string;
  description: string;
}

/**
 * Links a user to a specific task assignment.
 */
export interface Assignee {
  id: string;
  assignedAt: string;
  taskId: string;
  userId: string;
  user: User;
}

/**
 * Represents a user-generated comment on a task.
 */
export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  taskId: string;
  authorId: string;
  author: User;
}

/**
 * Comprehensive task entity including nested relations (project, assignees, comments).
 */
export interface AssignedTask {
  id: string;
  title: string;
  description: string;
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  projectId: string;
  creatorId: string;
  project: ProjectShort;
  assignees: Assignee[];
  comments: Comment[];
}

/**
 * Standardized API response format for task-related queries.
 */
export interface AssignedTasksResponse {
  success: boolean;
  message: string;
  data: {
    tasks: AssignedTask[];
  };
}

/**
 * Detailed project entity including statistical counts and member relations.
 */
export interface Project {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  ownerId: string;
  owner: User;
  members: Member[];
  _count: {
    tasks: number;
  };
  userRole: string;
}