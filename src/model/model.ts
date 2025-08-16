export interface ListQuery {
  page: number;
  limit: number;
  status?: TaskStatus;
  title?: string; 
}

export type TaskStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: string; 
  updatedAt: string; 
}