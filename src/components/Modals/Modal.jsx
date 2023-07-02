import React from "react";
import { twMerge } from "tailwind-merge";

export default function Modal({children, className}) {
  return (
    <div>
      {/* Open the modal using ID.showModal() method */}
      <dialog id="my_modal_2" className="modal">
        <div method="dialog" className={twMerge("modal-box rounded-md", className)}>
          {children}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}
