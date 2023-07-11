import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import React, { useState } from "react";
import Modal from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import { addNewBoard, setActiveNewestBoard, updateColumn } from "../../redux/boardSlice";
import { v4 as uuidv4 } from "uuid";
import { twMerge } from "tailwind-merge";

export default function AddColumn() {
  const { boards } = useSelector((state) => state.board);
  let board = boards.find((board) => board.isActive);
  const dispatch = useDispatch();
  console.log(board);
  return (
    <Modal id="AddColumn">
      <h2 className="mb-4 text-xl font-semibold">Add New Column</h2>
      <Formik
        initialValues={{
          boardName: board.name,
          columns: board?.columns,
        }}
        onSubmit={(values, { resetForm }) => {
            console.log("values: ", values)
          dispatch(updateColumn(values));
          // resetForm();
          window.AddColumn.close();
        }}
      >
        {({ values }) => (
          <Form className="flex flex-col gap-y-2">
            <div className="flex flex-col gap-y-2">
              <label className="font-semibold text-slate-500" htmlFor="boardName">
                Name
              </label>
              <Field
                className="border-2 border-slate-300 outline-blue-violet rounded-md h-9 pl-2"
                type="text"
                placeholder={board?.name}
                name="boardName"
                disabled
              />
              <ErrorMessage name="boardName" />
            </div>
            <div>
              <label className="font-semibold text-slate-500" htmlFor="columns">
                Column
              </label>
              <FieldArray
                name="columns"
                render={(arrayHelpers) => {
                  return (
                    <div className="flex flex-col gap-y-3">
                      {values.columns.map((task, idx) => (
                        <div key={idx}>
                          <div className="flex gap-x-2 items-center">
                            <Field
                              className={twMerge("border-2 border-slate-300 outline-blue-violet rounded-md grow h-9 pl-2", idx == 0 ? "": "")}
                              type="text"
                              name={`columns.${idx}.name`}
                              disabled={idx === 0}
                            />
                            {values.columns.length > 1 && (
                              <button
                                className={idx == 0 ? "opacity-0" : ""}
                                type="button"
                                onClick={() => {
                                  if (idx !== 0) {
                                    arrayHelpers.remove(idx);
                                  }
                                }}
                              >
                                <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg">
                                  <g fill="#828FA3" fillRule="evenodd">
                                    <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
                                    <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
                                  </g>
                                </svg>
                              </button>
                            )}
                          </div>
                          <ErrorMessage name="title" />
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => {
                          arrayHelpers.push({ name: "", id: uuidv4() });
                        }}
                        className="bg-blue-800 py-2 bg-opacity-10 text-opacity-80 hover:text-opacity-100 font-semibold text-blue-violet rounded-full w-full "
                      >
                        +Add New Column
                      </button>
                    </div>
                  );
                }}
              />
            </div>
            <button
            //   onClick={() => dispatch(setActiveNewestBoard(boards.length))}
              className="bg-blue-violet rounded-full text-white hover:bg-opacity-90 mt-4 py-2"
              type="submit"
            >
              Save Changes
            </button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}