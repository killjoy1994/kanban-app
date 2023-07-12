import React from "react";
import { twMerge } from "tailwind-merge";

export default function Modal(props) {
  return (
    <div>
      {/* Open the modal using ID.showModal() method */}
      <dialog id={props.id} className={twMerge("modal rounded-md", props.className)}>
        <div method="dialog" className="modal-box">
          {props.children}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button
            onClick={() => {
              if (props.showElips) {
                props.setShowElips(false);
              }
              if (props.reset) {
                props.reset();
              }
            }}
          >
            close
          </button>
        </form>
      </dialog>
    </div>
  );
}
