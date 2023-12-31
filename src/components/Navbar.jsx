import React, { useEffect, useState } from "react";
import LogoMobile from "../assets/logo-mobile.svg";
import DarkLogo from "../assets/logo-dark.svg";
import LightLogo from "../assets/logo-light.svg";
import DownArrow from "../assets/icon-chevron-down.svg";
import UpArrow from "../assets/icon-chevron-up.svg";
import IconAdd from "../assets/icon-add-task-mobile.svg";
import IconDots from "../assets/icon-vertical-ellipsis.svg";
import AddNewTask from "./Modals/AddNewTask";
import ElipsDropdown from "./Elements/ElipsDropdown";
import { useDispatch, useSelector } from "react-redux";
import EditBoard from "./Modals/EditBoard";
import { deleteBoard, setActiveBoard } from "../redux/boardSlice";

export default function Navbar() {
  const [dotsOpen, setDotsOpen] = useState(false);
  const { boards, isDarkMode } = useSelector((state) => state.board);
  const selectedBoard = boards?.find((board) => board.isActive);
  const dispatch = useDispatch();

  console.log("DARK", isDarkMode);

  return (
    <header className="flex">
      <div className="pt-8 pb-10 md:w-[300px] pl-8 md:border-r-2 border-b-2 border-slate-600 shrink-0 border-opacity-10">
        <img className="w-6 h-6 md:hidden" src={LogoMobile} alt="" />
        <div className="hidden md:block ">
          <img src={isDarkMode ? LightLogo : DarkLogo} alt="" />
        </div>
      </div>
      <nav className="flex md:pl-8 pr-8 justify-between items-center w-full border-b-2 border-slate-600 border-opacity-10">
        <div className="flex md:hidden">
          <button className="flex text-xl font-bold pl-6">{boards.length == 0 ? "No Board Found" : selectedBoard?.name}</button>
          <span className="flex flex-col justify-center ml-2">
            <img src={DownArrow} alt="" />
          </span>
        </div>
        <div className="hidden md:block">
          <h1 className="text-2xl font-bold dark:text-slate-50">{boards.length == 0 ? "No Board Found" : selectedBoard?.name}</h1>
        </div>
        <div className="flex items-center gap-x-2">
          {boards.length !== 0 && (
            <>
              <button className="md:hidden py-2 px-4 rounded-full bg-blue-violet" onClick={() => setShowAddTaskModal(true)}>
                <img src={IconAdd} alt="" />
              </button>
              <button
                className="btn border-none hidden py-2.5 px-5 rounded-full md:flex md:items-center gap-x-1 bg-blue-violet hover:bg-blue-violet hover:bg-opacity-80"
                onClick={() => window.AddNewTask.showModal()}
              >
                <img className="h-2" src={IconAdd} alt="" />
                <span className="text-slate-50 font-bold">Add New Task </span>
              </button>
              {/* Modal */}
              <AddNewTask />
              <EditBoard />
              <ElipsDropdown
                show={dotsOpen}
                onDelete={() => {
                  let deleted;
                  let boardIdx = boards.findIndex((board) => board.isActive);

                  if ((boards.length === 1)) {
                    deleted = selectedBoard.id;
                  } else if (boardIdx === boards.length - 1) {
                    deleted = boards[boards.length - 2].id;
                  } else {
                    deleted = boards[boardIdx + 1].id;
                  }

                  dispatch(deleteBoard(selectedBoard.id));
                  dispatch(setActiveBoard(deleted));
                  setDotsOpen((prevState) => !prevState);
                }}
                setShow={setDotsOpen}
                name="Board"
              />
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
