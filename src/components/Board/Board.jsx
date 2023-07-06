import React from "react";
import EmptyColumn from "./EmptyColumn";
import NewColumn from "./NewColumn";
import Tasks from "./TasksColumn";
import { twMerge } from "tailwind-merge";
import { customScrollbar } from "../../styles";
import { useSelector } from "react-redux";
import NoBoards from "./NoBoards";

export default function Board() {
  const { boards } = useSelector((state) => state.board);
  const selectedBoard = boards?.find((board) => board.isActive)
  // console.log("BOARDSS: ", boards)

  return (
    <div className={twMerge("md:ml-[300px] h-[calc(100vh-98px)] overflow-auto  bg-cyan-100 bg-opacity-20", customScrollbar)}>
      {boards.length ? (
        <div className="flex px-6 py-5 md:min-w-[100vw] h-full gap-x-5">
          {
            selectedBoard?.columns?.map((column) => {
              if(column.tasks) {
                return <Tasks columnId={column.id} columnName={column.name} key={column.id} tasks={column.tasks} />
              } else {
                return <EmptyColumn key={column.id} columnName={column.name} id={column.id} />;
              }
              
            })}
          <NewColumn />
        </div>
      ) : (
        <NoBoards />
      )}
    </div>
  );
}
