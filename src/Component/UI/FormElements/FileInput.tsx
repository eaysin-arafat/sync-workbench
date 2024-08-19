import UploadIcon from "@/Assets/UploadIcon";
import { fetchUploadMedia } from "@/redux/reducers/userBGVSlicer";
import { AppDispatch } from "@/redux/store";
import { getPortalInfo } from "@/utils/get-protal-info";
import { IconX } from "@tabler/icons-react"; // Import the cross icon
import React, { ReactNode, useRef, useState } from "react";
import { useDispatch } from "react-redux";

// INPUT PROPS
type Props = {
  name?: string;
  label?: string;
  required?: boolean;
  errMsg?: string;
  disabled?: boolean;
  onClick?: () => void;
  placeholder?: string;
  id?: string;
  isEndIcon?: boolean;
  startIcon?: ReactNode;
  height?: string;
  className?: string;
  value?: string;
  setAttachments?: (attachments: FileList | null) => void; // Handle null case
};

const FileInput = (props: Props) => {
  const {
    name,
    label,
    required,
    errMsg,
    disabled,
    id,
    placeholder,
    isEndIcon,
    startIcon,
    className,
    height,
    setAttachments,
    value,
  } = props;

  const dispatch: AppDispatch = useDispatch();

  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    const name = event.target.name;

    if (files && files.length > 0) {
      const selectedFile = files[0];
      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!allowedTypes.includes(selectedFile.type)) {
        alert("Please upload a valid image file (JPEG, PNG, GIF).");
        return;
      }

      setFileName(selectedFile.name);
      if (setAttachments) {
        setAttachments(files);
      }

      const { portalUrl } = getPortalInfo();
      dispatch(
        fetchUploadMedia({
          Company_Portal_Url: portalUrl,
          key: name,
          file: selectedFile,
        })
      )
        .unwrap()
        .catch((error) => {
          console.log("Upload failed", error);
        });
    }
  };

  const handleRemoveFile = () => {
    setFileName(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    if (setAttachments) {
      setAttachments(null);
    }
  };

  return (
    <div className={className}>
      {label && (
        <div className="flex w-full">
          <div className="font-medium truncate text-[15px]">{label}</div>
          {required && (
            <span className="transform -translate-y-0.5 mx-1 text-red-600 text-base">
              *
            </span>
          )}
        </div>
      )}

      <div className="relative">
        {fileName ? (
          <div
            className="flex items-center gap-2 border rounded-md px-4 py-2"
            style={{ height: height || "42px" }}
          >
            <span className="truncate border-2 px-2 border-gray-500">
              {fileName}
            </span>
            <button
              type="button"
              onClick={handleRemoveFile}
              className="text-red-600"
              aria-label="Remove file"
            >
              <IconX size={16} />
            </button>
          </div>
        ) : (
          <button
            onClick={handleClick}
            className="flex items-center gap-4 border justify-center w-full rounded-md px-4"
            style={{ height: height || "42px" }}
            disabled={disabled}
          >
            {startIcon}
            <span>{placeholder || "Upload"}</span>
            {isEndIcon && <UploadIcon />}
          </button>
        )}

        <input
          type="file"
          id={id}
          onChange={handleFileChange}
          ref={fileInputRef}
          style={{ display: "none" }}
          required={required}
          value={value}
          name={name}
          disabled={disabled}
          accept="image/*"
        />
      </div>

      {errMsg && (
        <span className="text-red-500 leading-[125%] font-normal text-[12px] mt-1">
          {errMsg}
        </span>
      )}
    </div>
  );
};

export default FileInput;
