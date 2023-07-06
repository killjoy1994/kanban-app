import { createSlice, current } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

// const loadedBoards = localStorage.getItem("data");
// const loadedData = JSON.parse(loadedBoards);

// console.log("LOADED: ", loadedData);

const initialState = {
  // boards: loadedData.boards || [],
  boards: [],
  selectedBoard: null,
  selectedTask: null,
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
      // localStorage.setItem("data", [
      //   JSON.stringify({
      //     boards: [board],
      //   }),
      // ]);
    },
    setActiveBoard: (state, action) => {
      console.log("BOARD PAYLOAD", action.payload);
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
      console.log("active board: ", action.payload);
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
    updateCurrentStatus: (state, action) => {
      const { taskId, updatedColumnId, currentColumnId } = action.payload;
      const selectedBoard = state.boards.find((board) => board.isActive);
      const prevCol = selectedBoard.columns.find((col) => col.id === currentColumnId);
      const updatedCol = selectedBoard.columns.find((col) => col.id == updatedColumnId);
      // const tasksIdx = currentCol.tasks.findIndex((task) => task.id == taskId);
      const selectedTask = prevCol?.tasks?.find((task) => task.id == taskId);
      // console.log("TEST BOARDDDD1: ", current(selectedTask));
      // console.log("TEST BOARDDDD2: ", current(prevCol));
      // console.log("TEST BOARDDDD3: ", current(updatedCol));

      prevCol.tasks = prevCol.tasks.filter((task) => task.id != taskId);
      if (!updatedCol.tasks) {
        updatedCol.tasks = [{ ...selectedTask, status: updatedCol.name }];
      } else {
        updatedCol.tasks = [...updatedCol.tasks, { ...selectedTask, status: updatedCol.name }];
      }
    },
  },
});

export const { addNewBoard, setActiveBoard, setActiveNewestBoard, addTask, updateCurrentStatus } = boardSlice.actions;
export default boardSlice.reducer;
