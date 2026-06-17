import { useState } from "react";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { IconButton, Stack, Toolbar, Typography } from "@mui/material";

export default function AppHeader() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Toolbar disableGutters sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
      <Typography variant="h5" fontWeight={600}>
        Dashboard
      </Typography>
      <Stack direction="row" spacing={1}>
        <IconButton
          color="default"
          aria-label={darkMode ? "Włącz tryb jasny" : "Włącz tryb ciemny"}
          onClick={() => setDarkMode((prev) => !prev)}
        >
          {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
        <IconButton color="default" aria-label="Powiadomienia">
          <NotificationsNoneIcon />
        </IconButton>
      </Stack>
    </Toolbar>
  );
}
