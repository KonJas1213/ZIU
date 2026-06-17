import { IconButton, Stack, Toolbar, Typography } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { useState } from "react";

interface AppHeaderProps {
  title: string;
  menuOpen: boolean;
  onMenuToggle: () => void;
}

export default function AppHeader({ title, menuOpen, onMenuToggle }: AppHeaderProps) {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Toolbar
      disableGutters
      sx={{
        display: "flex",
        justifyContent: "space-between",
        gap: 1,
        mb: 2,
      }}
    >
      <Stack direction="row" spacing={1} alignItems="center">
        <button
          type="button"
          className="nav__hamburger no-print"
          onClick={onMenuToggle}
          aria-label="Otwórz menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
        <Typography
          component="h1"
          sx={{
            fontSize: "var(--font-h2)",
            fontWeight: 600,
            m: 0,
          }}
        >
          {title}
        </Typography>
      </Stack>
      <Stack direction="row" spacing={1} className="no-print">
        <IconButton
          color="default"
          aria-label={darkMode ? "Włącz tryb jasny" : "Włącz tryb ciemny"}
          onClick={() => setDarkMode((prev) => !prev)}
          sx={{ minWidth: 44, minHeight: 44 }}
        >
          {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
        <IconButton color="default" aria-label="Powiadomienia" sx={{ minWidth: 44, minHeight: 44 }}>
          <NotificationsNoneIcon />
        </IconButton>
      </Stack>
    </Toolbar>
  );
}
