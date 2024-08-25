import axios from "axios";

export const getTodosWithId = async (userId: string, accessToken: string) => {
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    apikey: `${import.meta.env.VITE_SUPABASE_API_KEY}`,
  };

  return await axios.get(
    `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/todos?user_id=eq.${userId}`,
    { headers }
  );
};
