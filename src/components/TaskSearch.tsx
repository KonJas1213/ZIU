import { FormEvent, useId, useState } from "react";

interface TaskSearchProps {
  resultCount: number;
  onSearch: (query: string) => void;
}

export function TaskSearch({ resultCount, onSearch }: TaskSearchProps) {
  const inputId = useId();
  const hintId = useId();
  const resultsId = useId();
  const [query, setQuery] = useState("");
  const [activeQuery, setActiveQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = query.trim();
    setIsLoading(true);
    setActiveQuery(trimmed);
    onSearch(trimmed);
    window.setTimeout(() => setIsLoading(false), 200);
  };

  const liveMessage = (() => {
    if (isLoading) return "Wyszukiwanie…";
    if (!activeQuery) return "";
    if (resultCount === 0) return `Brak wyników dla zapytania: ${activeQuery}`;
    return `Znaleziono ${resultCount} wyników dla: ${activeQuery}`;
  })();

  return (
    <section className="task-search" aria-label="Wyniki wyszukiwania">
      <form role="search" aria-label="Wyszukiwarka zadań" onSubmit={handleSubmit} noValidate>
        <label htmlFor={inputId} className="task-panel-label">
          Wyszukaj zadanie
        </label>
        <div className="task-search__controls">
          <input
            id={inputId}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-describedby={hintId}
            aria-autocomplete="list"
            aria-controls={resultsId}
            placeholder="Wpisz fragment tytułu…"
            className="task-panel-input"
          />
          <button type="submit" aria-label="Szukaj" className="task-panel-action">
            Szukaj
          </button>
        </div>
        <span id={hintId} className="visually-hidden">
          Wpisz co najmniej 1 znak i naciśnij Szukaj lub Enter
        </span>
      </form>

      <div role="status" aria-atomic="true" className="visually-hidden">
        {liveMessage}
      </div>

      <ul id={resultsId} className="visually-hidden" aria-hidden="true">
        {Array.from({ length: resultCount }, (_, index) => (
          <li key={index}>Wynik {index + 1}</li>
        ))}
      </ul>
    </section>
  );
}
