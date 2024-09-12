import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Button from "./Button";
import Input from "./Input";
import Modal from "./Modal";
import { createTodoSupabase, fetchTodosSupabase } from "../redux/supabaseSlice";
import { AppDispatch } from "../redux/store";
import { getAuthData, removeAuthData } from "../utils/cookies";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function TodoCreate() {
  const [newTodo, setNewTodo] = useState("");
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  // const { todos } = useSelector((state: RootState) => state.todo);
  const dispatch = useDispatch<AppDispatch>();
  // const { userId } = useSelector((state: RootState) => state.userId);
  const { userId } = getAuthData();
  const navigate = useNavigate();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  function handleCreateTodo() {
    if (newTodo.trim().length === 0) {
      alert("Create a Description");
      return;
    }
    if (newTodoTitle.trim().length === 0) {
      alert("Create a Title");
      return;
    }
    function generateUniqueId() {
      return Math.floor(Math.random() * 10000);
    }

    const payload = {
      id: generateUniqueId(),
      user_id: userId || "",
      description: newTodo,
      title: newTodoTitle,
    };
    // const user_id = "98b806e0-a72a-4c95-8f62-08a08f50f5c8";
    // const fetchData = dispatch(fetchTodosSupabase(user_id));
    // dispatch(createTodo(fetchData));
    dispatch(createTodoSupabase(payload));
    setIsCreated(true);
    setNewTodo("");
    setNewTodoTitle("");
    closeModal();
  }
  // const user_id = "98b806e0-a72a-4c95-8f62-08a08f50f5c8";
  useEffect(() => {
    console.log("burda");
    const { userId } = getAuthData();
    if (userId) {
      dispatch(fetchTodosSupabase(userId));
    } else {
      console.error("User ID is undefined");
    }
    setIsCreated(false);
  }, [dispatch, isCreated]);

  const handleLogout = async () => {
    const { token } = getAuthData();

    try {
      await axios.post(
        "https://oznnkyasreusdkcvhggc.supabase.co/auth/v1/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            apikey: `${import.meta.env.VITE_SUPABASE_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      removeAuthData();

      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="w-[508px] h-10 mt-6">
      <div className="flex justify-between">
        <h1 className="font-bold text-3xl">Todo List</h1>
        <div className="flex gap-4">
          <Button
            onClick={openModal}
            className="px-4 py-2 bg-black text-white rounded hover:bg-blue-700"
          >
            Add Task
          </Button>
          <Button
            className="px-4 py-2 bg-black text-white rounded hover:bg-blue-700 ml-auto"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="flex items-center flex-col mt-5 space-y-4 border border-gray-300 p-4 rounded">
          <div className="w-full">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Title
            </label>
            <Input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
              value={newTodoTitle}
              placeholder="Create a Todo Title"
              onChange={(e) => setNewTodoTitle(e.target.value)}
            />
          </div>
          <div className="w-full">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Description
            </label>
            <Input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
              value={newTodo}
              placeholder="Create a Todo"
              onChange={(e) => setNewTodo(e.target.value)}
            />
          </div>
          <Button
            className="w-40 mt-2 p-1 border border-gray-400 rounded-lg bg-black font-medium text-white hover:bg-blue-700"
            onClick={handleCreateTodo}
          >
            Add Task
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default TodoCreate;
