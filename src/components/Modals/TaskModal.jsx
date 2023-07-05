import React, { useState } from "react";
import Modal from "./Modal";
import ElipsDropdown from "../Elements/ElipsDropdown";
import { useDispatch, useSelector } from "react-redux";
import Arrow from "../Elements/Arrow";
import { updateCurrentStatus } from "../../redux/boardSlice";

export default function TaskModal({ data }) {
  const dispatch = useDispatch();
  const { boards } = useSelector((state) => state.board);
  const [showElips, setShowElips] = useState(false);
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const onStatusChangeHandler = (e) => {
    dispatch(updateCurrentStatus({id: data.id, val: e.target.value, colName: data?.columnName}));
  };

  let status = boards?.find((board) => board.isActive)?.columns;
  // console.log("DATA Status: ", data);
  return (
    <Modal id={`TaskItem${data.id}`}>
      <div className="flex flex-col gap-y-3">
        <div className="flex justify-between items-center ">
          <h2 className="text-xl font-semibold">{data.title}</h2>
          <ElipsDropdown show={showElips} setShow={setShowElips} name="Task" />
        </div>
        <p className="text-sm text-slate-500 ">{data.desc.trim() !== "" ? data.desc : "No description"}</p>
        <div className=" text-sm text-slate-500 ">{!data.subtasks.length == 0 ? "No subtask" : data.subtasks}</div>
        <div className="flex flex-col gap-y-2">
          <p className="text-sm text-slate-500 ">Current Status</p>
          <div className="relative flex justify-between">
            <select
              defaultValue={data?.columnName}
              onChange={onStatusChangeHandler}
              className="w-full relative border-2 border-slate-300 appearance-none bg-transparent outline-blue-violet rounded-md h-9 pl-2"
              onClick={() => setIsSelectOpen((prevState) => !prevState)}
            >
              {status?.map((dataStatus, idx) => {
                return (
                  <option value={dataStatus?.name} key={idx}>
                    {dataStatus?.name}
                  </option>
                );
              })}
            </select>
            <Arrow isModalOpen={isSelectOpen} />
          </div>
        </div>
      </div>
    </Modal>
  );
}
