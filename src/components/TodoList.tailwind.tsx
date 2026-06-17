import { Todo } from "../types/todo.types";

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoListTailwind({ todos, onToggle, onDelete }: TodoListProps) {
  if (todos.length === 0) {
    return <p className="text-center text-gray-400 mt-8">Brak zadań. Dodaj pierwsze!</p>;
  }

  return (
    <ul className="divide-y divide-gray-200 border border-gray-200 rounded-xl overflow-hidden">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className={`flex items-center gap-3 px-4 py-3 ${todo.completed ? "bg-gray-50" : "bg-white"}`}
        >
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
            aria-label={todo.title}
            className="h-4 w-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500"
          />
          <span
            className={`flex-1 text-sm ${todo.completed ? "line-through text-gray-400" : "text-gray-800"}`}
          >
            {todo.title}
          </span>
          <button
            type="button"
            onClick={() => onDelete(todo.id)}
            aria-label={`Usuń zadanie: ${todo.title}`}
            className="text-sm font-medium text-danger hover:underline"
          >
            Usuń
          </button>
        </li>
      ))}
    </ul>
  );
}
