import axios, { AxiosResponse } from "axios";
import { TodoType } from "../types/Types";

//GET PART
export const getTodosWithId = async (
  userId: string,
  accessToken: string
): Promise<TodoType[]> => {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    apikey: `${import.meta.env.VITE_SUPABASE_API_KEY}`,
  };

  const response: AxiosResponse<TodoType[]> = await axios.get(
    `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/todos?user_id=eq.${userId}`,
    { headers }
  );

  return response.data;
};

//POST PART
export const addTodoWithId = async (
  todo: TodoType,
  accessToken: string
): Promise<TodoType> => {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    apikey: `${import.meta.env.VITE_SUPABASE_API_KEY}`,
    "Content-Type": "application/json",
  };

  const response = await axios.post(
    `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/todos`,
    todo,
    {
      headers,
    }
  );
  return response.data;
};

//DELETE PART
export const deleteTodoWithId = async (
  id: number,
  accessToken: string
): Promise<void> => {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    apikey: `${import.meta.env.VITE_SUPABASE_API_KEY}`,
  };

  await axios.delete(
    `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/todos?id=eq.${id}`,
    { headers }
  );
};
//PATCH PART
export const updateTodoWithId = async (
  id: number,
  todo: TodoType,
  accessToken: string
): Promise<TodoType> => {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    apikey: `${import.meta.env.VITE_SUPABASE_API_KEY}`,
    "Content-Type": "application/json",
  };
  const response = await axios.patch(
    `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/todos?id=eq.${id}`,
    todo,
    { headers }
  );
  console.log("Yanıt verisi:", response); 
  return response.data[0];
};

export const updateTodoCompletionStatus = async (
  id: number,
  isCompleted: boolean | undefined,
  accessToken: string | undefined
): Promise<void> => {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    apikey: `${import.meta.env.VITE_SUPABASE_API_KEY}`,
    "Content-Type": "application/json",
  };

  try {
    await axios.patch(
      `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/todos?id=eq.${id}`,
      { is_completed: isCompleted },
      { headers }
    );
    console.log("Todo başarıyla güncellendi");
  } catch (error) {
    console.error("Todo güncellenirken bir hata oluştu:", error);
  }
};
