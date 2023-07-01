import React from "react";
import Circle from "../Elements/Circle";

export default function BoardColumn() {
  return (
    <div>
      <div className="mb-5 flex items-center gap-x-3"><Circle /> <span className="text-slate-500 tracking-[2px] font-semibold">Todo (2)</span></div>
      <div className="h-[90%] min-w-[280px] border-dashed border-4 rounded-lg shrink-0"></div>
    </div>
  );
}
