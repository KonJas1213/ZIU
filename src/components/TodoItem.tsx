import React from "react";
import { Todo } from "../types/todo.types";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  return (
    <div>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />

      <span
        style={{
          textDecoration: todo.completed ? "line-through" : "none",
          marginLeft: "10px",
        }}
      >
        {todo.title}
      </span>

      <button
        onClick={() => onDelete(todo.id)}
        style={{ marginLeft: "10px" }}
      >
        Usuń
      </button>
    </div>
  );
};

export default TodoItem;