import React, { useState } from "react";
import BoardList from "./BoardList";
import ButtonNewBoard from "./ButtonNewBoard";
import ButtonToggle from "./ButtonToggle";
import CreateBoard from "../Modals/CreateBoard";
import { useSelector } from "react-redux";

export default function Sidebar() {
  const [showModal, setShowModal] = useState(false)
  const {boards} = useSelector((state) => state.board);


  return (
    <div className="fixed hidden md:flex md:flex-col md:justify-between md:pb-8 w-[300px] h-[calc(100vh-98px)] border-r-2 border-r-slate-500 border-opacity-10">
      <div>
        <div className="py-6 pl-8">
          <p className="tracking-[2px] text-xs font-semibold text-slate-500">ALL BOARDS ({boards.length})</p>
        </div>
        <BoardList />
        <ButtonNewBoard setShowModal={setShowModal} />
        <CreateBoard showModal={showModal} setShowModal={setShowModal} />
      </div>
      <ButtonToggle />
    </div>
  );
}
