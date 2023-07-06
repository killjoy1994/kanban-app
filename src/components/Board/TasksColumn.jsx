import React from "react";
import Circle from "../Elements/Circle";
import TaskItem from "./TaskItem";

export default function Tasks({columnId, columnName, tasks }) {
  // console.log("TASKS: ", tasks);
  return (
    <div>
      <div className="mb-5 flex items-center gap-x-3">
        <Circle /> <span className="text-slate-500 tracking-[2px] font-semibold">{columnName} (2)</span>
      </div>
      <div className="w-[280px] shrink-0 flex flex-col gap-y-5">
        {tasks?.map((task) => {
          // console.log("INDEX: ", idx)
          return <TaskItem key={task.id} columnName={columnName} columnId={columnId} id={task.id} title={task.title} subtasks={task.subtasks} currentStatus={task.status} desc={task.description} />;
        })}
      </div>
    </div>
  );
}
