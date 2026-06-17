import { ReactNode } from "react";
import { Box, Toolbar } from "@mui/material";
import Sidebar, { DRAWER_WIDTH } from "./Sidebar";
import AppHeader from "./AppHeader";
import StatsGrid from "./StatsGrid";

interface DashboardLayoutProps {
  children?: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          bgcolor: "background.default",
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
        }}
      >
        <AppHeader />
        <Toolbar />
        <StatsGrid />
        <Box sx={{ mt: 4 }}>{children}</Box>
      </Box>
    </Box>
  );
}
