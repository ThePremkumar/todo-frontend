import React from 'react';
import { useTask } from '../../contexts/TaskContext';
import { TaskItem } from './TaskItem';
import { AlertCircleIcon } from 'lucide-react';

export const TaskList = ({ filterOptions, onEditTask }) => {
  const { tasks, isLoading, error } = useTask();

  // Filter tasks
  const filteredTasks = tasks.filter(task => {
    if (filterOptions.status === 'active' && task.completed) return false;
    if (filterOptions.status === 'completed' && !task.completed) return false;
    if (filterOptions.priority !== 'all' && task.priority !== filterOptions.priority) return false;
    return true;
  });

  // Sort tasks
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    const sortOrder = filterOptions.sortOrder === 'asc' ? 1 : -1;
    switch (filterOptions.sortBy) {
      case 'dueDate':
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return sortOrder;
        if (!b.dueDate) return -sortOrder;
        return sortOrder * a.dueDate.localeCompare(b.dueDate);
      case 'priority': {
        const priorityValues = { low: 1, medium: 2, high: 3 };
        return sortOrder * (priorityValues[b.priority] - priorityValues[a.priority]);
      }
      case 'createdAt':
        return sortOrder * a.createdAt.localeCompare(b.createdAt);
      default:
        return 0;
    }
  });

  if (isLoading) {
    return (
      <div className="text-center py-5">
        Loading tasks...
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger d-flex align-items-center" role="alert">
        <AlertCircleIcon className="me-2" size={20} />
        <div>{error}</div>
      </div>
    );
  }

  if (sortedTasks.length === 0) {
    return (
      <div className="text-center py-5 bg-light rounded-3">
        <p className="text-muted mb-0">
          No tasks found. Add a new task to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column gap-3">
      {sortedTasks.map(task =>
        <TaskItem key={task._id || task.id} task={task} onEdit={() => onEditTask(task)} />
      )}
    </div>
  );

};
