import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import Testmodal from "./Testmodal";
import ElipsDropdown from "../Elements/ElipsDropdown";
import { useDispatch, useSelector } from "react-redux";
import Arrow from "../Elements/Arrow";
import { deleteTask, updateCurrentStatus } from "../../redux/boardSlice";
import { twMerge } from "tailwind-merge";

export default function TaskModal({ id, columnId, task }) {
  const modalId = `TaskItem${id}`;
  const editModalId = `EditTask${id}`;
  const dispatch = useDispatch();
  const { boards } = useSelector((state) => state.board);
  const board = boards.find((board) => board.isActive);
  const column = board.columns.find((col) => col.id === columnId);
  const filteredTask = column.tasks.find((task) => task.id === id);

  const [selectedStatus, setSelectedStatus] = useState(columnId);
  const [checkedSubtasks, setCheckedSubtasks] = useState([...filteredTask.subtasks]);

  useEffect(() => {
    setCheckedSubtasks(filteredTask.subtasks);
  }, [boards]);

  const [showElips, setShowElips] = useState(false);
  // const [selectedStatus, selSelectedStatus] = useState(filteredTask?.status);

  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const onStatusChangeHandler = (e) => {
    setSelectedStatus(e.target.value);
    // dispatch(updateCurrentStatus({ taskId: id, updatedColumnId: e.target.value, currentColumnId: column.id }));
  };

  const onSaveHandler = () => {
    const checkedSubtaskIds = checkedSubtasks.filter((sub) => sub.isDone).map((data) => data.id);

    dispatch(updateCurrentStatus({ taskId: id, updatedColumnId: selectedStatus, currentColumnId: column.id, checkedSubs: checkedSubtaskIds }));
    window[modalId].close();
  };

  const onCheckedHandler = (e) => {
    setCheckedSubtasks(
      checkedSubtasks?.map((subtask) => {
        if (e.target.value == subtask?.name) {
          return { ...subtask, isDone: e.target.checked };
        }
        return subtask;
      })
    );
  };

  const checkedSubtasksTotal = checkedSubtasks?.filter((subtask) => subtask.isDone)?.length;

  return (
    <Modal id={modalId} setShowElips={setShowElips}>
      <div className="flex flex-col gap-y-3">
        <div className="flex justify-between items-center ">
          <h2 className="text-xl font-semibold">{filteredTask.title}</h2>
          <ElipsDropdown
            onDelete={() => dispatch(deleteTask({ taskId: id, columnId: columnId }))}
            parentModal={editModalId}
            taskModal={modalId}
            id={editModalId}
            show={showElips}
            setShow={setShowElips}
            name="Task"
          />
        </div>
        <p className="text-sm text-slate-500 ">{filteredTask.description.trim() !== "" ? filteredTask.description : "No description"}</p>
        <div className=" text-sm text-slate-500 flex flex-col gap-y-2">
          <p>Subtasks ({`${checkedSubtasksTotal} of ${checkedSubtasks.length}`})</p>
          {!checkedSubtasks?.length > 0
            ? "No subtasks"
            : checkedSubtasks?.map((sub, idx) => {
                return (
                  <div key={idx} className="w-full pl-3 gap-x-3 bg-blue-violet bg-opacity-10 h-8 flex items-center rounded-md">
                    <input onChange={onCheckedHandler} checked={sub.isDone} className="" type="checkbox" name={sub.name} id={sub.name} value={sub.name} />
                    <label className={twMerge("text-sm w-full font-medium", sub.isDone ? "line-through" : "")} htmlFor={sub.name}>
                      {sub.name}
                    </label>
                  </div>
                );
              })}
        </div>
        <div className="flex flex-col gap-y-2">
          <p className="text-sm text-slate-500 ">Current Status</p>
          <div className="relative flex justify-between">
            <select
              // defaultValue={data?.columnName}
              onChange={onStatusChangeHandler}
              className="w-full relative border-2 border-slate-300 appearance-none bg-transparent outline-blue-violet rounded-md h-9 pl-2"
              onClick={() => setIsSelectOpen((prevState) => !prevState)}
            >
              {boards
                .find((board) => board.isActive)
                .columns?.map((col) => {
                  return (
                    <option selected={col?.id == columnId} value={col?.id} key={col.id}>
                      {col?.name}
                    </option>
                  );
                })}
            </select>
            <Arrow isModalOpen={isSelectOpen} />
          </div>
        </div>
        <button className="bg-blue-violet bg-opacity-10 py-2 rounded-md text-slate-500 font-semibold" onClick={onSaveHandler}>
          Save Changes
        </button>
      </div>
    </Modal>
  );
}
