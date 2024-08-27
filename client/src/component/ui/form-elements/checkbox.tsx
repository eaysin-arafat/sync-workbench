import { Checkbox as MantineCheckbox } from "@mantine/core";

// INPUT PROPS
type Props = {
  value?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  label?: string;
  errMsg?: string;
  disabled?: boolean;
  readOnly?: boolean;
  onClick?: () => void;
  id?: string;
};

// input component
const Checkbox = (props: Props) => {
  const {
    value,
    onChange,
    name,
    label,
    errMsg,
    disabled,
    readOnly = false,
    onClick,
    id,
  } = props;

  return (
    <MantineCheckbox
      label={label}
      name={name}
      type="checkbox"
      checked={value}
      onChange={onChange}
      error={errMsg}
      disabled={disabled}
      styles={{ label: { fontWeight: "500", fontSize: "15px" } }}
      id={id}
      onClick={onClick}
      readOnly={readOnly}
    />
  );
};

export default Checkbox;
