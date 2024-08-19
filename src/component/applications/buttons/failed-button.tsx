import FailedIcon from "@/assets/status/FaildIcon";

interface ButtonProps {
  onClick?: () => void;
  isActive?: boolean;
}

const FailedButton = ({ onClick, isActive }: ButtonProps) => {
  return (
    <button
      className={`flex items-center gap-2.5 font-bold py-3 px-5 ${
        isActive && "bg-[#f0f0f0]"
      }`}
      onClick={onClick}
    >
      Failed <FailedIcon />
    </button>
  );
};

export default FailedButton;
