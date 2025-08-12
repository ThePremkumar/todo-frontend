import React, { useState, useMemo } from 'react';
import { useTask } from '../../contexts/TaskContext';
import { 
  CheckCircleIcon, 
  CircleIcon, 
  EditIcon, 
  TrashIcon, 
  AlertCircleIcon, 
  ClockIcon 
} from 'lucide-react';

export const TaskItem = ({ task, onEdit }) => {
  const { toggleComplete, deleteTask } = useTask();
  const [isToggling, setIsToggling] = useState(false);

  const priorityClasses = {
    low: 'bg-success bg-opacity-10 text-success fw-bold',
    medium: 'bg-warning bg-opacity-10 text-warning fw-bold',
    high: 'bg-danger bg-opacity-10 text-danger fw-bold',
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  const overdue = useMemo(() => {
    if (!task.dueDate || task.completed) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(task.dueDate) < today;
  }, [task.dueDate, task.completed]);

  let borderColor = 'border-start border-4 border-primary';
  if (task.completed) borderColor = 'border-start border-4 border-success';
  else if (overdue) borderColor = 'border-start border-4 border-danger';

  const handleToggleComplete = async () => {
    if (isToggling) return;

    setIsToggling(true);
    try {
      await toggleComplete(task._id);
    } catch (error) {
      console.error('Failed to toggle task:', error);
    } finally {
      setIsToggling(false);
    }
  };

  return (
    <div className={`bg-white rounded-3 shadow-sm p-3 mb-3 ${borderColor}`}>
      <div className="d-flex align-items-start">
        <button
          onClick={() => toggleComplete(task._id)}
          className="btn btn-link btn-sm px-1 me-3"
          title={task.status === "completed" ? 'Mark as Pending' : 'Mark as Completed'}
          style={{ color: task.status === "completed" ? '#198754' : '#adb5bd' }}
        >
          {task.status === "completed"
            ? <CheckCircleIcon size={20} color="#198754" />
            : <CircleIcon size={20} />
          }
        </button>

        <div className="flex-grow-1">
          <h3 className={`h6 fw-medium mb-1 ${task.completed ? 'text-decoration-line-through text-secondary' : 'text-dark'}`}>
            {task.title}
          </h3>
          {task.description && (
            <p className="text-muted mb-1 small">{task.description}</p>
          )}
          <div className="mt-2 d-flex flex-wrap align-items-center gap-2">
            <span className={`badge rounded-pill ${priorityClasses[task.priority]}`}>
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </span>
            {task.dueDate && (
              <span className={`small d-inline-flex align-items-center ms-2 ${overdue ? 'text-danger' : 'text-muted'}`}>
                <ClockIcon size={14} className="me-1" />
                {formatDate(task.dueDate)}
                {overdue && !task.completed && (
                  <AlertCircleIcon size={14} className="ms-1" color="#dc3545" />
                )}
              </span>
            )}
          </div>
        </div>
        <div className="ms-2 d-flex flex-column gap-1">
          <button
            onClick={onEdit}
            className="btn btn-link btn-sm px-1 text-info"
            title="Edit"
          >
            <EditIcon size={20} />
          </button>
          <button
            onClick={() => deleteTask(task._id)}
            className="btn btn-link btn-sm px-1 text-danger"
            title="Delete"
          >
            <TrashIcon size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
