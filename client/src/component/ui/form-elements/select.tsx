import { Select as MantineSelect } from "@mantine/core";

// Select input props
type Props = {
  value?: string;
  onChange?: (name: string, value: string | null) => void;
  onClick?: () => void;
  name?: string;
  label?: string;
  required?: boolean;
  errMsg?: string;
  disabled?: boolean;
  placeholder?: string;
  options?: string[];
  id?: string;
};

// Select input component
function Select({
  value,
  onChange,
  name,
  label,
  required,
  errMsg,
  disabled,
  onClick,
  placeholder,
  options = [],
  id,
}: Props) {
  return (
    <MantineSelect
      label={label}
      placeholder={placeholder || `Select ${label}`}
      value={value}
      id={id}
      name={name}
      onClick={onClick}
      onChange={(value) => {
        if (onChange && name) {
          onChange(name, value);
        }
      }}
      withAsterisk={required}
      disabled={disabled}
      data={options}
      error={errMsg}
      styles={{ input: { height: "45px" }, label: { fontSize: "15px" } }}
      searchable
    />
  );
}

export default Select;
