interface StatusBannerProps {
  type: "success" | "error";
  message: string;
  onDismiss?: () => void;
}

export function StatusBanner({ type, message, onDismiss }: StatusBannerProps) {
  return (
    <div
      className={`status-banner status-banner--${type}`}
      role={type === "error" ? "alert" : "status"}
      aria-live={type === "error" ? "assertive" : "polite"}
    >
      <p>{message}</p>
      {onDismiss && (
        <button type="button" className="status-banner__dismiss" onClick={onDismiss} aria-label="Zamknij komunikat">
          ×
        </button>
      )}
    </div>
  );
}
