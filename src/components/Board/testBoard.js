import React, { useEffect, useState } from "react";
import EmptyColumn from "./EmptyColumn";
import NewColumn from "./NewColumn";
import Tasks from "./Tasks";
import { twMerge } from "tailwind-merge";
import { customScrollbar } from "../../styles";
import { useSelector } from "react-redux";
import NoBoards from "./NoBoards";
import AddColumn from "../Modals/AddNewColumn";
import EditBoard from "../Modals/EditBoard";
import { DragDropContext } from "react-beautiful-dnd";

export default function Board() {
  const { boards } = useSelector((state) => state.board);
  const selectedBoard = boards?.find((board) => board.isActive);
  console.log("BOARDSS: ", boards);

  useEffect(() => {
    localStorage.setItem("boards", JSON.stringify(boards));
    // console.log("RERENDERRRR PARENT");
    console.log("BOARDSS: ", boards);
  }, [boards]);

  // useEffect(() => {
  //   console.log("RERENDERRRR PARENT");
  // }, []);

  return (
    <div className={twMerge("md:ml-[300px] h-[calc(100vh-98px)] overflow-auto  bg-cyan-100 bg-opacity-20", customScrollbar)}>
      {boards.length ? (
        <div className="flex px-6 py-5 md:min-w-[100vw] h-full gap-x-5">
          <DragDropContext>
            {selectedBoard?.columns?.map((column) => {
              if (column.tasks?.length > 0) {
                return <Tasks columnId={column.id} columnName={column.name} key={column.id} tasks={column.tasks} />;
              } else {
                return <EmptyColumn key={column.id} columnName={column.name} id={column.id} />;
              }
            })}
          </DragDropContext>
          <NewColumn />
          <AddColumn />
        </div>
      ) : (
        <NoBoards />
      )}
    </div>
  );
}
