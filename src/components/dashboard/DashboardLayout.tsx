import { ReactNode, useEffect, useState } from "react";
import { Box, Toolbar } from "@mui/material";
import Sidebar from "./Sidebar";
import AppHeader from "./AppHeader";
import StatsGrid from "./StatsGrid";

interface DashboardLayoutProps {
  children?: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("nav__menu--open", mobileOpen);
    return () => document.body.classList.remove("nav__menu--open");
  }, [mobileOpen]);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <Box
        component="main"
        id="main-content"
        sx={{
          flexGrow: 1,
          minWidth: 0,
          p: { xs: 2, md: 3 },
          bgcolor: "background.default",
        }}
      >
        <Box className="dashboard-content">
          <AppHeader
            menuOpen={mobileOpen}
            onMenuToggle={() => setMobileOpen((prev) => !prev)}
          />
          <Toolbar />
          <StatsGrid />
          <Box className="task-list-container">{children}</Box>
        </Box>
      </Box>
    </Box>
  );
}
