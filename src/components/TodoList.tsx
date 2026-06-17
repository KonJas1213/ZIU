import { Todo } from "../types/todo.types";

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
  if (todos.length === 0) {
    return <p className="todo-empty">Brak zadań. Dodaj pierwsze!</p>;
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className={`todo-item ${todo.completed ? "todo-item--completed" : ""}`}
        >
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
            aria-label={todo.title}
            className="h-4 w-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500"
          />
          <span className={`todo-item__text ${todo.completed ? "todo-item__text--completed" : ""}`}>
            {todo.title}
          </span>
          <button
            type="button"
            onClick={() => onDelete(todo.id)}
            aria-label={`Usuń zadanie: ${todo.title}`}
            className="todo-item__delete"
          >
            Usuń
          </button>
        </li>
      ))}
    </ul>
  );
}
