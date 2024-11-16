// modules/TaskNavigation.js
import React from "react";

const TaskNavigation = ({ selectedCategory, setSelectedCategory }) => {
  const categories = ["Today", "Upcoming", "Completed", "Overdue"];

  return (
    <div className="bg-blue-600 text-white p-4 shadow-md">
      <div className="flex justify-center gap-6">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`text-lg font-semibold px-4 py-2 rounded ${
              selectedCategory === category
                ? "bg-white text-blue-600"
                : "hover:bg-blue-500"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TaskNavigation;
