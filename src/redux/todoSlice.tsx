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
    // createTodo: (state: TodoInitialState, action: PayloadAction<TodoType>) => {
    //   state.todos = [...state.todos, action.payload];
    // },
    // removeTodoById: (
    //   state: TodoInitialState,
    //   action: PayloadAction<number>
    // ) => {
    //   state.todos = state.todos.filter(
    //     (todo: TodoType) => todo.id !== action.payload
    //   );
    // },
    // editContentById: (
    //   state: TodoInitialState,
    //   action: PayloadAction<TodoType>
    // ) => {
    //   state.todos = state.todos.map((todo: TodoType) =>
    //     todo.id === action.payload.id
    //       ? {
    //           ...todo,
    //           content: action.payload.description,
    //           title: action.payload.title,
    //         }
    //       : todo
    //   );
    // },
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
      })
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
          console.log("Payload:", action.payload);

          if (action.payload && action.payload.id) {
            const index = state.todos.findIndex(
              (todo) => todo.id === action.payload.id
            );
            if (index !== -1) {
              state.todos[index] = action.payload;
            }
          } else {
            console.error(
              "Action payload is missing or does not have an id:",
              action.payload
            );
          }
        }
      );
  },
});

export const { setTodos } = todoSlice.actions;
export default todoSlice.reducer;
