import React from "react";
import IconBoard from "../../assets/icon-board.svg";
import IconAdd from "../../assets/icon-add-task-mobile.svg";

export default function BoardItem() {
  return (
    <li className="hover:bg-blue-violet hover:bg-opacity-25 py-3 pl-8 w-[90%] rounded-r-full">
      <button className="flex items-center gap-x-3 text-base font-semibold text-slate-500 hover:text-white">
        <span>
          <img src={IconBoard} alt="" />
        </span>{" "}
        Platform Launch
      </button>
    </li>
  );
}
