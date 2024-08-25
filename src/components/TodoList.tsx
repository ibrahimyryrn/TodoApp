import { useSelector, useDispatch } from "react-redux";
import TodoShow from "./TodoShow";
import { RootState } from "../redux/store";
import { TodoType } from "../types/Types";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DraggableProvided,
  DroppableProvided,
} from "react-beautiful-dnd";
import { setTodos } from "../redux/todoSlice";

function TodoList() {
  const { todos } = useSelector((state: RootState) => state.todo);
  const dispatch = useDispatch();

  const handleOnDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) return;

    const updatedTodos = Array.from(todos);
    const [movedTodo] = updatedTodos.splice(source.index, 1);
    updatedTodos.splice(destination.index, 0, movedTodo);

    dispatch(setTodos(updatedTodos));
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="todos">
        {(provided: DroppableProvided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {todos &&
              todos.map((todo: TodoType, index: number) => (
                <Draggable
                  key={todo.id}
                  draggableId={todo.id.toString()}
                  index={index}
                >
                  {(provided: DraggableProvided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps}>
                      <TodoShow
                        todo={todo}
                        dragHandleProps={provided.dragHandleProps} // Drag handle props'u ekle
                      />
                    </div>
                  )}
                </Draggable>
              ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default TodoList;
