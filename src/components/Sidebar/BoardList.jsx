import React from "react";

import BoardItem from "./BoardItem";
import { useSelector } from "react-redux";
import { setActiveBoard } from "../../redux/boardSlice";

export default function BoardList() {
  const { boards } = useSelector((state) => state.board);
  console.log("BOARDSSS: ", boards)
  return (
    <ul>
      {boards.map((board) => {
        return <BoardItem name={board.name} id={board.id} isActive={board.isActive} setActiveBoard={setActiveBoard} key={board.id} />;
      })}
    </ul>
  );
}
