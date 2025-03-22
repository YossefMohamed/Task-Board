import { useParams, Navigate } from 'react-router-dom';
import { TaskForm } from '../components/TaskForm';
import { useTaskStore } from '../store/useTaskStore';

export const EditTask =() => {
  const { id } = useParams<{ id: string }>();
  const task = useTaskStore((state) => 
    state.tasks.find((t) => t.id === id)
  );

  if (!task) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
 <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">Edit Task</h1>      <TaskForm task={task} isEditing />
    </div>
  );
}
