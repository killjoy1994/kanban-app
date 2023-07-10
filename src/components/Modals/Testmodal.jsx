import React from "react";
import { twMerge } from "tailwind-merge";

export default function Testmodal({ show, isShow, children }) {
  return (
    show && (
      <>
        <div className="fixed top-0 left-0 w-screen h-screen bg-red-400" onClick={() => isShow(false)}></div>
        <div className="w-[500px] h-[400px] bg-white relative z-50">
          {children}
        </div>
      </>
    )
  );
}
