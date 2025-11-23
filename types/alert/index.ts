type AlertType = "success" | "info" | "warning" | "error" | "loading";

interface AlertState {
  type: AlertType | null;
  message: string | null;
  loading: boolean;
  title: string | null;
}

export type { AlertType, AlertState };
