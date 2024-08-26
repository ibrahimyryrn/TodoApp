import { useState } from "react";
import { useDispatch } from "react-redux";
import { createTodo } from "../redux/todoSlice";
import Button from "./Button";
import Input from "./Input";
import Modal from "./Modal";

function TodoCreate() {
  const [newTodo, setNewTodo] = useState("");
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

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

    const payload = {
      id: Math.floor(Math.random() * 99999),
      content: newTodo,
      title: newTodoTitle,
    };
    dispatch(createTodo(payload));
    setNewTodo("");
    setNewTodoTitle("");
    closeModal();
  }

  return (
    <div className="w-[508px] h-10 mt-6">
      <div className="flex justify-between">
        <h1 className="font-bold text-3xl">Todo List</h1>
        <Button
          onClick={openModal}
          className="px-4 py-2 bg-black text-white rounded hover:bg-blue-700"
        >
          Add Task
        </Button>
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
