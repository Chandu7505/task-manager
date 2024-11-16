// modules/TaskForm.js
import React, { useState } from "react";

const TaskForm = ({ onSubmit, taskToEdit, isEditing, setShowForm }) => {
  const [title, setTitle] = useState(taskToEdit ? taskToEdit.title : "");
  const [description, setDescription] = useState(
    taskToEdit ? taskToEdit.description : ""
  );
  const [priority, setPriority] = useState(
    taskToEdit ? taskToEdit.priority : "low"
  );
  const [dueDate, setDueDate] = useState(
    taskToEdit ? taskToEdit.dueDate : new Date().toISOString().split("T")[0]
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Title is required!");
      return;
    }

    const task = {
      id: isEditing ? taskToEdit.id : Date.now(),
      title,
      description,
      priority,
      dueDate,
      completed: taskToEdit ? taskToEdit.completed : false,
    };

    onSubmit(task);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4">
          {isEditing ? "Edit Task" : "Add Task"}
        </h2>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Task title"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Task description"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="low">Low</option>
            <option value="med">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {isEditing ? "Update Task" : "Add Task"}
          </button>
          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
