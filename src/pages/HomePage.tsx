import { useEffect } from "react";
import TodoCreate from "../components/TodoCreate";
import TodoList from "../components/TodoList";
import { getTodosWithId } from "../api/endpoints";

function HomePage() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTodosWithId(
          "98b806e0-a72a-4c95-8f62-08a08f50f5c8",
          `${import.meta.env.VITE_SUPABASE_API_KEY}`
        );
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <TodoCreate />
      <TodoList />
    </>
  );
}

export default HomePage;
