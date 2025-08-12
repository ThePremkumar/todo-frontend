import React, { createContext, useContext, useState, useEffect } from "react";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const res = await fetch("http://localhost:7001/api/tasks", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
        },
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (taskData) => {
    try {
      const res = await fetch("http://localhost:7001/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify(taskData),
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const newTask = await res.json();
      setTasks((prev) => [...prev, newTask]);
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  const updateTask = async (id, updatedData) => {
    const res = await fetch(`http://localhost:7001/api/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem("token"),
      },
      body: JSON.stringify(updatedData),
    });
    if (!res.ok) throw new Error('HTTP error!');
    const updatedTask = await res.json();
    setTasks(prev =>
      prev.map(task => (task._id === id ? updatedTask : task)) // <-- _id, NOT id!
    );
  };

  const toggleComplete = async (id) => {
  const task = tasks.find((t) => t._id === id);
  if (!task) return;
  // Always set to "completed" when clicked
  await updateTask(id, { status: "completed" });
};


  const deleteTask = async (id) => {
    if (!id) {
      console.error("deleteTask called without id!");
      return;
    }
    try {
      const res = await fetch(`http://localhost:7001/api/tasks/${id}`, {
        method: "DELETE",
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        addTask,
        updateTask,
        deleteTask,
        toggleComplete,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => useContext(TaskContext);
