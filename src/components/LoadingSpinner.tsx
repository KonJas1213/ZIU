import { CircularProgress } from "@mui/material";

interface LoadingSpinnerProps {
  label?: string;
  size?: number;
}

export function LoadingSpinner({ label = "Ładowanie…", size = 36 }: LoadingSpinnerProps) {
  return (
    <div className="loading-spinner" role="status" aria-live="polite">
      <CircularProgress size={size} aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}
