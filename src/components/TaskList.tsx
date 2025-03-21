import React from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { format } from 'date-fns';
import { Clock, CheckCircle, Circle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTaskStore } from '../store/useTaskStore';
import { Priority, Status } from '../types/task';
import { cn } from '../lib/utils';

const priorityColors: Record<Priority, string> = {
  low: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
};

const statusColors: Record<Status, string> = {
  todo: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
  'in-progress': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  done: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
};

const statusIcons: Record<Status, React.ReactNode> = {
  todo: <Circle className="h-5 w-5 text-gray-500 dark:text-gray-400" />,
  'in-progress': <Clock className="h-5 w-5 text-yellow-500 dark:text-yellow-400" />,
  done: <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400" />,
};

export function TaskList() {
  const tasks = useTaskStore((state) => state.tasks);
  const searchQuery = useTaskStore((state) => state.searchQuery);
  const filterPriority = useTaskStore((state) => state.filterPriority);
  const filterStatus = useTaskStore((state) => state.filterStatus);
  const updateTask = useTaskStore((state) => state.updateTask);
  const reorderTasks = useTaskStore((state) => state.reorderTasks);

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
    return matchesSearch && matchesPriority && matchesStatus;
  });

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const sourceDroppableId = result.source.droppableId;
    const destinationDroppableId = result.destination.droppableId;
    const taskId = result.draggableId;

    if (sourceDroppableId !== destinationDroppableId) {
      const newStatus = destinationDroppableId as Status;
      const task = tasks.find((t) => t.id === taskId);
      if (task) {
        updateTask(taskId, { ...task, status: newStatus });
      }
    } else {
      const items = Array.from(filteredTasks);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      reorderTasks(items);
    }
  };

  const groupedTasks = {
    todo: filteredTasks.filter((task) => task.status === 'todo'),
    'in-progress': filteredTasks.filter((task) => task.status === 'in-progress'),
    done: filteredTasks.filter((task) => task.status === 'done'),
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {(['todo', 'in-progress', 'done'] as Status[]).map((status) => (
          <div
            key={status}
            className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4"
          >
            <h3
              className={cn(
                'text-lg font-semibold mb-4 p-2 rounded-md text-center',
                statusColors[status]
              )}
            >
              {status === 'todo'
                ? 'To Do'
                : status === 'in-progress'
                ? 'In Progress'
                : 'Done'}
            </h3>
            <Droppable droppableId={status}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-4 min-h-[200px]"
                >
                  {groupedTasks[status].map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="bg-white dark:bg-gray-700 rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow duration-200"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-3">
                              {statusIcons[task.status]}
                              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                                {task.title}
                              </h3>
                            </div>
                            <Link
                              to={`/edit/${task.id}`}
                              className="text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 transition-colors"
                            >
                              Edit
                            </Link>
                          </div>

                          <p className="mt-2 text-gray-600 dark:text-gray-400 line-clamp-2">
                            {task.description}
                          </p>

                          <div className="mt-4 flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <span
                                className={cn(
                                  'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                                  priorityColors[task.priority]
                                )}
                              >
                                {task.priority}
                              </span>
                              <span className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                <Clock className="mr-1.5 h-4 w-4" />
                                {format(new Date(task.due_date), 'MMM d, yyyy')}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
}