// modules/TaskPanel.js
import React from "react";
import { isOverdue } from "../utils/dateHelper";

const TaskPanel = ({ tasks, category, onComplete, onDelete, onEdit }) => {
    const filteredTasks = tasks.filter((task) => {
        if (category === "Completed") return task.completed;
        if (category === "Today")
            return !task.completed && task.dueDate === new Date().toISOString().split("T")[0];
        if (category === "Overdue") return !task.completed && isOverdue(task.dueDate);
        return !task.completed;
    });

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">{category} Tasks</h2>
            {filteredTasks.length > 0 ? (
                <ul>
                    {filteredTasks.map((task) => (
                        <li
                            key={task.id}
                            className="flex justify-between items-center border-b py-3"
                        >
                            <div>
                                <h3 className="font-bold">{task.title}</h3>
                                <p className="text-gray-600">{task.description}</p>
                                <p className="text-sm text-gray-500">
                                    <strong>Due Date:</strong> {task.dueDate}
                                </p>
                                <span
                                    className={`inline-block mt-2 px-3 py-1 rounded text-sm font-semibold ${task.priority === "high"
                                            ? "bg-red-500 text-white"
                                            : task.priority === "med"
                                                ? "bg-yellow-500 text-black"
                                                : "bg-green-500 text-white"
                                        }`}
                                >
                                    {task.priority.toUpperCase()}
                                </span>
                                {category === "Overdue" && (
                                    <span className="text-red-500 ml-4 font-semibold">Overdue!</span>
                                )}
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => onComplete(task.id)}
                                    className="bg-blue-500 text-white px-3 py-1 rounded"
                                >
                                    Complete
                                </button>
                                <button
                                    onClick={() => onEdit(task)}
                                    className="bg-gray-500 text-white px-3 py-1 rounded"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => onDelete(task.id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500">No tasks available in this category.</p>
            )}
        </div>
    );
};

export default TaskPanel;
