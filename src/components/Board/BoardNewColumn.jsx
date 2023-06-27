import React from "react";

export default function BoardNewColumn() {
  return (
    <div className="h-[90%] min-w-[280px] mt-11 rounded-lg shrink-0 new-column">
      <button className="h-full w-full cursor-pointer text-2xl font-semibold hover:text-slate-600 text-slate-400 flex justify-center items-center">+ New Column</button>
    </div>
  );
}
