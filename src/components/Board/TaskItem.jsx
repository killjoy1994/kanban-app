import React from "react";

export default function TaskItem({title, subtasks}) {
  return (
    <button className="bg-white p-5 rounded-md shadow-lg text-start">
      <span className="block font-semibold text-md">{title}</span>
      <span className="block text-sm text-slate-500 font-semibold">0 of 1 subtasks</span>
    </button>
  );
}
