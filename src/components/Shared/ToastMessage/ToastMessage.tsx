import { useEffect } from "react";
import { ToastMessageProps } from "./interfaces/ToastMessage";
import "./ToastMessage.scss";

export const ToastMessage: React.FC<ToastMessageProps> = ({
  text,
  type = "success",
  duration = 3500,
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => onClose(), duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!text) return null;

  return (
    <div className={`toast toast--${type}`} role="alert" aria-live="assertive">
      {text}
    </div>
  );
};
