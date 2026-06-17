import { Todo, TodoAction } from "../types/todo.types";

export function todoReducer(state: Todo[], action: TodoAction): Todo[] {
  switch (action.type) {
    case "SET_TODOS":
      return action.payload;

    case "ADD":
      return [action.payload, ...state];

    case "TOGGLE":
      return state.map((todo) => (todo.id === action.payload.id ? action.payload : todo));

    case "DELETE":
      return state.filter((todo) => todo.id !== action.payload);

    case "EDIT":
      return state.map((todo) =>
        todo.id === action.payload.id ? { ...todo, title: action.payload.title } : todo,
      );

    default:
      return state;
  }
}
