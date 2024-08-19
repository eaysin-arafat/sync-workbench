import { ReactNode } from "react";

const BgBlackButton = ({
  label,
  onClick,
  icon,
  className,
}: {
  label: string;
  onClick?: () => void;
  icon?: ReactNode;
  className?: string;
}) => {
  return (
    <button
      className={`flex items-center gap-2 font-bold text-sm text-white bg-black rounded-lg whitespace-nowrap py-3 px-5 ${className}`}
      onClick={onClick}
    >
      {icon} {label}
    </button>
  );
};

export default BgBlackButton;
