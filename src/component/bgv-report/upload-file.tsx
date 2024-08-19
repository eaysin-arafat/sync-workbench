import ImageIcon from "@/assets/user-info/ImageIcon";
import React, { useRef } from "react";

// INPUT PROPS
type Props = {
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  label?: string;
  required?: boolean;
  errMsg?: string;
  disabled?: boolean;
  className?: string;
  max?: number;
  min?: number;
  numberOnly?: boolean;
  readOnly?: boolean;
  parentClass?: string;
  isReadOnly?: boolean;
  onClick?: () => void;
  id?: string;
};

const UploadFile = (props: Props) => {
  const {
    value,
    // onChange,
    name,
    label,
    required,
    errMsg,
    disabled,
    onClick,
    id,
  } = props;

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    fileInputRef.current!.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    console.log(files);
  };
  return (
    <div>
      {label && (
        <div className="flex w-full pb-1.5">
          <div className="text-[#696F79] leading-[125%] text-base font-semibold ms-[2px] truncate">
            {label}
          </div>
          {required && (
            <span className="transform -translate-y-0.5 mx-1 text-red-600 text-base">
              *
            </span>
          )}
        </div>
      )}

      <div>
        <button
          onClick={handleClick}
          className="flex items-center gap-4 border justify-center py-[15px] rounded-sm h-[89px] w-[154px]"
        >
          <ImageIcon />
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

      {/* ERROR MESSAGE */}
      {errMsg && (
        <span className="text-red-500 leading-[125%] font-normal text-[10px] mt-1 ms-[2px]">
          {errMsg}!
        </span>
      )}
    </div>
  );
};

export default UploadFile;
