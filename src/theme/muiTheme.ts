import { createTheme, PaletteMode } from "@mui/material/styles";

export function createAppTheme(mode: PaletteMode) {
  const isDark = mode === "dark";

  return createTheme({
    palette: {
      mode,
      primary: {
        main: "#1565C0",
        light: "#1E88E5",
        dark: "#0D47A1",
        contrastText: "#FFFFFF",
      },
      secondary: {
        main: "#E65100",
        light: "#FF8A65",
        dark: "#BF360C",
      },
      success: { main: "#2E7D32" },
      error: { main: "#B71C1C" },
      background: {
        default: isDark ? "#0F172A" : "#F5F7FA",
        paper: isDark ? "#1E293B" : "#FFFFFF",
      },
      text: {
        primary: isDark ? "#F1F5F9" : "#1E293B",
        secondary: isDark ? "#94A3B8" : "#64748B",
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h4: { fontWeight: 700, letterSpacing: "-0.02em" },
      h5: { fontWeight: 600 },
      h6: { fontWeight: 600 },
      button: { textTransform: "none", fontWeight: 600 },
    },
    shape: {
      borderRadius: 10,
    },
    spacing: 8,
    components: {
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: { borderRadius: 8, paddingLeft: 20, paddingRight: 20 },
        },
      },
      MuiTextField: {
        defaultProps: { variant: "outlined", size: "small" },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: isDark ? "0 2px 12px rgba(0, 0, 0, 0.35)" : "0 2px 12px rgba(0, 0, 0, 0.08)",
            borderRadius: 12,
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            color: isDark ? "#E2E8F0" : "inherit",
          },
        },
      },
    },
  });
}
