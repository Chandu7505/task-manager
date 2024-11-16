// MainApp.js
import React, { useState, useEffect } from "react";
import TaskNavigation from "./components/TaskNavigation.js";
import TaskPanel from "./components/TaskPanel.js";
import TaskForm from "./components/TaskForm.js";
import { isOverdue } from "./utils/dateHelper.js";

const App = () => {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem("taskProTasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });
  const [selectedCategory, setSelectedCategory] = useState("Today");
  const [isFormVisible, setShowForm] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  useEffect(() => {
    localStorage.setItem("taskProTasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => setTasks([...tasks, task]);

  const editTask = (updatedTask) =>
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));

  const deleteTask = (taskId) => setTasks(tasks.filter((task) => task.id !== taskId));

  return (
    <div className="bg-gray-100 min-h-screen">
      <TaskNavigation
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <div className="max-w-4xl mx-auto p-6">
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
        >
          Add Task
        </button>
        <TaskPanel
          tasks={tasks}
          category={selectedCategory}
          onComplete={(id) =>
            setTasks(
              tasks.map((task) =>
                task.id === id ? { ...task, completed: true } : task
              )
            )
          }
          onDelete={deleteTask}
          onEdit={(task) => {
            setTaskToEdit(task);
            setShowForm(true);
          }}
        />
        {isFormVisible && (
          <TaskForm
            onSubmit={(task) => {
              if (taskToEdit) editTask(task);
              else addTask(task);
              setShowForm(false);
              setTaskToEdit(null);
            }}
            taskToEdit={taskToEdit}
            isEditing={!!taskToEdit}
            setShowForm={setShowForm}
          />
        )}
      </div>
    </div>
  );
};

export default App;
