import { create } from 'zustand';
import { Task, Priority, Status } from '../types/task';
import { generateId } from '../lib/utils';

interface TaskState {
  tasks: Task[];
  searchQuery: string;
  filterPriority: Priority | 'all';
  filterStatus: Status | 'all';
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  setSearchQuery: (query: string) => void;
  setFilterPriority: (priority: Priority | 'all') => void;
  setFilterStatus: (status: Status | 'all') => void;
  reorderTasks: (tasks: Task[]) => void;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  searchQuery: '',
  filterPriority: 'all',
  filterStatus: 'all',
  
  addTask: (task) =>
    set((state) => ({
      tasks: [
        ...state.tasks,
        {
          ...task,
          id: generateId(),
          createdAt: new Date().toISOString(),
        },
      ],
    })),
    
  updateTask: (id, updatedTask) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, ...updatedTask } : task
      ),
    })),
    
  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),
    
  setSearchQuery: (query) => set({ searchQuery: query }),
  setFilterPriority: (priority) => set({ filterPriority: priority }),
  setFilterStatus: (status) => set({ filterStatus: status }),
  reorderTasks: (tasks) => set({ tasks }),
}));