import { DeleteOutlined, DragOutlined, EditOutlined } from "@ant-design/icons";
import { TodoType } from "../types/Types";
import { editContentById, removeTodoById } from "../redux/todoSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { DraggableProvided } from "react-beautiful-dnd";

interface TodoProps {
  todo: TodoType;
  dragHandleProps: DraggableProvided["dragHandleProps"]; // Drag handle props türü
}

const TodoShow: React.FC<TodoProps> = ({ todo, dragHandleProps }) => {
  const { id, content } = todo;
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [editTodo, setEditTodo] = useState(content);
  const [isChecked, setIsChecked] = useState(false);

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

  function handleCheckboxChange() {
    setIsChecked((prev) => !prev);
  }

  return (
    <ul
      className={`flex items-center border-b border-gray-300 w-auto mt-3 p-1 gap-3 ${
        isChecked ? "line-through" : ""
      }`}
    >
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
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            className="form-checkbox h-4 w-4"
          />
          <li className="text-center mr-5">{content}</li>
          <DeleteOutlined className="cursor-pointer" onClick={handleRemove} />
          <EditOutlined className="cursor-pointer" onClick={handleEdit} />
          <DragOutlined {...dragHandleProps} />
        </>
      )}
    </ul>
  );
};

export default TodoShow;
