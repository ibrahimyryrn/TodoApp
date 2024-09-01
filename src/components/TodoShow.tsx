import { DeleteOutlined, DragOutlined, EditOutlined } from "@ant-design/icons";
import { TodoType } from "../types/Types";
// import { editContentById } from "../redux/todoSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { DraggableProvided } from "react-beautiful-dnd";
import Modal from "./Modal";
import Button from "./Button";
import Input from "./Input";
import {
  editTodoSupabase,
  fetchTodosSupabase,
  removeTodoSupabase,
} from "../redux/supabaseSlice";
import { AppDispatch, RootState } from "../redux/store";
import { useSelector } from "react-redux";

interface TodoProps {
  todo: TodoType;
  dragHandleProps: DraggableProvided["dragHandleProps"];
}

const TodoShow: React.FC<TodoProps> = ({ todo, dragHandleProps }) => {
  const { id, description, title } = todo;
  const dispatch = useDispatch<AppDispatch>();
  const [isChecked, setIsChecked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTodo, setEditTodo] = useState(description);
  const [editTodoTitle, setEditTodoTitle] = useState(title);
  const { userId } = useSelector((state: RootState) => state.userId);

  const handleRemove = () => {
    dispatch(removeTodoSupabase(id));
  };

  const handleEdit = () => {
    setEditTodo(description);
    setEditTodoTitle(title);
    setIsModalOpen(true); // Modal'ı aç
  };
  const handleEditContent = async () => {
    if (!id) {
      console.error("ID is missing");
      return;
    }

    const payload = {
      id,
      description: editTodo,
      title: editTodoTitle,
    };

    try {
      await dispatch(editTodoSupabase(payload)).unwrap();
      setIsModalOpen(false); // Modal'ı kapat
    } catch (error) {
      console.error("Failed to update todo:", error);
    }
  };

  // const user_id = "98b806e0-a72a-4c95-8f62-08a08f50f5c8";

  useEffect(() => {
    dispatch(fetchTodosSupabase(userId));
    console.log("useeffect çalıştı");
  }, [dispatch, isModalOpen, userId]);

  const handleCheckboxChange = () => {
    setIsChecked((prev) => !prev);
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <ul
        className={`flex items-center w-auto mt-3 p-1 gap-3 ${
          isChecked ? "line-through" : ""
        }`}
      >
        <div className="flex items-center flex-col mt-5 w-[500px] space-y-4 border border-gray-300 p-4 rounded">
          <div className="w-full">
            <div className="flex justify-between mb-4">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
                className="form-checkbox h-4 w-4"
              />
              <li className="text-center font-bold">{title}</li>
              <div>
                <DeleteOutlined
                  className="cursor-pointer mr-1"
                  onClick={handleRemove}
                />
                <EditOutlined
                  className="cursor-pointer mr-1"
                  onClick={handleEdit}
                />
                <DragOutlined {...dragHandleProps} />
              </div>
            </div>
            <li className="text-center">{description}</li>
          </div>
        </div>
      </ul>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="flex items-center flex-col mt-5 space-y-4 border border-gray-300 p-4 rounded">
          <h2 className="text-xl font-semibold">Edit Todo</h2>
          <div className="w-full">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Title
            </label>
            <Input
              type="text"
              value={editTodoTitle}
              onChange={(e) => setEditTodoTitle(e.target.value)}
              placeholder="Edit todo title"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
            />
          </div>
          <div className="w-full">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Description
            </label>
            <Input
              type="text"
              value={editTodo}
              onChange={(e) => setEditTodo(e.target.value)}
              placeholder="Edit todo content"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
            />
          </div>

          <Button
            onClick={handleEditContent}
            className="w-40 h-10 mt-2 p-1 border border-gray-400 rounded-lg bg-black font-medium text-white hover:bg-blue-700"
          >
            Save Task
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default TodoShow;
