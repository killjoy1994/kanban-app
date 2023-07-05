import React from "react";

export default function Arrow({isModalOpen}) {
  return (
    <span className="absolute top-[40%] right-3">
      <svg className={isModalOpen ? "transition duration-400 rotate-180" : "transition duration-400"} width="10" height="7" xmlns="http://www.w3.org/2000/svg">
        <path stroke="#635FC7" strokeWidth="2" fill="none" d="m1 1 4 4 4-4" />
      </svg>
    </span>
  );
}
