import { useRef } from "react";
import { MdOutlineModeEditOutline } from "react-icons/md";

// INPUT PROPS
type Props = {
  value?: string;
  name?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  id?: string;
};

const ProfileUploadButton = (props: Props) => {
  const { value, name, required, disabled, onClick, id } = props;

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    fileInputRef.current!.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    console.log("files", files);
  };

  return (
    <div className="bg-[#1814F3] text-white flex items-center justify-center rounded-full h-[25px] w-[25px] cursor-pointer">
      <button
        onClick={handleClick}
        className="flex items-center gap-4 w-full justify-center  rounded-sm"
      >
        <MdOutlineModeEditOutline size={14} />
      </button>
      <input
        type="file"
        value={value}
        id={id}
        onClick={onClick}
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
        required={required}
        name={name}
        disabled={disabled}
      />
    </div>
  );
};

export default ProfileUploadButton;
