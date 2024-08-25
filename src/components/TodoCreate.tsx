import { useState } from "react";
import { useDispatch } from "react-redux";
import { TodoType } from "../types/Types";
import { createTodo } from "../redux/todoSlice";
import Button from "./Button";
import Input from "./Input";

function TodoCreate() {
  const [newTodo, setNewTodo] = useState("");
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const dispatch = useDispatch();

  function handleCreateTodo() {
    if (newTodo.trim().length == 0) {
      alert("Create a Todo");
      return;
    }

    const payload: TodoType = {
      id: Math.floor(Math.random() * 99999),
      content: newTodo,
    };
    dispatch(createTodo(payload));
    setNewTodo("");
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoTitle(e.target.value);
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">To-Do List</h1>
      <div className="flex items-center flex-col mt-5 w-[500px] space-y-4 border border-gray-300 p-4 rounded">
        <div className="w-full ">
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Title
          </label>
          <Input
            type={"text"}
            className={
              "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
            }
            value={newTodoTitle}
            placeholder={"Create a Todo Title"}
            onChange={handleTitleChange}
          />
        </div>
        <div className="w-full">
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Description
          </label>
          <Input
            type={"text"}
            className={
              "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
            }
            value={newTodo}
            placeholder={"Create a Todo"}
            onChange={handleInputChange}
          />
        </div>
        <Button
          className="w-40 mt-2 p-1 border border-gray-400 rounded-lg bg-black font-medium text-white"
          onClick={handleCreateTodo}
        >
          Add Task
        </Button>
      </div>
    </>
  );
}

export default TodoCreate;
