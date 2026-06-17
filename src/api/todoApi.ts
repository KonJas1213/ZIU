import { Todo } from "../types/todo.types";

const STORAGE_KEY = "todo-app-todos";

export class TodoApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

function delay(ms = 600) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function parseTodo(raw: Todo): Todo {
  return {
    ...raw,
    createdAt: new Date(raw.createdAt),
  };
}

function readStorage(): Todo[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  return (JSON.parse(stored) as Todo[]).map(parseTodo);
}

function writeStorage(todos: Todo[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function shouldSimulateNetworkError(title: string) {
  return title.toLowerCase().includes("błąd sieci") || title.toLowerCase().includes("error500");
}

export async function fetchTodos(): Promise<Todo[]> {
  await delay(700);

  const stored = readStorage();
  if (stored.length > 0) {
    return stored;
  }

  const response = await fetch("/todos.json");
  if (!response.ok) {
    throw new TodoApiError(500, "Nie udało się pobrać listy zadań. Sprawdź połączenie z siecią.");
  }

  const data = (await response.json()) as Todo[];
  const todos = data.map(parseTodo);
  writeStorage(todos);
  return todos;
}

export async function createTodo(title: string): Promise<Todo> {
  await delay(500);

  if (shouldSimulateNetworkError(title)) {
    throw new TodoApiError(500, "Błąd sieci podczas dodawania zadania. Spróbuj ponownie.");
  }

  const todo: Todo = {
    id: crypto.randomUUID(),
    title: title.trim(),
    completed: false,
    createdAt: new Date(),
  };

  const todos = [todo, ...readStorage()];
  writeStorage(todos);
  return todo;
}

export async function updateTodo(id: string, updates: Partial<Pick<Todo, "title" | "completed">>): Promise<Todo> {
  await delay(400);

  const todos = readStorage();
  const index = todos.findIndex((item) => item.id === id);

  if (index === -1) {
    throw new TodoApiError(404, "Nie znaleziono zadania.");
  }

  const updated: Todo = { ...todos[index], ...updates };
  todos[index] = updated;
  writeStorage(todos);
  return updated;
}

export async function deleteTodo(id: string): Promise<void> {
  await delay(400);

  const todos = readStorage();
  const next = todos.filter((item) => item.id !== id);

  if (next.length === todos.length) {
    throw new TodoApiError(404, "Nie znaleziono zadania do usunięcia.");
  }

  writeStorage(next);
}
