import CalenderType1 from "@/assets/Icons/CalenderType1";
import PDFType1 from "@/assets/Icons/PDFType1";
import NewTimeSheetModal from "@/component/time-sheets/new-time-sheet-modal";
import DocumentsPreviewModal from "@/component/timesheet-table/documents-preview-modal";
import { convertUTCToLocalTime } from "@/utils/utcToLocalTime";
import { Button, Menu, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { BiEdit } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { TbTrash } from "react-icons/tb";

const SingleTimesheetDay = ({
  data,
  reFetch,
}: {
  data: any;
  reFetch: () => void;
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [openedM, { open: openM, close: closeM }] = useDisclosure(false);
  const [fileUrl, setFileUrl] = useState<string>("");
  const [fileType, setFileType] = useState<string>("");

  const fetchFile = (file: string) => {
    open();

    const extension = file.split(".").pop();
    if (extension) {
      setFileType(extension);
      setFileType(extension);
    }
  };

  return (
    <div className="flex items-center py-3 bg-white mt-2 rounded-md border">
      {/* <div className="w-[5%] flex justify-start ml-4">
        <Checkbox color="black" className="!cursor-pointer" />
      </div> */}
      <div className="w-[20%] text-center text-sm font-semibold flex items-center justify-center">
        {data?.ProjectName}
      </div>
      <div className="flex gap-2 items-center w-[15%] justify-center text-sm font-semibold">
        <CalenderType1 />
        <p>{convertUTCToLocalTime(data?.Date)}</p>
      </div>
      <div className="w-[15%] text-center text-sm font-semibold flex items-center justify-center">
        {data?.ProjectBucket}
      </div>
      <div className="w-[15%] flex justify-center">
        <div
          className="flex gap-1 items-center justify-center border-gray-300 border-2 rounded-lg px-1 cursor-pointer"
          onClick={open}
        >
          <PDFType1 />
          <span className="text-gray-500">
            {data?.TimesheetAttachmentURL.slice(0, 4)}...
            {data?.TimesheetAttachmentURL.split(".")[1]}
          </span>
        </div>

        <Modal
          opened={opened}
          onClose={close}
          withCloseButton={false}
          size=""
          centered
        >
          <DocumentsPreviewModal
            close={close}
            alt=""
            file={fileUrl}
            type={fileType}
          />
        </Modal>
      </div>
      <div className="w-[15%] text-center text-sm font-semibold flex items-center justify-center">
        {data?.HoursWorked}
      </div>
      <div className="w-[10%] text-center">
        {data?.status === "Pending" ? (
          <Button
            type="button"
            className="text-sm"
            radius="xl"
            color="rgba(242, 178, 2, 0.44)"
            style={{ color: "black" }}
          >
            Pending
          </Button>
        ) : data?.status === "Approved" ? (
          <Button
            type="button"
            className="text-sm"
            radius="xl"
            color="rgba(0, 255, 49, 0.44)"
            style={{ color: "black" }}
          >
            Approved
          </Button>
        ) : (
          <Button
            type="button"
            className="text-sm"
            radius="xl"
            color="#C20025"
            style={{ color: "white" }}
          >
            Decline
          </Button>
        )}
      </div>
      <div className="w-[7.5%] text-center">Not Available</div>
      <div className="w-[10%] text-center flex items-center justify-center">
        <Menu shadow="md">
          <Menu.Target>
            <Button
              type="button"
              className="text-sm"
              size="xs"
              style={{
                backgroundColor: "white",
                color: "black",
              }}
            >
              <BsThreeDots />
            </Button>
          </Menu.Target>
          <Menu.Dropdown
            style={{
              width: "100px",
            }}
          >
            {data?.Status == "Pending" ? (
              <Menu.Item
                leftSection={<BiEdit />}
                onClick={() => {
                  openM();
                }}
              >
                Edit
              </Menu.Item>
            ) : (
              <Menu.Item leftSection={<BiEdit />} className="bg-gray-400">
                Edit
              </Menu.Item>
            )}
            <Menu.Item leftSection={<TbTrash color="red" />} onClick={() => {}}>
              <span className="text-red-500">Delete</span>
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
      <Modal
        opened={openedM}
        onClose={closeM}
        withCloseButton={false}
        size="auto"
        centered
      >
        <NewTimeSheetModal close={closeM} type="single" data={[]} />
      </Modal>
    </div>
  );
};
export default SingleTimesheetDay;
