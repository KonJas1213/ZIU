import { useMemo } from "react";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { useTodoContext } from "../../context/TodoContext";
import StatsCard from "./StatsCard";

export default function StatsGrid() {
  const { state } = useTodoContext();

  const { total, completed, pending } = useMemo(() => {
    const totalItems = state.todos.length;
    const completedItems = state.todos.filter((todo) => todo.completed).length;
    return {
      total: totalItems,
      completed: completedItems,
      pending: totalItems - completedItems,
    };
  }, [state.todos]);

  return (
    <div className="task-grid">
      <StatsCard
        title="Wszystkie zadania"
        value={total}
        icon={FormatListBulletedIcon}
        color="#1565C0"
        bgColor="#E3F2FD"
      />
      <StatsCard
        title="Ukończone"
        value={completed}
        icon={CheckCircleIcon}
        color="#2E7D32"
        bgColor="#E8F5E9"
      />
      <StatsCard
        title="Oczekujące"
        value={pending}
        icon={RadioButtonUncheckedIcon}
        color="#E65100"
        bgColor="#FFF3E0"
      />
    </div>
  );
}
