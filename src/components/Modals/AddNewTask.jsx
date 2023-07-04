import React, { useState } from "react";
import Modal from "./Modal";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import { twMerge } from "tailwind-merge";
import { customScrollbar } from "../../styles";
import { useSelector } from "react-redux";

export default function AddNewTask() {
  const { boards } = useSelector((state) => state.board);
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  let status = boards?.find(board => board.isActive)?.columns;
  // console.log("FIltered: ", filteredColumn)

  const colors = ["Red", "Green", "Blue"];
  return (
    <Modal id="AddNewTask" className={twMerge("py-10 rounded-lg px-8", customScrollbar)}>
      <h2 className="mb-4 text-xl font-semibold">Add New Task</h2>
      <Formik
        initialValues={{
          title: "",
          description: "",
          subtasks: [""],
          status: "",
        }}
        onSubmit={(values) => {
          console.log("Values: ", values);
        }}
      >
        {({ values }) => {
          return (
            <Form className="flex flex-col gap-y-2">
              {/* =========== TITLE ============= */}
              <div className="flex flex-col gap-y-2">
                <label className="font-semibold text-slate-500" htmlFor="title">
                  Title
                </label>
                <Field className="border-2 border-slate-300 outline-blue-violet rounded-md h-9 pl-2" type="text" name="title" />
                <ErrorMessage name="title" />
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
                            <Field className="border-2 border-slate-300 outline-blue-violet rounded-md grow h-9 pl-2" type="text" name={`subtasks.${idx}`} />
                            <button type="button" onClick={() => arrayHelper.remove(idx)}>
                              <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg">
                                <g fill="#828FA3" fillRule="evenodd">
                                  <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
                                  <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
                                </g>
                              </svg>
                            </button>
                          </div>
                          <ErrorMessage name="title" />
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => {
                          console.log("Initial Values: ", values);
                          arrayHelper.push("");
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
                    onClick={() => setIsSelectOpen((prevState) => !prevState)}
                  >
                    {status?.map((data, idx) => {
                      return (
                        <option key={idx} value={data.name}>
                          {data.name}
                        </option>
                      );
                    })}
                  </Field>
                  <span className="absolute top-[40%] right-3">
                    <svg
                      className={isSelectOpen ? "transition duration-400 rotate-180" : "transition duration-400"}
                      width="10"
                      height="7"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path stroke="#635FC7" strokeWidth="2" fill="none" d="m1 1 4 4 4-4" />
                    </svg>
                  </span>
                </div>
                <ErrorMessage name="status" />
              </div>
              <button className="bg-blue-violet rounded-full text-white hover:bg-opacity-90 mt-4 py-2" type="submit">
                Create Task
              </button>
            </Form>
          );
        }}
      </Formik>
    </Modal>
  );
}
