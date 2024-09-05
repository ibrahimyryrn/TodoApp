import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../redux/todoSlice";
import userIdReducer from "../redux/userIdSlice";

export const store = configureStore({
  reducer: {
    todo: todoReducer,
    userEmail: userIdReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
