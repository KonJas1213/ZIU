import { FilterType } from "../types/todo.types";

interface FilterBarProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

const filters: { id: FilterType; label: string }[] = [
  { id: "all", label: "Wszystkie" },
  { id: "active", label: "Aktywne" },
  { id: "completed", label: "Ukończone" },
];

export function FilterBar({ activeFilter, onFilterChange }: FilterBarProps) {
  return (
    <nav className="mb-4" aria-label="Filtr listy zadań">
      <ul className="task-filter-list">
        {filters.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => onFilterChange(item.id)}
              aria-pressed={activeFilter === item.id}
              className={`task-filter-btn ${
                activeFilter === item.id ? "task-filter-btn--active" : "task-filter-btn--inactive"
              }`}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
