import { useMemo, useState } from "react";
import { TodoProvider, useTodos } from "./context/TodoContext";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import { FilterBar } from "./components/FilterBar";
import TodoInputTailwind from "./components/TodoInput.tailwind";
import TodoListTailwind from "./components/TodoList.tailwind";
import MultiStepForm from "./lab7/MultiStepForm";
import { AppView } from "./types/app.types";
import { FilterType } from "./types/todo.types";

function TodosPanel() {
  const { todos, dispatch } = useTodos();
  const [filter, setFilter] = useState<FilterType>("all");

  const filteredTodos = useMemo(() => {
    if (filter === "active") return todos.filter((todo) => !todo.completed);
    if (filter === "completed") return todos.filter((todo) => todo.completed);
    return todos;
  }, [todos, filter]);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4">
      <TodoInputTailwind onAdd={(text) => dispatch({ type: "ADD", payload: text })} />
      <FilterBar activeFilter={filter} onFilterChange={setFilter} />
      <TodoListTailwind
        todos={filteredTodos}
        onToggle={(id) => dispatch({ type: "TOGGLE", payload: id })}
        onDelete={(id) => dispatch({ type: "DELETE", payload: id })}
      />
    </div>
  );
}

function AppContent() {
  const [view, setView] = useState<AppView>("dashboard");

  return (
    <DashboardLayout activeView={view} onNavigate={setView}>
      {view === "dashboard" ? <TodosPanel /> : <MultiStepForm />}
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
