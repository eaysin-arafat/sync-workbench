import CalenderType1 from "@/Assets/Icons/CalenderType1";
import PDFType1 from "@/Assets/Icons/PDFType1";
import NewTimeSheetModal from "@/Component/TimeSheets/NewTimeSheetModal";
import DocumentsPreviewModal from "@/Component/TimesheetTable/DocumentsPreviewModal";
import {
  fetchDeleteTimeSheets,
  fetchGetTimeSheetsWeek,
} from "@/redux/reducers/timeSheetsSlicer";
import { fetchGetMediaUploaded } from "@/redux/reducers/userBGVSlicer";
import { AppDispatch, RootState } from "@/redux/store";
import { Button, Checkbox, Menu, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import React, { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { TbTrash } from "react-icons/tb";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const SingleListTimeSheet = ({
  type,
  data,
  reFetch,
  keyData,
}: {
  type: string;
  data: any;
  reFetch: () => void;
  keyData?: string;
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [openedM, { open: openM, close: closeM }] = useDisclosure(false);
  const dispatch: AppDispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.userReducer);
  const host = window.location.host;
  const subdomain = host.split(".")[0];
  const portalUrl = `${subdomain}.saciahub.com`;
  //   const strArr = id.map(function (e) {
  //     return e.toString();
  //   });

  const { filesMediaData }: { filesMediaData: any } = useSelector(
    (state: RootState) => state.userBgvReducer
  );
  const [fileUrl, setFileUrl] = useState<string>("");
  const [fileType, setFileType] = useState<string>("");

  const fetchFile = (file: string) => {
    open();
    dispatch(
      fetchGetMediaUploaded({
        portalUrl,
        file,
        token: token || "",
      })
    );

    const extension = file.split(".").pop();
    if (extension) {
      setFileType(extension);
      setFileType(extension);
    }
  };

  useEffect(() => {
    if (filesMediaData && filesMediaData instanceof Blob) {
      const url = URL.createObjectURL(filesMediaData);
      setFileUrl(url);
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [filesMediaData]);

  const [start, setStart] = useState("");
  const [end, setEnd] = useState<string>("");

  useEffect(() => {
    if (type !== "Month") {
      const startDate = keyData?.split(" to ")[0] ?? "";
      const endDate = keyData?.split(" to ")[1] ?? "";
      setStart(startDate);
      setEnd(endDate);
    } else {
      const startDate = keyData + "-01";
      const endDate = keyData + "-31";
      setStart(startDate);
      setEnd(endDate);
    }
  }, []);

  return (
    <div className="flex items-center py-3 bg-white mt-2 rounded-md border">
      {/* <div className="w-[5%] flex justify-start ml-4">
        <Checkbox color="black" className="!cursor-pointer" />
      </div> */}
      <div className="w-[15%] text-center text-sm font-semibold flex items-center justify-center">
        {data?.project_name}
      </div>
      <div className="flex gap-2 items-center w-[15%] justify-center text-sm font-semibold">
        <CalenderType1 />
        <p>{start}</p>
      </div>
      <div className="flex gap-2 items-center w-[15%] justify-center text-sm font-semibold">
        <CalenderType1 />
        <p>{end}</p>
      </div>

      <div className="w-[10%] text-center text-sm font-semibold flex items-center justify-center">
        {data?.task}
      </div>
      <div className="w-[10%] flex justify-center">
        <div
          className="flex gap-1 items-center justify-center border-gray-300 border-2 rounded-lg px-1 cursor-pointer"
          onClick={open}
        >
          <PDFType1 />
          <span className="text-gray-500">
            {data?.attachment[0].slice(0, 4)}...
            {data?.attachment[0].split(".")[1]}
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
      <div className="w-[10%] text-center text-sm font-semibold flex items-center justify-center">
        {data?.total_hours}
      </div>
      <div className="w-[15%] text-center">
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
            <Menu.Item
              leftSection={<TbTrash color="red" />}
              onClick={() => {
                dispatch(
                  fetchDeleteTimeSheets({
                    portalUrl,
                    token,
                    timesheetID: [data.ID.toString()],
                  })
                ).then(() => {
                  notifications.show({
                    color: "blue",
                    title: "Success",
                    message: "Timesheet deleted successfully",
                    autoClose: 4000,
                  });
                  reFetch();
                });
              }}
            >
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

export default SingleListTimeSheet;
