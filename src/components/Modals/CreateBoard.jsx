import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import React, { useRef, useState } from "react";
import Modal from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import { addNewBoard, setActiveBoard, setActiveNewestBoard } from "../../redux/boardSlice";
import { v4 as uuidv4 } from "uuid";
import * as Yup from "yup";
import { twMerge } from "tailwind-merge";

const BoardSchema = Yup.object().shape({
  boardName: Yup.string().min(2, "too short").required("required"),
  columns: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required("required"),
    })
  ),
});

export default function CreateBoard() {
  const { boards } = useSelector((state) => state.board);
  const dispatch = useDispatch();
  const formikRef = useRef(null);

  return (
    <Modal
      id="CreateBoard"
      reset={() => {
        if (formikRef.current) {
          formikRef.current.resetForm();
        }
      }}
    >
      <h2 className="mb-4 text-xl font-semibold">Add New Board</h2>
      <Formik
        innerRef={formikRef}
        initialValues={{
          boardName: "",
          columns: [{ name: "", id: uuidv4() }],
        }}
        validationSchema={BoardSchema}
        onSubmit={(values, { resetForm }) => {
          dispatch(addNewBoard(values));
          dispatch(setActiveNewestBoard(boards.length));
          resetForm();
          window.CreateBoard.close();
        }}
      >
        {({ values, errors, touched, isSubmitting }) => (
          <Form className="flex flex-col gap-y-2">
            <div className="flex flex-col gap-y-2">
              <label className="font-semibold text-slate-500" htmlFor="boardName">
                Name
              </label>
              <div className="w-full relative">
                <Field
                  className={twMerge(
                    "border-2 w-full  outline-none  rounded-[3px] h-9 pl-2",
                    touched.boardName && errors.boardName ? "border-red-500" : "border-slate-300 focus:border-blue-violet"
                  )}
                  type="text"
                  name="boardName"
                />
                <ErrorMessage className="absolute right-[10px] top-[6px] font-semibold text-red-500" name="boardName" component="span" />
              </div>
            </div>
            <div>
              <label className="font-semibold text-slate-500" htmlFor="columns">
                Column
              </label>
              <FieldArray
                name="columns"
                render={(arrayHelpers) => {
                  return (
                    <div className="flex flex-col mt-2 gap-y-3">
                      {values.columns.map((task, idx) => (
                        <div key={idx}>
                          <div className="flex gap-x-2 items-center">
                            <div className="w-full relative">
                              <Field
                                className={twMerge(
                                  "border-2 w-full outline-none rounded-[3px] grow h-9 pl-2",
                                  touched?.columns?.[idx]?.name && errors?.columns?.[idx]?.name ? "border-red-500" : "border-slate-300 focus:border-blue-violet"
                                )}
                                type="text"
                                name={`columns.${idx}.name`}
                              />
                              <ErrorMessage
                                className="absolute right-[10px] top-[6px] font-semibold text-red-500"
                                name={`columns.${idx}.name`}
                                component="span"
                              />
                            </div>
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
            <button className="bg-blue-violet rounded-full text-white hover:bg-opacity-90 mt-4 py-2" type="submit">
              Create Board
            </button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}
