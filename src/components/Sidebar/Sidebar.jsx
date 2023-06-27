import React from "react";
import IconBoard from "../../assets/icon-board.svg";
import IconAdd from "../../assets/icon-add-task-mobile.svg";
import BoardList from "./BoardList";
import ButtonNewBoard from "./ButtonNewBoard";
import ButtonToggle from "./ButtonToggle";

export default function Sidebar() {
  return (
    <div className="fixed hidden md:flex md:flex-col md:justify-between md:pb-8 w-[300px] h-[calc(100vh-98px)] border-r-2 border-r-slate-500 border-opacity-10">
      <div>
        <div className="py-6 pl-8">
          <p className="tracking-[2px] text-xs font-semibold text-slate-500">ALL BOARDS (2)</p>
        </div>
        <BoardList />
        <ButtonNewBoard />
      </div>
      <ButtonToggle />
    </div>
  );
}
