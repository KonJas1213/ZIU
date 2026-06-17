import { ReactNode, useEffect, useState } from "react";
import { Box, Toolbar } from "@mui/material";
import Sidebar from "./Sidebar";
import AppHeader from "./AppHeader";
import StatsGrid from "./StatsGrid";
import { AppView, viewTitles } from "../../types/app.types";

interface DashboardLayoutProps {
  children?: ReactNode;
  activeView: AppView;
  onNavigate: (view: AppView) => void;
}

export default function DashboardLayout({ children, activeView, onNavigate }: DashboardLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("nav__menu--open", mobileOpen);
    return () => document.body.classList.remove("nav__menu--open");
  }, [mobileOpen]);

  const handleNavigate = (view: AppView) => {
    onNavigate(view);
    setMobileOpen(false);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar
        mobileOpen={mobileOpen}
        activeView={activeView}
        onNavigate={handleNavigate}
        onClose={() => setMobileOpen(false)}
      />
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
            title={viewTitles[activeView]}
            menuOpen={mobileOpen}
            onMenuToggle={() => setMobileOpen((prev) => !prev)}
          />
          <Toolbar />
          {activeView === "dashboard" && <StatsGrid />}
          <Box className="task-list-container">{children}</Box>
        </Box>
      </Box>
    </Box>
  );
}
