import { FileInput } from "@mantine/core";

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
  height?: string;
  className?: string;
};

const FileUpload = (props: Props) => {
  const {
    name,
    label,
    required,
    errMsg,
    disabled,
    id,
    placeholder = "Upload Files",
    className,
  } = props;

  return (
    <FileInput
      className={className}
      label={label}
      placeholder={placeholder}
      id={id}
      name={name}
      disabled={disabled}
      withAsterisk={required}
      multiple
      error={errMsg}
    />
  );
};

export default FileUpload;
