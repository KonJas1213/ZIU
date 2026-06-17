import DashboardIcon from "@mui/icons-material/Dashboard";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import TaskIcon from "@mui/icons-material/Task";
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { AppView } from "../../types/app.types";

export const DRAWER_WIDTH = 240;

const navItems: { label: string; view: AppView; icon: typeof DashboardIcon }[] = [
  { label: "Dashboard", view: "dashboard", icon: DashboardIcon },
  { label: "Zadania", view: "dashboard", icon: TaskIcon },
  { label: "Rejestracja", view: "register", icon: HowToRegIcon },
];

interface SidebarProps {
  mobileOpen: boolean;
  activeView: AppView;
  onNavigate: (view: AppView) => void;
  onClose: () => void;
}

function DrawerContent({
  activeView,
  onNavigate,
  onClose,
}: {
  activeView: AppView;
  onNavigate: (view: AppView) => void;
  onClose?: () => void;
}) {
  return (
    <>
      <Toolbar>
        <Typography variant="h6" fontWeight={700}>
          TodoApp
        </Typography>
      </Toolbar>
      <Divider sx={{ borderColor: "rgba(255,255,255,0.2)" }} />
      <List component="nav" aria-label="Główna nawigacja">
        {navItems.map((item) => {
          const Icon = item.icon;
          const selected =
            item.label === "Rejestracja"
              ? activeView === "register"
              : activeView === "dashboard" && item.label === "Dashboard"
                ? true
                : activeView === "dashboard" && item.label === "Zadania";

          return (
            <ListItemButton
              key={item.label}
              selected={!!selected}
              onClick={() => {
                onNavigate(item.view);
                onClose?.();
              }}
            >
              <ListItemIcon sx={{ color: "inherit", minWidth: 40 }}>
                <Icon aria-hidden="true" />
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          );
        })}
      </List>
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ p: 2, display: "flex", alignItems: "center", gap: 1 }}>
        <Avatar sx={{ width: 36, height: 36, bgcolor: "primary.dark" }}>U</Avatar>
        <Typography variant="body2">Użytkownik</Typography>
      </Box>
    </>
  );
}

export default function Sidebar({ mobileOpen, activeView, onNavigate, onClose }: SidebarProps) {
  return (
    <>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        id="main-navigation"
        className={`no-print${mobileOpen ? " nav__menu--open" : ""}`}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", lg: "none" },
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            boxSizing: "border-box",
            bgcolor: "primary.main",
            color: "white",
          },
        }}
      >
        <DrawerContent activeView={activeView} onNavigate={onNavigate} onClose={onClose} />
      </Drawer>

      <Drawer
        variant="permanent"
        className="no-print"
        sx={{
          display: { xs: "none", lg: "block" },
          width: DRAWER_WIDTH,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            boxSizing: "border-box",
            bgcolor: "primary.main",
            color: "white",
          },
        }}
      >
        <DrawerContent activeView={activeView} onNavigate={onNavigate} />
      </Drawer>
    </>
  );
}
