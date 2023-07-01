import React from "react";
import EmptyBoard from "./EmptyBoard";
import NewColumn from "./NewColumn";
import Tasks from "./Tasks";

export default function Board() {
  return (
    <div className="md:ml-[300px] h-[calc(100vh-98px)] overflow-auto bg-cyan-100 bg-opacity-20">
      <div className="flex px-6 py-5 md:min-w-[100vw] h-full gap-x-5">
        <Tasks />
        <Tasks />
        <EmptyBoard />
        <NewColumn />
      </div>
    </div>
  );
}
