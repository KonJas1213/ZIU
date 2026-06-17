import { FormEvent, useId, useState } from "react";

interface TodoInputProps {
  onAdd: (text: string) => Promise<void>;
  disabled?: boolean;
}

export default function TodoInput({ onAdd, disabled = false }: TodoInputProps) {
  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputId = useId();
  const headingId = useId();

  const handleSubmit = async (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (!text.trim() || disabled || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onAdd(text.trim());
      setText("");
    } catch {
      // error handled in context
    } finally {
      setIsSubmitting(false);
    }
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
          disabled={disabled || isSubmitting}
          className="task-panel-input placeholder:text-gray-400"
        />
        <button
          type="submit"
          disabled={!text.trim() || disabled || isSubmitting}
          aria-label="Dodaj zadanie"
          aria-busy={isSubmitting}
          className="task-panel-action"
        >
          {isSubmitting ? "…" : "Dodaj"}
        </button>
      </div>
    </form>
  );
}
