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
    <div className="mb-4 flex flex-wrap gap-2">
      {filters.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => onFilterChange(item.id)}
          className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
            activeFilter === item.id
              ? "bg-brand-500 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
