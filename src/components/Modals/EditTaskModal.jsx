import React, { useState } from "react";
import Modal from "./Modal";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import { twMerge } from "tailwind-merge";
import { customScrollbar } from "../../styles";
import { useDispatch, useSelector } from "react-redux";
import { addTask, updateTask } from "../../redux/boardSlice";
import Arrow from "../Elements/Arrow";
import { v4 as uuidv4 } from "uuid";
import * as Yup from "yup";

const TaskSchema = Yup.object().shape({
  title: Yup.string().min(4, "too short!").required("required"),
  subtasks: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required("required"),
    })
  ),
});

export default function EditTask({ id, columnId, taskModal }) {
  const editModalId = `EditTask${id}`;
  const dispatch = useDispatch();
  const { boards } = useSelector((state) => state.board);
  const board = boards.find((board) => board.isActive);
  const column = board.columns.find((col) => col.id === columnId);
  const task = column?.tasks.find((task) => task.id === id);

  // console.log("TASK: ", task);

  const [isSelectOpen, setIsSelectOpen] = useState(false);

  let status = boards?.find((board) => board.isActive)?.columns;

  let activeBoardIdx = boards.findIndex((board) => board.isActive);

  // console.log("BOARDS: ", boards);

  return (
    <Modal id={editModalId} className={twMerge("py-10 rounded-lg px-8", customScrollbar)}>
      <h2 className="mb-4 text-xl font-semibold">Edit Task</h2>
      <Formik
        initialValues={{
          id: task.id,
          title: task.title,
          description: task.description,
          subtasks: task.subtasks,
          status: task.status,
        }}
        validationSchema={TaskSchema}
        enableReinitialize={true}
        onSubmit={(values, { resetForm }) => {
          console.log("Values: ", values);
          dispatch(updateTask({ data: values, columnId: column.id, taskId: task.id }));
          resetForm();
          window[editModalId].close();
          window[taskModal].close();
        }}
      >
        {({ values, errors, touched }) => {
          console.log("HMMM: ", values);
          return (
            <Form className="flex flex-col gap-y-2">
              {/* =========== TITLE ============= */}
              <div className="flex flex-col gap-y-2">
                <label className="font-semibold text-slate-500" htmlFor="title">
                  Title
                </label>
                <div className="relative w-full">
                  <Field
                    className={twMerge(
                      "border-2 w-full  outline-none  rounded-[3px] h-9 pl-2",
                      touched.title && errors.title ? "border-red-500" : "border-slate-300 focus:border-blue-violet"
                    )}
                    type="text"
                    name="title"
                  />
                  <ErrorMessage className="absolute right-[10px] top-[6px] font-semibold text-red-400" name="title" component="span" />
                </div>
              </div>
              {/* =========== DESCRIPTION ============ */}
              <div className="flex flex-col gap-y-2">
                <label className="font-semibold text-slate-500" htmlFor="description">
                  Description
                </label>
                <Field
                  className="border-2 border-slate-300 outline-blue-violet rounded-md h-20  pl-2 pt-2 resize-none"
                  as="textarea"
                  type="text"
                  name="description"
                />
                <ErrorMessage name="description" />
              </div>
              {/* =========== SUBTASKS ============== */}
              <div className="flex flex-col gap-y-2">
                <label className="font-semibold text-slate-500" htmlFor="subtasks">
                  Subtasks
                </label>
                <FieldArray
                  name="subtasks"
                  render={(arrayHelper) => (
                    <div className="flex flex-col gap-y-3">
                      {values.subtasks.map((task, idx) => (
                        <div key={idx}>
                          <div className="flex gap-x-2 items-center">
                            <div className="relative w-full">
                              <Field
                                className={twMerge(
                                  "border-2 w-full  outline-none  rounded-[3px] h-9 pl-2",
                                  touched?.subtasks?.[idx]?.name && errors?.subtasks?.[idx]?.name
                                    ? "border-red-500"
                                    : "border-slate-300 focus:border-blue-violet"
                                )}
                                type="text"
                                name={`subtasks.${idx}.name`}
                              />
                              <ErrorMessage
                                className="absolute right-[10px] top-[6px] font-semibold text-red-400"
                                name={`subtasks.${idx}.name`}
                                component="span"
                              />
                            </div>
                            <button type="button" onClick={() => arrayHelper.remove(idx)}>
                              <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg">
                                <g fill="#828FA3" fillRule="evenodd">
                                  <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
                                  <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
                                </g>
                              </svg>
                            </button>
                          </div>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => {
                          // console.log("Initial Values: ", values);
                          arrayHelper.push({ name: "", isDone: false, id: uuidv4() });
                        }}
                        className="bg-blue-800 py-2 bg-opacity-10 text-opacity-80 hover:text-opacity-100 font-semibold text-blue-violet rounded-full w-full "
                      >
                        +Add New Subtask
                      </button>
                    </div>
                  )}
                />
              </div>
              {/* =========== STATUS ================ */}
              <div className="flex flex-col gap-y-2">
                <label className="font-semibold text-slate-500" htmlFor="status">
                  Status
                </label>
                <div className="relative w-full">
                  <Field
                    className="w-full relative border-2 border-slate-300 appearance-none bg-transparent outline-blue-violet rounded-md h-9 pl-2"
                    as="select"
                    name="status"
                    id="status"
                    // onClick={() => setIsSelectOpen((prevState) => !prevState)}
                  >
                    {status?.map((data, idx) => {
                      return (
                        <option key={idx} value={data.name} label={data.name}>
                          {data.name}
                        </option>
                      );
                    })}
                  </Field>
                  <Arrow isModalOpen={isSelectOpen} />
                </div>
                <ErrorMessage name="status" />
              </div>
              <button className="bg-blue-violet rounded-full text-white hover:bg-opacity-90 mt-4 py-2" type="submit">
                Edit Task
              </button>
            </Form>
          );
        }}
      </Formik>
    </Modal>
  );
}
