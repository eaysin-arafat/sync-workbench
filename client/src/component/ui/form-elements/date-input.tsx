import { DateInput as MantineDateInput } from "@mantine/dates";

// INPUT PROPS
type Props = {
  value?: Date;
  onChange: (date: Date | null) => void;
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
};

const DateInput = (props: Props) => {
  const {
    value,
    onChange,
    name,
    label,
    required,
    errMsg,
    disabled,
    placeholder,
    readOnly = false,
    onClick,
    id,
    height = "45px",
  } = props;

  return (
    <MantineDateInput
      value={value}
      name={name}
      onChange={(date) => onChange(date)}
      styles={{
        input: { height: height },
      }}
      label={label}
      placeholder={placeholder ? placeholder : `Enter ${label}`}
      withAsterisk={required}
      disabled={disabled}
      error={errMsg}
      readOnly={readOnly}
      id={id}
      onClick={onClick}
    />
  );
};

export default DateInput;
