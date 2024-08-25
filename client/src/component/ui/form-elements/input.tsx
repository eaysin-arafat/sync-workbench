import { Input as MantineInput } from "@mantine/core";

// INPUT PROPS
type Props = {
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  label?: string;
  required?: boolean;
  errMsg?: string;
  disabled?: boolean;
  type?: string;
  placeholder?: string;
  readOnly?: boolean;
  onClick?: () => void;
  id?: string;
  width?: string;
  height?: string;
  backgroundColor?: string;
};

// input component
const Input = (props: Props) => {
  const {
    value,
    onChange,
    name,
    label,
    required,
    errMsg,
    disabled,
    type = "text",
    placeholder,
    readOnly = false,
    onClick,
    id,
    width,
    height,
    backgroundColor,
  } = props;

  return (
    <MantineInput.Wrapper
      label={label}
      withAsterisk={required}
      error={errMsg}
      styles={{ root: { width: "100%" } }}
    >
      <MantineInput
        placeholder={placeholder ? placeholder : `Type ${label}`}
        value={value}
        styles={{
          input: {
            height: height ? `${height}px` : "45px",
            width: `${width}px`,
            backgroundColor: backgroundColor,
            borderColor: "#E2E8F0",
          },
        }}
        id={id}
        onClick={onClick}
        onChange={onChange}
        readOnly={readOnly}
        name={name}
        disabled={disabled}
        type={type}
        error={errMsg}
      />
    </MantineInput.Wrapper>
  );
};

export default Input;
