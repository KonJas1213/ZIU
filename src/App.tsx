import { useMemo, useState } from "react";
import { TodoProvider, useTodos } from "./context/TodoContext";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import { FilterBar } from "./components/FilterBar";
import TodoInputTailwind from "./components/TodoInput.tailwind";
import TodoListTailwind from "./components/TodoList.tailwind";
import { FilterType } from "./types/todo.types";

function AppContent() {
  const { todos, dispatch } = useTodos();
  const [filter, setFilter] = useState<FilterType>("all");

  const filteredTodos = useMemo(() => {
    if (filter === "active") return todos.filter((todo) => !todo.completed);
    if (filter === "completed") return todos.filter((todo) => todo.completed);
    return todos;
  }, [todos, filter]);

  return (
    <DashboardLayout>
      <div className="rounded-2xl border border-gray-200 bg-white p-4">
        <TodoInputTailwind onAdd={(text) => dispatch({ type: "ADD", payload: text })} />
        <FilterBar activeFilter={filter} onFilterChange={setFilter} />
        <TodoListTailwind
          todos={filteredTodos}
          onToggle={(id) => dispatch({ type: "TOGGLE", payload: id })}
          onDelete={(id) => dispatch({ type: "DELETE", payload: id })}
        />
      </div>
    </DashboardLayout>
  );
}

export default function App() {
  return (
    <TodoProvider>
      <AppContent />
    </TodoProvider>
  );
}
