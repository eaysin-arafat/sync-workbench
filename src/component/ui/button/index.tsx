import classNames from "classnames";
import React from "react";

type ButtonProps = {
  variant?: "primary" | "secondary" | "danger" | "success" | "warning";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  children,
  onClick,
  disabled = false,
  className,
  leftIcon,
  rightIcon,
  type,
  ...props
}) => {
  const baseStyles =
    "font-medium rounded-md focus:outline-none transition duration-150 ease-in-out inline-flex items-center justify-center";

  const variantStyles = {
    primary: "bg-black text-white hover:bg-gray-800",
    secondary: "bg-gray-500 text-white hover:bg-gray-600",
    danger: "bg-red-500 text-white hover:bg-red-600",
    success: "bg-green-500 text-white hover:bg-green-600",
    warning: "bg-yellow-500 text-white hover:bg-yellow-600",
  };

  const sizeStyles = {
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-2.5 text-md",
    lg: "px-6 py-3 text-lg",
  };

  const disabledStyles = "opacity-50 cursor-not-allowed";

  const buttonClasses = classNames(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    { [disabledStyles]: disabled },
    className
  );

  return (
    <button
      type={type ?? "button"}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
};

export default Button;
