import React from "react";

export default function NoBoards() {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="flex flex-col items-center gap-y-3">
        <p className="dark:text-slate-50 text-lg mb-2">This board is empty, please create a board to get started!</p>
        <button
          className="btn w-52 hidden border-none py-2.5 px-5 rounded-full md:flex md:items-center gap-x-1 bg-blue-violet hover:bg-blue-violet hover:bg-opacity-80"
          onClick={() => window.CreateBoard.showModal()}
        >
          <span>
            <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
              <path fill="#FFF" d="M7.368 12V7.344H12V4.632H7.368V0H4.656v4.632H0v2.712h4.656V12z" />
            </svg>
          </span>
          <span className="text-slate-50 font-bold">Create New Board</span>
        </button>
      </div>
    </div>
  );
}
