import { PasswordInput as MantinePasswordInput } from "@mantine/core";

type Props = {
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  label?: string;
  required?: boolean;
  errMsg?: string;
  placeholder?: string;
  id?: string;
  width?: string;
  height?: string;
};

const PasswordInput = (props: Props) => {
  const {
    value,
    onChange,
    name,
    label,
    required,
    errMsg,
    placeholder,
    id,
    width,
    height,
  } = props;

  return (
    <MantinePasswordInput
      name={name}
      id={id}
      value={value}
      label={label ?? "Password"}
      placeholder={placeholder ?? "Enter Password"}
      styles={{ input: { height: height ?? "45px", width: width } }}
      onChange={onChange}
      withAsterisk={required}
      error={errMsg}
    />
  );
};

export default PasswordInput;
