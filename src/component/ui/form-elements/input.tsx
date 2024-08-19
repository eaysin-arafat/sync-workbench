import { Input } from "@mantine/core";

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
const FormInput = (props: Props) => {
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
    <Input.Wrapper
      label={label}
      styles={{ label: { fontSize: "15px" } }}
      withAsterisk={required}
      error={errMsg}
    >
      <Input
        placeholder={placeholder ? placeholder : `Type ${label}`}
        value={value}
        styles={{
          input: {
            height: height ? height : "45px",
            width: width,
            backgroundColor: backgroundColor,
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
    </Input.Wrapper>
  );
};

export default FormInput;
