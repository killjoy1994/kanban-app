import React from "react";

export default function Modal({children}) {
  return (
    <div>
      {/* Open the modal using ID.showModal() method */}
      <dialog id="my_modal_2" className="modal">
        <div method="dialog" className="modal-box rounded-md">
          {children}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}
