import React from "react";
import Modal from "./Modal";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";

export default function AddNewTask() {
  return (
    <Modal>
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
                <Field className="border-2 border-slate-300 outline-blue-violet rounded-sm h-10 pl-2" type="text" name="title" />
                <ErrorMessage name="title" />
              </div>
              {/* =========== DESCRIPTION ============ */}
              <div className="flex flex-col gap-y-2">
                <label className="font-semibold text-slate-500" htmlFor="description">
                  Description
                </label>
                <Field
                  className="border-2 border-slate-300 outline-blue-violet rounded-sm h-20  pl-2 pt-2 resize-none"
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
                            <Field className="border-2 border-slate-300 outline-blue-violet rounded-sm grow h-10 pl-2" type="text" name={`subtasks.${idx}`} />
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
                        className="bg-cyan-100 py-1 rounded-full w-full mt-3"
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
                <Field className="border-2 border-slate-300 outline-blue-violet rounded-sm h-10 pl-2" type="text" name="status" />
                <ErrorMessage name="status" />
              </div>
              <button type="submit">Create Task</button>
            </Form>
          );
        }}
      </Formik>
    </Modal>
  );
}
