import React from "react";
import { useDispatch } from "react-redux";
import { deleteTask } from "../../redux/boardSlice";
import TaskModal from "../Modals/TaskModal";

export default function ElipsDropdown({ parentModal, taskModal, id, show, setShow, name, onDelete }) {
  return (
    <>
      <div className="relative z-[999]">
        <button onClick={() => setShow((prevState) => !prevState)} className="px-2 py-3 rounded-full hover:bg-blue-800 hover:bg-opacity-10">
          <span>
            <svg width="5" height="20" xmlns="http://www.w3.org/2000/svg">
              <g fill="#828FA3" fillRule="evenodd">
                <circle cx="2.308" cy="2.308" r="2.308" />
                <circle cx="2.308" cy="10" r="2.308" />
                <circle cx="2.308" cy="17.692" r="2.308" />
              </g>
            </svg>
          </span>
        </button>
        {show && (
          <>
            <div className="fixed z-[100] top-0 left-0 right-0 bottom-0" onClick={() => setShow((prevState) => !prevState)}></div>
            <div className=" bg-white shadow-lg absolute right-[50%] top-14 rounded-md flex flex-col p-4 w-40">
              <button
                onClick={() => {
                  // console.log("ID:", id)
                  name !== "Board" && window[parentModal].close();
                  name == "Board" ? window.EditBoard.show() : window[id].showModal();
                  setShow(false);
                }}
                className="text-start text-slate-500 relative z-[999] font-medium hover:text-opacity-80"
              >
                Edit {name}
              </button>
              <button
                onClick={() => {
                  onDelete();
                  name == "Task" && window[parentModal].close();
                  name == "Task" && window[taskModal].close();
                  setShow(false);
                }}
                className="text-start relative z-[999] font-medium text-red-600 hover:text-opacity-80"
              >
                Delete {name}
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
