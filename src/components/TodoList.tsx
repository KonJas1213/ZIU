import { useMemo } from "react";
import {
  Checkbox,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { FilterType, Todo } from "../types/todo.types";

interface TodoListProps {
  todos: Todo[];
  filter: FilterType;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoList({ todos, filter, onToggle, onDelete }: TodoListProps) {
  const filteredTodos = useMemo(() => {
    if (filter === "active") return todos.filter((todo) => !todo.completed);
    if (filter === "completed") return todos.filter((todo) => todo.completed);
    return todos;
  }, [todos, filter]);

  if (filteredTodos.length === 0) {
    return (
      <Typography color="text.secondary" textAlign="center" sx={{ mt: 4 }}>
        Brak zadań. Dodaj pierwsze!
      </Typography>
    );
  }

  return (
    <Paper variant="outlined" sx={{ overflow: "hidden" }}>
      <List disablePadding>
        {filteredTodos.map((todo, idx) => (
          <ListItem
            key={todo.id}
            divider={idx < filteredTodos.length - 1}
            sx={{ bgcolor: todo.completed ? "action.hover" : "background.paper" }}
            secondaryAction={
              <IconButton
                edge="end"
                color="error"
                onClick={() => onDelete(todo.id)}
                aria-label="Usuń zadanie"
              >
                <DeleteOutlineIcon />
              </IconButton>
            }
          >
            <ListItemIcon>
              <Checkbox
                checked={todo.completed}
                onChange={() => onToggle(todo.id)}
                inputProps={{ "aria-label": todo.title }}
              />
            </ListItemIcon>
            <ListItemText
              primary={todo.title}
              sx={{
                textDecoration: todo.completed ? "line-through" : "none",
                color: todo.completed ? "text.disabled" : "text.primary",
              }}
            />
            {todo.completed && (
              <Chip label="Ukończone" size="small" color="success" sx={{ mr: 1 }} />
            )}
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}
