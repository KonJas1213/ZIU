import DashboardIcon from "@mui/icons-material/Dashboard";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
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
import { NavLink } from "react-router-dom";

export const DRAWER_WIDTH = 240;

const navItems = [
  { label: "Dashboard", path: "/", icon: DashboardIcon, end: true },
  { label: "Zadania", path: "/zadania", icon: TaskIcon, end: false },
  { label: "Rejestracja", path: "/rejestracja", icon: HowToRegIcon, end: false },
  { label: "O projekcie", path: "/o-projekcie", icon: InfoOutlinedIcon, end: false },
];

interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

function DrawerContent({ onClose }: { onClose?: () => void }) {
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
          return (
            <ListItemButton
              key={item.path}
              component={NavLink}
              to={item.path}
              end={item.end}
              onClick={onClose}
              sx={{
                color: "inherit",
                textDecoration: "none",
                "&.active": { bgcolor: "rgba(255,255,255,0.14)" },
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

export default function Sidebar({ mobileOpen, onClose }: SidebarProps) {
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
        <DrawerContent onClose={onClose} />
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
        <DrawerContent />
      </Drawer>
    </>
  );
}
