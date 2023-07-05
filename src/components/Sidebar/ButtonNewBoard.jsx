import React from "react";
import IconBoard from "../../assets/icon-board.svg";

export default function ButtonNewBoard() {
  return (
    <button
      onClick={() => window.CreateBoard.showModal()}
      className="pl-8 py-3 hover:opacity-70 text-start flex items-center gap-x-3 text-base font-semibold text-blue-violet"
    >
      <span>
        <img src={IconBoard} />
      </span>
      + Create New Board
    </button>
  );
}
