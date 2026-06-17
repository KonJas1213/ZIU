import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
  ReactNode,
} from "react";
import * as todoApi from "../api/todoApi";
import { todoReducer } from "../reducers/todoReducer";
import { RequestStatus, Todo, TodoAction } from "../types/todo.types";

interface TodoContextType {
  todos: Todo[];
  status: RequestStatus;
  error: string | null;
  feedback: string | null;
  isMutating: boolean;
  loadTodos: () => Promise<void>;
  addTodo: (title: string) => Promise<void>;
  toggleTodo: (id: string) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  clearFeedback: () => void;
  dispatch: React.Dispatch<TodoAction>;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export function TodoProvider({ children }: { children: ReactNode }) {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [status, setStatus] = useState<RequestStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isMutating, setIsMutating] = useState(false);
  const feedbackTimer = useRef<number | null>(null);

  const clearFeedback = useCallback(() => {
    setFeedback(null);
    setError(null);
  }, []);

  const showFeedback = useCallback((message: string) => {
    setFeedback(message);
    if (feedbackTimer.current) {
      window.clearTimeout(feedbackTimer.current);
    }
    feedbackTimer.current = window.setTimeout(() => setFeedback(null), 3500);
  }, []);

  const loadTodos = useCallback(async () => {
    setStatus("loading");
    setError(null);
    try {
      const data = await todoApi.fetchTodos();
      dispatch({ type: "SET_TODOS", payload: data });
      setStatus("success");
    } catch (err) {
      const message = err instanceof todoApi.TodoApiError ? err.message : "Wystąpił nieoczekiwany błąd.";
      setError(message);
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    void loadTodos();
  }, [loadTodos]);

  const addTodo = useCallback(
    async (title: string) => {
      setIsMutating(true);
      setError(null);
      try {
        const todo = await todoApi.createTodo(title);
        dispatch({ type: "ADD", payload: todo });
        showFeedback("Zadanie zostało dodane.");
        setStatus("success");
      } catch (err) {
        const message = err instanceof todoApi.TodoApiError ? err.message : "Nie udało się dodać zadania.";
        setError(message);
        setStatus("error");
        throw err;
      } finally {
        setIsMutating(false);
      }
    },
    [showFeedback],
  );

  const toggleTodo = useCallback(
    async (id: string) => {
      const current = todos.find((todo) => todo.id === id);
      if (!current) return;

      setIsMutating(true);
      setError(null);
      try {
        const updated = await todoApi.updateTodo(id, { completed: !current.completed });
        dispatch({ type: "TOGGLE", payload: updated });
        showFeedback(updated.completed ? "Zadanie oznaczone jako ukończone." : "Zadanie oznaczone jako aktywne.");
        setStatus("success");
      } catch (err) {
        const message = err instanceof todoApi.TodoApiError ? err.message : "Nie udało się zaktualizować zadania.";
        setError(message);
        setStatus("error");
      } finally {
        setIsMutating(false);
      }
    },
    [showFeedback, todos],
  );

  const deleteTodo = useCallback(
    async (id: string) => {
      setIsMutating(true);
      setError(null);
      try {
        await todoApi.deleteTodo(id);
        dispatch({ type: "DELETE", payload: id });
        showFeedback("Zadanie zostało usunięte.");
        setStatus("success");
      } catch (err) {
        const message = err instanceof todoApi.TodoApiError ? err.message : "Nie udało się usunąć zadania.";
        setError(message);
        setStatus("error");
      } finally {
        setIsMutating(false);
      }
    },
    [showFeedback],
  );

  return (
    <TodoContext.Provider
      value={{
        todos,
        status,
        error,
        feedback,
        isMutating,
        loadTodos,
        addTodo,
        toggleTodo,
        deleteTodo,
        clearFeedback,
        dispatch,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export function useTodos() {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodos must be used within a TodoProvider");
  }
  return context;
}

export function useTodoContext() {
  const { todos, dispatch, status, error } = useTodos();
  return { state: { todos }, dispatch, status, error };
}
