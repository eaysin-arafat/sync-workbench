import { Group, Pagination as MantinePagination } from "@mantine/core";

const Pagination = () => {
  return (
    <div className="py-4 flex flex-col md:flex-row items-start justify-between px-4 bg-white">
      <p className="text-sm text-strokedark font-normal">
        Showing 1 to 7 of <span className="font-semibold">7</span> entries
      </p>
      <MantinePagination.Root
        total={10}
        styles={{
          control: {
            borderColor: "#eee",
            fontWeight: 300,
          },
        }}
        color="#1F2937"
      >
        <Group gap={5} justify="center">
          <MantinePagination.First />
          <MantinePagination.Previous />
          <MantinePagination.Items />
          <MantinePagination.Next />
          <MantinePagination.Last />
        </Group>
      </MantinePagination.Root>
    </div>
  );
};

export default Pagination;
