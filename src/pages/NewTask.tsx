import { TaskForm } from '../components/TaskForm';

export const NewTask = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
        Create New Task
      </h1>
      <TaskForm />
    </div>
  );
}
