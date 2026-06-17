import { useMemo, useState } from "react";
import { FilterBar } from "../components/FilterBar";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { StatusBanner } from "../components/StatusBanner";
import { TaskSearch } from "../components/TaskSearch";
import TodoInput from "../components/TodoInput";
import TodoList from "../components/TodoList";
import { useTodos } from "../context/TodoContext";
import { FilterType } from "../types/todo.types";

export default function TasksPage() {
  const { todos, status, error, feedback, isMutating, addTodo, toggleTodo, deleteTodo, loadTodos, clearFeedback } =
    useTodos();
  const [filter, setFilter] = useState<FilterType>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTodos = useMemo(() => {
    let result = todos;
    if (filter === "active") result = result.filter((todo) => !todo.completed);
    if (filter === "completed") result = result.filter((todo) => todo.completed);
    if (searchQuery) {
      const normalized = searchQuery.toLowerCase();
      result = result.filter((todo) => todo.title.toLowerCase().includes(normalized));
    }
    return result;
  }, [todos, filter, searchQuery]);

  if (status === "loading" && todos.length === 0) {
    return <LoadingSpinner label="Pobieranie zadań z serwera…" />;
  }

  return (
    <article className="tasks-panel" aria-labelledby="tasks-panel-title">
      <h2 id="tasks-panel-title" className="tasks-panel__title">
        Lista zadań
      </h2>

      {error && (
        <StatusBanner
          type="error"
          message={error}
          onDismiss={() => {
            clearFeedback();
            void loadTodos();
          }}
        />
      )}

      {feedback && !error && <StatusBanner type="success" message={feedback} onDismiss={clearFeedback} />}

      <section aria-label="Dodawanie zadania">
        <TodoInput onAdd={addTodo} disabled={isMutating} />
      </section>

      <TaskSearch resultCount={filteredTodos.length} onSearch={setSearchQuery} />

      <FilterBar activeFilter={filter} onFilterChange={setFilter} />

      {isMutating && todos.length > 0 && (
        <div className="tasks-inline-loading" aria-live="polite">
          <LoadingSpinner label="Zapisywanie zmian…" size={24} />
        </div>
      )}

      <section aria-label="Lista wyników zadań">
        <TodoList
          todos={filteredTodos}
          onToggle={(id) => void toggleTodo(id)}
          onDelete={(id) => void deleteTodo(id)}
        />
      </section>

    </article>
  );
}
