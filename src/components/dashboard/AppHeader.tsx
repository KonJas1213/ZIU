import { IconButton, Stack, Toolbar, Typography } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useThemeMode } from "../../context/ThemeContext";

interface AppHeaderProps {
  title: string;
  menuOpen: boolean;
  onMenuToggle: () => void;
}

export default function AppHeader({ title, menuOpen, onMenuToggle }: AppHeaderProps) {
  const { isDark, toggleTheme } = useThemeMode();

  return (
    <Toolbar
      disableGutters
      component="div"
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
          aria-label="Otwórz menu nawigacji"
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
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
      <Stack direction="row" spacing={1} className="no-print" component="div">
        <IconButton
          color="inherit"
          aria-label={isDark ? "Włącz tryb jasny" : "Włącz tryb ciemny"}
          onClick={toggleTheme}
          sx={{ minWidth: 44, minHeight: 44 }}
        >
          {isDark ? <LightModeIcon aria-hidden="true" /> : <DarkModeIcon aria-hidden="true" />}
        </IconButton>
      </Stack>
    </Toolbar>
  );
}
