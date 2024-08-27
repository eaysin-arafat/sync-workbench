import { MultiSelect as MantineMultiSelect } from "@mantine/core";

type Props = {
  value?: string[];
  onChange: (date: string[]) => void;
  name?: string;
  label?: string;
  required?: boolean;
  errMsg?: string;
  disabled?: boolean;
  placeholder?: string;
  readOnly?: boolean;
  onClick?: () => void;
  id?: string;
  height?: string;
  searchable?: boolean;
  options?: { value: string; label: string }[] | string[];
};

const MultiSelect = (props: Props) => {
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
    searchable,
    options,
  } = props;

  return (
    <MantineMultiSelect
      value={value}
      label={label}
      name={name}
      placeholder={placeholder ?? `Enter ${label}`}
      id={id}
      onClick={onClick}
      onChange={onChange}
      disabled={disabled}
      error={errMsg}
      data={options}
      searchable={searchable}
      styles={{
        input: {
          minHeight: height,
          display: "flex",
          alignItems: "center",
          padding: "10px",
        },
      }}
      withAsterisk={required}
      readOnly={readOnly}
    />
  );
};

export default MultiSelect;
