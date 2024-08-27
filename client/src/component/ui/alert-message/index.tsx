import toast, { IconTheme } from "react-hot-toast";

interface ToastOptions {
  type: "success" | "error" | "info";
  message?: string;
  duration?: number;
  position?:
    | "top-right"
    | "top-center"
    | "top-left"
    | "bottom-right"
    | "bottom-center"
    | "bottom-left";
  iconTheme?: IconTheme;
}

const showToast = ({
  type,
  message,
  duration = 4000,
  position = "top-center",
  iconTheme,
}: ToastOptions) => {
  toast.dismiss();

  const defaultMessages = {
    success: "Operation completed successfully",
    error: "An error occurred. Please try again.",
    info: "Here is some information for you",
  };

  const displayMessage = message || defaultMessages[type];

  const defaultIconTheme: IconTheme = {
    primary: "#2280de",
    secondary: "#ffffff", // Set a reasonable default for secondary color
  };

  const finalIconTheme = iconTheme || defaultIconTheme;

  const toastMap = {
    success: toast.success,
    error: toast.error,
    info: toast, // `info` typically just uses the default toast
  };

  toastMap[type](displayMessage, {
    position,
    duration,
    iconTheme: finalIconTheme,
  });
};

export default showToast;
