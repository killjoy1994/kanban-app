import React from "react";

export default function ElipsDropdown({show, setShow}) {
  return (
    <div className="relative">
      <button onClick={() => setShow((prevState) => !prevState)} className="px-2 py-3 rounded-full hover:bg-blue-800 hover:bg-opacity-10">
        <span>
          <svg width="5" height="20" xmlns="http://www.w3.org/2000/svg">
            <g fill="#828FA3" fillRule="evenodd">
              <circle cx="2.308" cy="2.308" r="2.308" />
              <circle cx="2.308" cy="10" r="2.308" />
              <circle cx="2.308" cy="17.692" r="2.308" />
            </g>
          </svg>
        </span>
      </button>
      {show && (
        <div className=" bg-white shadow-lg absolute right-[50%] top-14 rounded-md flex flex-col p-4 w-40">
          <button className="text-start text-slate-500 font-medium hover:text-opacity-80">Edit Board</button>
          <button className="text-start font-medium text-red-600 hover:text-opacity-80">Delete Board</button>
        </div>
      )}
      <div></div>
    </div>
  );
}