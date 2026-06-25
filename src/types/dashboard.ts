export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Member {
  id: string;
  role: string;
  userId: string;
  user: User;
}

export interface ProjectShort {
  id: string;
  name: string;
  description: string;
}

export interface Assignee {
  id: string;
  assignedAt: string;
  taskId: string;
  userId: string;
  user: User;
}

export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  taskId: string;
  authorId: string;
  author: User;
}

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

export interface AssignedTasksResponse {
  success: boolean;
  message: string;
  data: {
    tasks: AssignedTask[];
  };
}

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