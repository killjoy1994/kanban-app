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
import { DragDropContext } from "@hello-pangea/dnd";
import { useDispatch } from "react-redux";
import { updateBoardByDragging } from "../../redux/boardSlice";

export default function Board() {
  const { boards } = useSelector((state) => state.board);
  const selectedBoard = boards?.find((board) => board.isActive);
  const columns = selectedBoard?.columns;
  // console.log("BOARDSS: ", boards);
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem("boards", JSON.stringify(boards));
  }, [boards]);

  const onDragEnd = ({ source, destination }) => {
    if (destination == undefined || destination == null) return null;

    // Make sure we're actually moving the item
    if (source.droppableId == destination.droppableId && source.index == destination.index) return null;

    // Set start and end variables
    const start = columns.find((col) => col.id == source.droppableId);
    const end = columns.find((col) => col.id == destination.droppableId);

    if (start.id == end.id) {
      let filteredList = start.tasks.filter((task, idx) => idx !== source.index);
      filteredList.splice(destination.index, 0, start.tasks[source.index]);
      console.log("FILTERED: ", filteredList);
      //update state
      dispatch(updateBoardByDragging({ columnId: start.id, data: filteredList }));
    } else {
      
    }
  };

  return (
    <div className={twMerge("md:ml-[300px] h-[calc(100vh-98px)] overflow-auto  bg-cyan-100 bg-opacity-20", customScrollbar)}>
      {boards.length ? (
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex px-6 py-5 md:min-w-[100vw] h-full gap-x-5">
            {selectedBoard?.columns?.map((column) => {
              return <Tasks columnId={column.id} columnName={column.name} key={column.id} tasks={column.tasks} />;
            })}
            <NewColumn />
            <AddColumn />
          </div>
        </DragDropContext>
      ) : (
        <NoBoards />
      )}
    </div>
  );
}
