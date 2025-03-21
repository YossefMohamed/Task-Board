import  { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { TaskList } from '../components/TaskList';
import { TaskFilters } from '../components/TaskFilters';
import { ThemeToggle } from '../components/ThemeToggle';
import { useTaskStore } from '../store/useTaskStore';

export function Dashboard() {
  const fetchTasks = useTaskStore((state) => state.fetchTasks);

  useEffect(() => {
    fetchTasks(); 
  }, [fetchTasks]);
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Task Dashboard
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Manage and organize your tasks efficiently
          </p>
        </div>
       <div className="flex gap-2">
       <ThemeToggle />

       <Link
          to="/new"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
        >
          <Plus className="-ml-1 mr-2 h-5 w-5" />
          New Task
        </Link>
       </div>
      </div>

      <div className="mb-8 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
        <TaskFilters />
      </div>

      <TaskList />
    </div>
  );
}