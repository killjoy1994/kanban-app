import React from "react";
import EmptyBoard from "./EmptyBoard";
import NewColumn from "./NewColumn";
import Tasks from "./Tasks";
import { twMerge } from "tailwind-merge";
import { customScrollbar } from "../../styles";
import { useSelector } from "react-redux";
import NoBoards from "./NoBoards";

export default function Board() {
  const { boards } = useSelector((state) => state.board);

  return (
    <div className={twMerge("md:ml-[300px] h-[calc(100vh-98px)] overflow-auto  bg-cyan-100 bg-opacity-20", customScrollbar)}>
      {boards.length ? (
        <div className="flex px-6 py-5 md:min-w-[100vw] h-full gap-x-5">
          {boards
            ?.find((board) => board.isActive)
            ?.columns?.map((column, idx) => {
              return <EmptyBoard key={idx} columnName={column?.name} />;
            })}
          <NewColumn />
        </div>
      ) : (
        <NoBoards />
      )}
    </div>
  );
}
