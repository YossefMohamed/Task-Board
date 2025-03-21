import { create } from 'zustand';
import { Task, Priority, Status } from '../types/task';
import { supabase } from '../lib/supabase';

interface TaskState {
  tasks: Task[];
  searchQuery: string;
  filterPriority: Priority | 'all';
  filterStatus: Status | 'all';
  fetchTasks: () => Promise<void>;
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => Promise<void>;
  updateTask: (id: string, task: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  setSearchQuery: (query: string) => void;
  setFilterPriority: (priority: Priority | 'all') => void;
  setFilterStatus: (status: Status | 'all') => void;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  searchQuery: '',
  filterPriority: 'all',
  filterStatus: 'all',

  fetchTasks: async () => {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false });

      if (error) {
      console.error('Error fetching tasks:', error);
      return;
    }

    set({
      tasks: data?.map((task) => (task)) || [],
    });
  },

  addTask: async (task) => {
    const { data, error } = await supabase
      .from('tasks')
      .insert(task)
      .select()
      .single();

    if (error) {
      console.error('Error adding task:', error);
      return;
    }

    set((state) => ({
      tasks: [
        data,
        ...state.tasks,
      ],
    }));
  },

  updateTask: async (id, updatedTask) => {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              ...updatedTask,
            }
          : task
      ),
    }));
  
    const { data, error } = await supabase
      .from('tasks')
      .update(updatedTask)
      .eq('id', id)
      .select()
      .single();
  
    if (error) {
      console.error('Error updating task:', error);
  
      set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === id
            ? {
                ...task,
                ...state.tasks.find((t) => t.id === id),
              }
            : task
        ),
      }));
      return;
    }
  
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              ...data, 
            }
          : task
      ),
    }));
  },
  

  deleteTask: async (id) => {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting task:', error);
      return;
    }

    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    }));
  },

  setSearchQuery: (query) => set({ searchQuery: query }),

  setFilterPriority: (priority) => set({ filterPriority: priority }),

  setFilterStatus: (status) => set({ filterStatus: status }),
}));