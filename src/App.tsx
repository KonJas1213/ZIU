import { useMemo, useState } from "react";

import { TodoProvider, useTodos } from "./context/TodoContext";

import DashboardLayout from "./components/dashboard/DashboardLayout";

import { FilterBar } from "./components/FilterBar";

import { TaskSearch } from "./components/TaskSearch";

import TodoInputTailwind from "./components/TodoInput.tailwind";

import TodoListTailwind from "./components/TodoList.tailwind";

import MultiStepForm from "./lab7/MultiStepForm";

import { AppView } from "./types/app.types";

import { FilterType } from "./types/todo.types";



function TodosPanel() {

  const { todos, dispatch } = useTodos();

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



  return (

    <article className="rounded-2xl border border-gray-200 bg-white p-4" aria-labelledby="tasks-panel-title">

      <h2 id="tasks-panel-title" className="text-lg font-semibold text-gray-800 mb-4">

        Lista zadań

      </h2>



      <section aria-label="Dodawanie zadania">

        <TodoInputTailwind onAdd={(text) => dispatch({ type: "ADD", payload: text })} />

      </section>



      <TaskSearch resultCount={filteredTodos.length} onSearch={setSearchQuery} />



      <FilterBar activeFilter={filter} onFilterChange={setFilter} />



      <section aria-label="Lista wyników zadań">

        <TodoListTailwind

          todos={filteredTodos}

          onToggle={(id) => dispatch({ type: "TOGGLE", payload: id })}

          onDelete={(id) => dispatch({ type: "DELETE", payload: id })}

        />

      </section>

    </article>

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

    <>

      <a href="#main-content" className="skip-link">

        Przejdź do treści głównej

      </a>

      <TodoProvider>

        <AppContent />

      </TodoProvider>

    </>

  );

}

