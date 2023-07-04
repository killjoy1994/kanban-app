import { createSlice } from "@reduxjs/toolkit";

const boardSlice = createSlice({
  name: "board",
  initialState: {
    boards: [],
  },
  reducers: {
    addNewBoard: (state, action) => {
      const { boardName, columns } = action.payload;
      state.boards.push({
        name: boardName,
        isActive: true,
        columns,
      });
    },
    setActiveBoard: (state, action) => {
      console.log("BOARD PAYLOAD", action.payload);
      if (state.boards) {
        state.boards.map((board, idx) => {
          if (idx == action.payload) {
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
        if (idx == action.payload.idx) {
          const filteredIdx = board.columns.findIndex((column) => column.name == selectedColumn);
          const filteredColumn = state.boards[idx].columns[filteredIdx]
          if (filteredColumn.tasks) {
            filteredColumn.tasks = [...filteredColumn.tasks, action.payload.data];
          } else {
            filteredColumn.tasks = [action.payload.data];
          }
        }
      });
    },
  },
});

export const { addNewBoard, setActiveBoard, setActiveNewestBoard, addTask } = boardSlice.actions;
export default boardSlice.reducer;
