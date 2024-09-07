import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addTodoWithId,
  deleteTodoWithId,
  getTodosWithId,
  updateTodoWithId,
} from "../api/endpoints";
import { TodoType } from "../types/Types";
import { getAuthData } from "../utils/cookies";
import axios from "axios";

export const fetchTodosSupabase = createAsyncThunk<TodoType[], string>(
  "todos/fetchData", // Type string: Bu action'ın adıdır
  async (user_id: string, { rejectWithValue }) => {
    const { token } = getAuthData();
    if (!token) {
      return rejectWithValue("No access token found");
    }
    try {
      const response = await getTodosWithId(user_id, token);

      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(
          "Error fetching todos",
          error.response?.data || error.message
        );
        return rejectWithValue(error.response?.data || "Error fetching todos");
      } else {
        return rejectWithValue("An unknown error occurred");
      }
    }
  }
);

export const createTodoSupabase = createAsyncThunk<TodoType, TodoType>(
  "todos/createTodo",
  async (todo: TodoType, { rejectWithValue }) => {
    const { token } = getAuthData();
    if (!token) {
      return rejectWithValue("No access token found");
    }
    try {
      const response = await addTodoWithId(todo, token);

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
    const { token } = getAuthData();
    if (!token) {
      return rejectWithValue("No access token found");
    }
    try {
      await deleteTodoWithId(id, token);
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
    const { token } = getAuthData();
    if (!token) {
      return rejectWithValue("No access token found");
    }
    try {
      const response = await updateTodoWithId(todo.id, todo, token);
      console.log("edittodusupabse", response);
      return response;
    } catch (error) {
      console.log("Error posting todos", error);
      return rejectWithValue("Failed to update todo");
    }
  }
);
