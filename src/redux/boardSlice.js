import { createSlice, current } from "@reduxjs/toolkit";

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
          const filteredColumn = state.boards[idx].columns[filteredIdx];
          if (filteredColumn.tasks) {
            filteredColumn.tasks = [...filteredColumn.tasks, action.payload.data];
          } else {
            filteredColumn.tasks = [action.payload.data];
          }
        }
      });
    },
    updateCurrentStatus: (state, action) => {
      const boardIdx = state.boards.findIndex((board) => board.isActive);
      const colIdx = state.boards[boardIdx].columns.findIndex((col) => col.name == action.payload.colName);
      const updatedColIdx = state.boards[boardIdx].columns.findIndex((col) => col.name == action.payload.val);
      const tasksIdx = state.boards[boardIdx].columns[colIdx].tasks.findIndex((task, idx) => idx == action.payload.id);
      const selectedTask = state.boards[boardIdx].columns[colIdx].tasks[tasksIdx];
      // console.log("ACTIVE BOARDDDD: ", current(state.boards[boardIdx].columns))
      state.boards[boardIdx].columns.map((col, idx) => {
        if(idx == colIdx) {
          col.tasks = col.tasks.filter((task, idx) => idx !== tasksIdx)
        } else if(idx == updatedColIdx) {
          // console.log("HELLO: ", current(selectedTask))
          col.tasks = [selectedTask]
        }
        console.log("COL: ", current(col))
        return col
      })
    },
  },
});

export const { addNewBoard, setActiveBoard, setActiveNewestBoard, addTask, updateCurrentStatus } = boardSlice.actions;
export default boardSlice.reducer;
