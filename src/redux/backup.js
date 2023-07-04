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
      console.log("BOARD PAYLOAD", action.payload)
      if(state.boards) {
        state.boards.map((board, idx) => {
          if(idx == action.payload) {
            board.isActive = true
          } else {
            board.isActive = false
          }
        })
        state.activeBoard = state.boards.filter(board => board.isActive)
      }

    },
    setActiveNewestBoard: (state, action) => {
      if (state.boards) {
        state.boards.map((board,idx) => {
          if(idx !== action.payload) {
            board.isActive = false
          } 
          return board
        });
      }
    },
  },
});

export const { addNewBoard, setActiveBoard, setActiveNewestBoard } = boardSlice.actions;
export default boardSlice.reducer;
