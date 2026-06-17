export type FilterType = "all" | "active" | "completed";

export type RequestStatus = "idle" | "loading" | "success" | "error";

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

export type TodoAction =
  | { type: "SET_TODOS"; payload: Todo[] }
  | { type: "ADD"; payload: Todo }
  | { type: "TOGGLE"; payload: Todo }
  | { type: "DELETE"; payload: string }
  | { type: "EDIT"; payload: { id: string; title: string } };
