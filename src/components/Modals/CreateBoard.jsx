import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import React, { useState } from "react";
import Modal from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import { addNewBoard, setActiveNewestBoard } from "../../redux/boardSlice";

export default function CreateBoard() {
  const {boards} = useSelector(state => state.board)
  const dispatch = useDispatch();
  return (
    <Modal id="CreateBoard">
      <h2 className="mb-4 text-xl font-semibold">Add New Board</h2>
      <Formik
        initialValues={{
          boardName: "",
          columns: [{ name: "" }],
        }}
        
        onSubmit={(values, {resetForm}) => {
          dispatch(addNewBoard(values))
          resetForm()
          window.CreateBoard.close()
        }}
      >
        {({ values }) => (
          <Form className="flex flex-col gap-y-2">
            <div className="flex flex-col gap-y-2">
              <label className="font-semibold text-slate-500" htmlFor="boardName">
                Name
              </label>
              <Field className="border-2 border-slate-300 outline-blue-violet rounded-md h-9 pl-2" type="text" name="boardName" />
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
                              className="border-2 border-slate-300 outline-blue-violet rounded-md grow h-9 pl-2"
                              type="text"
                              name={`columns.${idx}.name`}
                            />
                            {values.columns.length > 1 && (
                              <button type="button" onClick={() => arrayHelpers.remove(idx)}>
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
                          arrayHelpers.push({name: ""});
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
            <button onClick={() => dispatch(setActiveNewestBoard(boards.length))} className="bg-blue-violet rounded-full text-white hover:bg-opacity-90 mt-4 py-2" type="submit">
              Create Board
            </button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}
