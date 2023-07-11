import React, { useEffect, useState } from "react";
import Circle from "../Elements/Circle";
import TaskModal from "../Modals/TaskModal";
import EditTask from "../Modals/EditTaskModal";

export default function Tasks({ columnId, columnName, tasks, onForce }) {
  return (
    <div>
      <div className="mb-5 flex items-center gap-x-3">
        <Circle /> <span className="text-slate-500 tracking-[2px] font-semibold">{columnName} (2)</span>
      </div>
      <div className="w-[280px] shrink-0 flex flex-col gap-y-5">
        {tasks?.map((task) => {
          const subChecked = task.subtasks.filter((sub) => sub.isDone).length;
          return (
            <div key={task.id}>
              <button
                onClick={() => {
                  const modalId = `TaskItem${task.id}`;
                  window[modalId].showModal();
                }}
                className="bg-white p-5 w-full rounded-md shadow-lg text-start"
              >
                <span className="block font-semibold text-md">{task.title}</span>
                <span className="block text-sm text-slate-500 font-semibold">
                  {" "}
                  {subChecked} of {task.subtasks?.length} subtasks
                </span>
              </button>
              <TaskModal id={task.id} columnId={columnId} />
              <EditTask taskModal={`TaskItem${task.id}`} id={task.id} columnId={columnId} onForce={onForce} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
