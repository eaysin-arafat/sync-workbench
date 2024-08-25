import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import Input from "../ui/form-elements/input";

const SearchModal = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [value, setValue] = useState("");

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        withCloseButton={false}
        closeOnEscape
        styles={{
          body: { padding: 0 },
        }}
      >
        <Input
          placeholder="Clearable input"
          value={value}
          onChange={(event) => setValue(event.currentTarget.value)}
        />
      </Modal>

      <div
        className="bg-gray-50 text-gray-900 cursor-pointer block sm:hidden"
        onClick={open}
      >
        <IoSearchOutline size={23} />
      </div>
    </>
  );
};

export default SearchModal;
