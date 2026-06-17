import { FormEvent, useId, useState } from "react";

interface TodoInputProps {
  onAdd: (text: string) => void;
}

export default function TodoInputTailwind({ onAdd }: TodoInputProps) {
  const [text, setText] = useState("");
  const inputId = useId();
  const headingId = useId();

  const handleSubmit = (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (!text.trim()) return;
    onAdd(text.trim());
    setText("");
  };

  return (
    <form className="mb-6" onSubmit={handleSubmit} aria-labelledby={headingId} noValidate>
      <h3 id={headingId} className="task-panel-label text-lg">
        Dodaj nowe zadanie
      </h3>
      <div className="task-panel-row">
        <label htmlFor={inputId} className="visually-hidden">
          Treść zadania
        </label>
        <input
          id={inputId}
          type="text"
          placeholder="Wpisz treść zadania..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="task-panel-input placeholder:text-gray-400"
        />
        <button
          type="submit"
          disabled={!text.trim()}
          aria-label="Dodaj zadanie"
          className="task-panel-action"
        >
          Dodaj
        </button>
      </div>
    </form>
  );
}
