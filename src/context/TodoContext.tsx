import { createContext, useContext, useReducer, ReactNode } from "react";
import { Todo, TodoAction } from "../types/todo.types";
import { todoReducer } from "../reducers/todoReducer";

interface TodoContextType {
  todos: Todo[];
  dispatch: React.Dispatch<TodoAction>;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export function TodoProvider({ children }: { children: ReactNode }) {
  const [todos, dispatch] = useReducer(todoReducer, []);

  return (
    <TodoContext.Provider value={{ todos, dispatch }}>
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
  const { todos, dispatch } = useTodos();
  return { state: { todos }, dispatch };
}