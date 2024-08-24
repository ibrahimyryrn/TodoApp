import { DeleteOutlined, DragOutlined, EditOutlined } from "@ant-design/icons";
import { TodoType } from "../types/Types";
import { editContentById, removeTodoById } from "../redux/todoSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";

interface TodoProps {
  todo: TodoType;
}

const TodoShow: React.FC<TodoProps> = ({ todo }) => {
  const { id, content } = todo;
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [editTodo, setEditTodo] = useState(content);

  function handleRemove() {
    dispatch(removeTodoById(id));
  }
  function handleEdit() {
    setIsEdit((prev) => !prev);
  }

  function handleEditContent() {
    const payload: TodoType = { id, content: editTodo };
    dispatch(editContentById(payload));
    setIsEdit((prev) => !prev);
  }

  return (
    <ul className="flex items-center border-b border-gray-300 w-auto mt-3 p-1 gap-3">
      {isEdit ? (
        <>
          <input
            className="w-full  outline-none"
            value={editTodo}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEditTodo(e.target.value)
            }
          />
          <EditOutlined
            className="cursor-pointer"
            onClick={handleEditContent}
          />
        </>
      ) : (
        <>
          <li className="text-center mr-5 ">{content}</li>
          <DeleteOutlined className="cursor-pointer" onClick={handleRemove} />
          <EditOutlined className="cursor-pointer" onClick={handleEdit} />
          <DragOutlined />
        </>
      )}
    </ul>
  );
};

export default TodoShow;
