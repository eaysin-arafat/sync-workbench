import { Textarea } from "@mantine/core";

type Props = {
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void | undefined;
  name?: string;
  label?: string;
  required?: boolean;
  errMsg?: string;
  disabled?: boolean;
  placeholder?: string;
  id?: string;
  height?: string;
  width?: string;
};

// Textarea input component
function TextareaInput({
  value,
  onChange,
  name,
  label,
  required,
  errMsg,
  disabled,
  placeholder,
  id,
  height,
  width,
}: Props) {
  return (
    <Textarea
      label={label}
      placeholder={placeholder ? placeholder : `Type ${label}`}
      id={id}
      value={value}
      onChange={onChange}
      name={name}
      error={errMsg}
      withAsterisk={required}
      disabled={disabled}
      styles={{ input: { height: height, width: width } }}
    />
  );
}

export default TextareaInput;
