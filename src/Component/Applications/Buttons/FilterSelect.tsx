import { Select } from "@mantine/core";

const FilterSelect = ({
  placeholder,
  data,
}: {
  placeholder: string;
  data: string[];
}) => {
  return (
    <Select
      placeholder={placeholder}
      data={data}
      styles={{
        root: {
          background: "transparent",
        },
        input: { border: "none", background: "transparent" },
      }}
    />
  );
};

export default FilterSelect;
