import { ReactNode, useEffect, useState } from "react";
import { Box } from "@mui/material";
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
        tabIndex={-1}
        sx={{
          flexGrow: 1,
          minWidth: 0,
          p: { xs: 2, md: 3 },
          bgcolor: "background.default",
        }}
      >
        <Box className="dashboard-content">
          <header className="dashboard-header">
            <AppHeader
              title={viewTitles[activeView]}
              menuOpen={mobileOpen}
              onMenuToggle={() => setMobileOpen((prev) => !prev)}
            />
          </header>

          {activeView === "dashboard" && <StatsGrid />}

          <section className="task-list-container" aria-label={viewTitles[activeView]}>
            {children}
          </section>

          <footer className="dashboard-footer">
            <p>&copy; 2026 Akademia Tarnowska — TodoApp</p>
          </footer>
        </Box>
      </Box>
    </Box>
  );
}
