// utils/dateHelpers.js
export const isOverdue = (dueDate) => {
    const today = new Date().toISOString().split("T")[0];
    return dueDate < today;
  };
  