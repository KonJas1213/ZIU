import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import AppHeader from "./AppHeader";
import { getRouteTitle } from "../../types/app.types";

export default function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const title = getRouteTitle(location.pathname);

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
            <AppHeader title={title} menuOpen={mobileOpen} onMenuToggle={() => setMobileOpen((prev) => !prev)} />
          </header>

          <section className="task-list-container" aria-label={title}>
            <div key={location.pathname} className="page-transition">
              <Outlet />
            </div>
          </section>

          <footer className="dashboard-footer">
            <p>&copy; 2026 Akademia Tarnowska — TodoApp</p>
          </footer>
        </Box>
      </Box>
    </Box>
  );
}
