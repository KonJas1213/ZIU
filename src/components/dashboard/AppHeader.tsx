import { IconButton, Stack, Toolbar, Typography } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { useRef, useState } from "react";
import { ModalDialog } from "../ModalDialog";

interface AppHeaderProps {
  title: string;
  menuOpen: boolean;
  onMenuToggle: () => void;
}

export default function AppHeader({ title, menuOpen, onMenuToggle }: AppHeaderProps) {
  const [darkMode, setDarkMode] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const notificationsRef = useRef<HTMLButtonElement>(null);

  return (
    <>
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
            color="default"
            aria-label={darkMode ? "Włącz tryb jasny" : "Włącz tryb ciemny"}
            onClick={() => setDarkMode((prev) => !prev)}
            sx={{ minWidth: 44, minHeight: 44 }}
          >
            {darkMode ? <LightModeIcon aria-hidden="true" /> : <DarkModeIcon aria-hidden="true" />}
          </IconButton>
          <IconButton
            ref={notificationsRef}
            color="default"
            aria-label="Powiadomienia"
            aria-haspopup="dialog"
            onClick={() => setNotificationsOpen(true)}
            sx={{ minWidth: 44, minHeight: 44 }}
          >
            <NotificationsNoneIcon aria-hidden="true" />
          </IconButton>
        </Stack>
      </Toolbar>

      <ModalDialog
        isOpen={notificationsOpen}
        title="Powiadomienia"
        onClose={() => setNotificationsOpen(false)}
        triggerRef={notificationsRef}
      >
        <p>Brak nowych powiadomień.</p>
        <p className="modal-hint">Ten dialog demonstruje focus trap zgodnie z Lab 8.</p>
      </ModalDialog>
    </>
  );
}
