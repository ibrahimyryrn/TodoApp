import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TodoInitialState, TodoType } from "../types/Types";
import { fetchTodosSupabase } from "./supabaseSlice";

export const initialState: TodoInitialState = {
  todos: [],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    // createTodo: (state: TodoInitialState, action: PayloadAction<TodoType>) => {
    //   state.todos = [...state.todos, action.payload];
    // },
    removeTodoById: (
      state: TodoInitialState,
      action: PayloadAction<number>
    ) => {
      state.todos = state.todos.filter(
        (todo: TodoType) => todo.id !== action.payload
      );
    },
    editContentById: (
      state: TodoInitialState,
      action: PayloadAction<TodoType>
    ) => {
      state.todos = state.todos.map((todo: TodoType) =>
        todo.id === action.payload.id
          ? {
              ...todo,
              content: action.payload.description,
              title: action.payload.title,
            }
          : todo
      );
    },
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
      .addCase(fetchTodosSupabase.rejected, (_, action) => {
        // Hata durumunu ele alın
        console.error("Failed to fetch todos:", action.payload);
      });
  },
});

export const { removeTodoById, editContentById, setTodos } = todoSlice.actions;
export default todoSlice.reducer;
