import React from "react";
import { twMerge } from "tailwind-merge";

export default function Modal({id, children}) {
  return (
    <div>
      {/* Open the modal using ID.showModal() method */}
      <dialog id={id} className={twMerge("modal rounded-md")}>
        <div method="dialog" className="modal-box">
          {children}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}
