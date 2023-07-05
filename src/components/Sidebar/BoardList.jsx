import React from "react";

import BoardItem from "./BoardItem";
import { useSelector } from "react-redux";
import { setActiveBoard } from "../../redux/boardSlice";

export default function BoardList() {
  const { boards } = useSelector((state) => state.board);
  console.log("BOARDSSS: ", boards)
  return (
    <ul>
      {boards.map((board, idx) => {
        return <BoardItem name={board.name} id={idx} isActive={board.isActive} setActiveBoard={setActiveBoard} key={idx} />;
      })}
    </ul>
  );
}
