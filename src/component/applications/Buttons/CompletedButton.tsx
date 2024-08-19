import CompletedIcon from "@/assets/status/CompletedIcon";

interface ButtonProps {
  onClick?: () => void;
  isActive?: boolean;
}

const CompletedButton = ({ onClick, isActive }: ButtonProps) => {
  return (
    <button
      className={`flex items-center gap-2.5 font-bold border-r py-3 px-5 ${
        isActive && "bg-[#f0f0f0] "
      }`}
      onClick={onClick}
    >
      Completed <CompletedIcon />
    </button>
  );
};

export default CompletedButton;
