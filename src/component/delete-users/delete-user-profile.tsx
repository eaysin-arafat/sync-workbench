import DeleteIcon from "@/assets/add-users/DeleteIcon";
import UserIcon from "@/assets/application-icon/UserIcon";
import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import SelectInput from "../ui/form-elements/select";
import TextareaInput from "../ui/form-elements/textarea";

const DeleteUserProfile = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const hasProfileImage = false;

  return (
    <div
      key={Date.now()}
      className="bg-white border py-8 px-8 flex flex-col items-center justify-center rounded-lg"
    >
      <button className="flex justify-end w-full" onClick={open}>
        <DeleteIcon />
      </button>

      <Modal
        opened={opened}
        onClose={close}
        withCloseButton={false}
        size="lg"
        centered
      >
        <div className="mx-9 py-6 space-y-5">
          <h2 className="whitespace-nowrap text-red-600">
            Report the Employee
          </h2>

          <SelectInput
            label="Violation"
            options={[
              "Absconding",
              "Breach of contract",
              "HR violations",
              "Dual employments",
            ]}
          />

          <TextareaInput
            label="Description"
            placeholder="Type Description"
            height="167px"
          />

          <div className="flex justify-end gap-5">
            <Button
              onClick={close}
              variant="outline"
              className="!border-black !text-black !font-bold"
            >
              Cancel
            </Button>
            <Button className="!bg-black text-white font-semibold text-sm">
              Report
            </Button>
          </div>
        </div>
      </Modal>

      <div className="flex flex-col items-center justify-center gap-8 ">
        <div>
          {hasProfileImage ? (
            <div className="h-[108px] w-[105px]">
              <img
                src=""
                alt=""
                className="rounded-full object-cover h-[100px] w-[100px]"
              />
            </div>
          ) : (
            <div className="rounded-full h-[100px] w-[100px]">
              <UserIcon />
            </div>
          )}
        </div>

        <div className="flex flex-col items-center justify-center gap-2">
          <h1 className="text-base font-bold">Username</h1>

          <span className="text-[#202224] text-sm font-semibold">Designer</span>
          <p className="text-[#202224] text-sm">Example@example.com</p>
        </div>
      </div>
    </div>
  );
};

export default DeleteUserProfile;
