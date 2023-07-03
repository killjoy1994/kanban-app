import React from "react";
import EmptyBoard from "./EmptyBoard";
import NewColumn from "./NewColumn";
import Tasks from "./Tasks";
import { twMerge } from "tailwind-merge";
import { customScrollbar } from "../../styles";
import { useSelector } from "react-redux";

export default function Board() {
  const { boards } = useSelector((state) => state.board);
  console.log("Board Component: ", boards)
  return (
    <div className={twMerge("md:ml-[300px] h-[calc(100vh-98px)] overflow-auto  bg-cyan-100 bg-opacity-20", customScrollbar)}>
      <div className="flex px-6 py-5 md:min-w-[100vw] h-full gap-x-5">
        {boards[0]?.columns?.map((column,idx) => {
          return <EmptyBoard key={idx} columnName={column?.name} />
        })}
        <NewColumn />
      </div>
    </div>
  );
}
