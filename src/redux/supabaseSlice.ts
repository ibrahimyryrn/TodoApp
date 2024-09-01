import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addTodoWithId,
  deleteTodoWithId,
  getTodosWithId,
  updateTodoWithId,
} from "../api/endpoints";
import { TodoType } from "../types/Types";
import { getToken } from "../utils/cookies";

const accessToken = getToken();

export const fetchTodosSupabase = createAsyncThunk<TodoType[], string>(
  "todos/fetchData", // Type string: Bu action'ın adıdır
  async (user_id: string, { rejectWithValue }) => {
    if (!accessToken) {
      return rejectWithValue("No access token found");
    }
    try {
      const response = await getTodosWithId(user_id, accessToken);
      console.log(response);
      return response;
    } catch (error) {
      console.log("Error fetching todos", error);
      return rejectWithValue("Error fetching todos");
    }
  }
);

export const createTodoSupabase = createAsyncThunk<TodoType, TodoType>(
  "todos/createTodo",
  async (todo: TodoType, { rejectWithValue }) => {
    if (!accessToken) {
      return rejectWithValue("No access token found");
    }
    try {
      const response = await addTodoWithId(todo, accessToken);

      return response;
    } catch (error) {
      console.log("Error posting todos", error);
      return rejectWithValue("Failed to add todo");
    }
  }
);

export const removeTodoSupabase = createAsyncThunk<number, number>(
  "todos/removeTodo",
  async (id: number, { rejectWithValue }) => {
    if (!accessToken) {
      return rejectWithValue("No access token found");
    }
    try {
      await deleteTodoWithId(id, accessToken);
      return id;
    } catch (error) {
      console.log("Error posting todos", error);
      return rejectWithValue("Failed to delete todo");
    }
  }
);

export const editTodoSupabase = createAsyncThunk<TodoType, TodoType>(
  "todos/editTodo",
  async (todo: TodoType, { rejectWithValue }) => {
    if (!accessToken) {
      return rejectWithValue("No access token found");
    }
    try {
      const response = await updateTodoWithId(todo.id, todo, accessToken);
      return response;
    } catch (error) {
      console.log("Error posting todos", error);
      return rejectWithValue("Failed to update todo");
    }
  }
);
