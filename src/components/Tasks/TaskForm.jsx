import React, { useEffect, useState } from 'react';
import { useTask } from '../../contexts/TaskContext';
import { XIcon } from 'lucide-react';

export const TaskForm = ({ task, onClose }) => {
  const { addTask, updateTask } = useTask();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('medium');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setDueDate(task.dueDate || '');
      setPriority(task.priority);
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskData = {
      title,
      description,
      dueDate: dueDate || null,
      priority,
      completed: task?.completed || false
    };
    if (task) {
      updateTask(task._id, taskData);
    } else {
      addTask(taskData);
    }
    onClose();
  };

  return (
    <div className="bg-white p-4 rounded-3 shadow-sm">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="h5 fw-bold text-dark mb-0">
          {task ? 'Edit Task' : 'Add New Task'}
        </h3>
        <button
          type="button"
          onClick={onClose}
          className="btn btn-light btn-sm p-1 d-flex align-items-center"
          aria-label="Close"
        >
          <XIcon style={{ width: 20, height: 20 }} />
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label fw-bold">
            Title
          </label>
          <input
            id="title"
            type="text"
            className="form-control"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label fw-bold">
            Description
          </label>
          <textarea
            id="description"
            className="form-control"
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows={3}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="dueDate" className="form-label fw-bold">
            Due Date
          </label>
          <input
            id="dueDate"
            type="date"
            className="form-control"
            value={dueDate}
            onChange={e => setDueDate(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="priority" className="form-label fw-bold">
            Priority
          </label>
          <select
            id="priority"
            className="form-select"
            value={priority}
            onChange={e => setPriority(e.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="d-flex justify-content-end">
          <button
            type="button"
            onClick={onClose}
            className="btn btn-secondary me-2"
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary fw-bold">
            {task ? 'Update Task' : 'Add Task'}
          </button>
        </div>
      </form>
    </div>
  );
};
