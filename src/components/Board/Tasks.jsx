import React, { useEffect, useState } from "react";
import Circle from "../Elements/Circle";
import TaskModal from "../Modals/TaskModal";
import EditTask from "../Modals/EditTaskModal";
import { twMerge } from "tailwind-merge";
import { Draggable, Droppable } from "@hello-pangea/dnd";

export default function Tasks({ columnId, columnName, tasks }) {
  // console.log(typeof columnId)
  return (
    <div>
      <div className="mb-5 flex items-center gap-x-3">
        <Circle />{" "}
        <span className="text-slate-500 tracking-[2px] font-semibold">
          {columnName} ({tasks?.length})
        </span>
      </div>
      <Droppable droppableId={columnId}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={twMerge(
              "w-[280px] shrink-0 flex flex-col gap-y-5",
              !(tasks?.length > 0) ? "h-[90%] min-w-[280px] border-dashed border-4 rounded-lg shrink-0" : ""
            )}
          >
            {tasks?.map((task, index) => {
              return (
                <Draggable key={task.id} index={index} draggableId={task.id}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      <div
                        onClick={() => {
                          const modalId = `TaskItem${task.id}`;
                          window[modalId].showModal();
                        }}
                        className="bg-white p-5 w-full rounded-md shadow-lg text-start"
                      >
                        <span className="block font-semibold text-md">{task.title}</span>
                        <span className="block text-sm text-slate-500 font-semibold">
                          {" "}
                          {task.subtasks.filter((sub) => sub.isDone).length} of {task.subtasks?.length} subtasks
                        </span>
                      </div>
                      <TaskModal id={task.id} columnId={columnId} task={task} />
                      <EditTask taskModal={`TaskItem${task.id}`} id={task.id} columnId={columnId} />
                    </div>
                  )}
                </Draggable>
              );
            })}
            <span className="display-[none]">{provided.placeholder}</span>
          </div>
        )}
      </Droppable>
    </div>
  );
}
