export interface ToastMessageProps {
  text: string;
  type?: "success" | "error";
  duration?: number;
  onClose: () => void;
}