import React, { useState } from 'react';
import { TaskList } from './TaskList';
import { TaskForm } from './TaskForm';
import { TaskFilter } from './TaskFilter';

export const TaskDashboard = () => {
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filterOptions, setFilterOptions] = useState({
    status: 'all',
    priority: 'all',
    sortBy: 'dueDate',
    sortOrder: 'asc'
  });

  return (
    <div className="container" style={{ maxWidth: '900px' }}>
      <div className="mb-4 d-flex justify-content-between align-items-center">
        <h2 className="h4 fw-bold text-dark mb-0">My Tasks</h2>
        <button
          onClick={() => {
            setIsAddingTask(true);
            setEditingTask(null);
          }}
          className="btn btn-primary"
        >
          Add New Task
        </button>
      </div>
      <TaskFilter filterOptions={filterOptions} setFilterOptions={setFilterOptions} />
      {(isAddingTask || editingTask) && (
        <div className="mb-4">
          <TaskForm
            task={editingTask}
            onClose={() => {
              setIsAddingTask(false);
              setEditingTask(null);
            }}
          />
        </div>
      )}
      <TaskList filterOptions={filterOptions} onEditTask={setEditingTask} />
    </div>
  );
};
