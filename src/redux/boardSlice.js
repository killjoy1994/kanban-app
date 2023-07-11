import { createSlice, current } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const loadedBoards = localStorage.getItem("boards");
const loadedData = JSON.parse(loadedBoards);

// console.log("LOADED: ", loadedData);

const initialState = {
  boards: loadedData || [],
  // boards: [],
  // selectedBoard: null,
  // selectedTask: null,
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    addNewBoard: (state, action) => {
      const { boardName, columns } = action.payload;
      const board = {
        id: uuidv4(),
        name: boardName,
        isActive: true,
        columns,
      };
      state.boards.push(board);
    },
    setActiveBoard: (state, action) => {
      // console.log("BOARD PAYLOAD", action.payload);
      if (state.boards) {
        state.boards.map((board) => {
          if (board.id == action.payload) {
            board.isActive = true;
          } else {
            board.isActive = false;
          }
        });
        state.activeBoard = state.boards.filter((board) => board.isActive);
      }
    },
    setActiveNewestBoard: (state, action) => {
      // console.log("active board: ", action.payload);
      if (state.boards) {
        state.boards.map((board, idx) => {
          if (idx !== action.payload) {
            board.isActive = false;
          }
          return board;
        });
      }
    },
    addTask: (state, action) => {
      const selectedColumn = action.payload.data.status;
      state.boards.map((board, idx) => {
        if (board.isActive) {
          const filteredIdx = board.columns.findIndex((column) => column.name == selectedColumn);
          const filteredColumn = board.columns[filteredIdx];
          if (filteredColumn.tasks) {
            filteredColumn.tasks = [...filteredColumn.tasks, action.payload.data];
          } else {
            filteredColumn.tasks = [action.payload.data];
          }
        }
      });
    },
    editBoard: (state, action) => {
      // console.log("EDITT")
      let board = state.boards.find((board) => board.isActive);
      board.name = action.payload.boardName;
      board.columns = action.payload.columns;
    },
    updateColumn: (state, action) => {
      const board = state.boards.find((board) => board.isActive);
      board.columns = action.payload.columns;
    },
    updateTask: (state, action) => {
      let data = action.payload.data;
      let board = state.boards.find((board) => board.isActive);
      let column = board.columns.find((col) => col.id === action.payload.columnId);
      // let task = column.tasks.find((task) => task.id === action.payload.taskId);
      // task = data;
      // column = { ...column, tasks: { ...data } };
      let index = column.tasks.findIndex((task) => task.id == action.payload.taskId);
      column.tasks[index] = data;
      column.tasks[index].subtasks = data.subtasks;

      console.log("TASK: ", current(board));
    },
    deleteTask: (state, action) => {
      console.log("HALLOOOOO");
      const board = state.boards.find((board) => board.isActive);
      const columnIdx = board.columns.findIndex((col) => col.id === action.payload.columnId);

      board.columns[columnIdx].tasks = board.columns[columnIdx].tasks.filter((task) => task.id != action.payload.taskId);
    },
    updateCurrentStatus: (state, action) => {
      // console.log("ACTION PAYLOAD: ", action.payload);
      const { taskId, updatedColumnId, currentColumnId } = action.payload;
      const selectedBoard = state.boards.find((board) => board.isActive);
      const prevCol = selectedBoard.columns.find((col) => col.id === currentColumnId);
      const updatedCol = selectedBoard.columns.find((col) => col.id == updatedColumnId);
      // const tasksIdx = currentCol.tasks.findIndex((task) => task.id == taskId);
      const checkedSubs = action.payload.checkedSubs;
      const selectedTask = prevCol?.tasks?.find((task) => task.id == taskId);

      selectedTask.subtasks.map((sub) => {
        if (checkedSubs.includes(sub.id)) {
          sub.isDone = true;
        } else {
          sub.isDone = false;
        }
        return sub;
      });

      prevCol.tasks = prevCol.tasks.filter((task) => task.id != taskId);
      if (!updatedCol.tasks) {
        updatedCol.tasks = [{ ...selectedTask, status: updatedCol.name }];
      } else {
        updatedCol.tasks = [...updatedCol.tasks, { ...selectedTask, status: updatedCol.name }];
      }
    },
  },
});

export const { addNewBoard, setActiveBoard, setActiveNewestBoard, editBoard, updateColumn, addTask, updateTask, deleteTask, updateCurrentStatus } =
  boardSlice.actions;

export default boardSlice.reducer;
