import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TodoInitialState, TodoType } from "../types/Types";
import {
  editTodoSupabase,
  fetchTodosSupabase,
  removeTodoSupabase,
} from "./supabaseSlice";

export const initialState: TodoInitialState = {
  todos: [],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setTodos: (state: TodoInitialState, action: PayloadAction<TodoType[]>) => {
      state.todos = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchTodosSupabase.fulfilled,
        (state: TodoInitialState, action: PayloadAction<TodoType[]>) => {
          state.todos = action.payload;
        }
      )
      // .addCase(fetchTodosSupabase.rejected, (_, action) => {
      //   console.error("Failed to fetch todos:", action.payload);
      // })
      .addCase(
        removeTodoSupabase.fulfilled,
        (state: TodoInitialState, action: PayloadAction<number>) => {
          state.todos = state.todos.filter(
            (todo) => todo.id !== action.payload
          );
        }
      )
      .addCase(
        editTodoSupabase.fulfilled,
        (state: TodoInitialState, action: PayloadAction<TodoType>) => {
          const updatedTodo = action.payload;
          if (updatedTodo && updatedTodo.id) {
            state.todos = state.todos.map((todo) =>
              todo.id === updatedTodo.id ? updatedTodo : todo
            );
          } else {
            console.error(
              "Action payload is missing or does not have an id:",
              action.payload
            );
          }
        }
      )
      .addCase(editTodoSupabase.rejected, (_, action) => {
        console.error("Failed to edit todo:", action.payload);
      });
  },
});

export const { setTodos } = todoSlice.actions;
export default todoSlice.reducer;
