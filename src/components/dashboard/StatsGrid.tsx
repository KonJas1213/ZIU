import { useMemo } from "react";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import Grid from "@mui/material/Grid2";
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
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, sm: 4 }}>
        <StatsCard
          title="Wszystkie zadania"
          value={total}
          icon={FormatListBulletedIcon}
          color="#1565C0"
          bgColor="#E3F2FD"
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <StatsCard
          title="Ukończone"
          value={completed}
          icon={CheckCircleIcon}
          color="#2E7D32"
          bgColor="#E8F5E9"
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 4 }}>
        <StatsCard
          title="Oczekujące"
          value={pending}
          icon={RadioButtonUncheckedIcon}
          color="#E65100"
          bgColor="#FFF3E0"
        />
      </Grid>
    </Grid>
  );
}
