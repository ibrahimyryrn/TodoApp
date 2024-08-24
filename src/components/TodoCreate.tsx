import { useState } from "react";
import { useDispatch } from "react-redux";
import { TodoType } from "../types/Types";
import { createTodo } from "../redux/todoSlice";
import Button from "./Button";
import Input from "./Input";

function TodoCreate() {
  const [newTodo, setNewTodo] = useState("");
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

  return (
    <div className="flex items-center flex-col mt-5 w-[500px] ">
      <Input
        type={"text"}
        className={"w-full border-b border-gray-300 outline-none"}
        value={newTodo}
        placeholder={"Create a Todo"}
        onChange={handleInputChange}
      />
      <Button
        className={
          "w-20 mt-2 border border-gray-400 rounded-lg bg-orange-200 font-medium"
        }
        onClick={handleCreateTodo}
      >
        Add
      </Button>
    </div>
  );
}

export default TodoCreate;
