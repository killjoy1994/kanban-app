import React from "react";
import TaskModal from "../Modals/TaskModal";

export default function TaskItem({ title, subtasks, id, columnName, currentStatus, desc }) {
  const showModalHandler = () => {
    const modalId = `TaskItem${id}`
    window[modalId].showModal()
  }
  return (
    <>
      <button onClick={showModalHandler} className="bg-white p-5 rounded-md shadow-lg text-start">
        <span className="block font-semibold text-md">{title}</span>
        <span className="block text-sm text-slate-500 font-semibold">0 of {subtasks?.length} subtasks</span>
      </button>
      <TaskModal data={{title, subtasks, id, columnName, currentStatus, desc}} />
    </>
  );
}
