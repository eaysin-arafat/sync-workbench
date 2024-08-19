import CalenderType1 from "@/Assets/Icons/CalenderType1";
import PDFType1 from "@/Assets/Icons/PDFType1";
import NewTimeSheetModal from "@/Component/TimeSheets/NewTimeSheetModal";
import DocumentsPreviewModal from "@/Component/TimesheetTable/DocumentsPreviewModal";
import {
  fetchDeleteTimeSheets,
  fetchGetTimeSheetsWeek,
} from "@/redux/reducers/timeSheetsSlicer";
import { fetchGetMediaUploaded } from "@/redux/reducers/userBGVSlicer";
import { fetchDeleteUserRequest } from "@/redux/reducers/userRequestsSlicer";
import { AppDispatch, RootState } from "@/redux/store";
import { convertUTCToLocalTime } from "@/utils/utcToLocalTime";
import { Button, Checkbox, Menu, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import React, { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { TbTrash } from "react-icons/tb";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const SingleRequestList = ({
  data,
  reFetch,
  type,
  isLoading,
}: {
  data: any;
  reFetch: () => void;
  type: string;
  isLoading: boolean;
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [openedM, { open: openM, close: closeM }] = useDisclosure(false);
  const dispatch: AppDispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.userReducer);
  const host = window.location.host;
  const subdomain = host.split(".")[0];
  const portalUrl = `${subdomain}.saciahub.com`;
  const [fileUrl, setFileUrl] = useState<string>("");
  const [fileType, setFileType] = useState<string>("");
  const { filesMediaData }: { filesMediaData: any } = useSelector(
    (state: RootState) => state.userBgvReducer
  );

  useEffect(() => {
    if (filesMediaData && filesMediaData instanceof Blob) {
      const url = URL.createObjectURL(filesMediaData);
      setFileUrl(url);
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [filesMediaData]);

  return (
    <div className="flex items-center py-3 bg-white mt-2 rounded-md border">
      {type === "HR" ? (
        <>
          {/* <div className="w-[5%] flex justify-start ml-4">
            <Checkbox color="black" className="!cursor-pointer" />
          </div> */}
          <div className="w-[10%] text-center text-sm font-semibold flex items-center justify-center">
            {data?.RequestType}
          </div>
          <div className="w-[14%] text-center text-sm font-semibold flex items-center justify-center">
            {data?.RequestDetails?.RequestType}
          </div>
          <div className="w-[22%] text-center text-sm font-semibold flex items-center justify-center">
            {data?.RequestDescription}
          </div>
          <div className="w-[10%] text-center text-sm font-semibold flex items-center justify-center">
            {data?.RequestPriority === "Medium" ? (
              <Button
                type="button"
                className="text-sm"
                radius="xl"
                color="rgba(242, 178, 2, 0.44)"
                style={{ color: "black" }}
              >
                Medium
              </Button>
            ) : data?.RequestPriority === "Low" ? (
              <Button
                type="button"
                className="text-sm"
                radius="xl"
                color="rgba(0, 255, 49, 0.44)"
                style={{ color: "black" }}
              >
                Low
              </Button>
            ) : (
              <Button
                type="button"
                className="text-sm"
                radius="xl"
                color="#C20025"
                style={{ color: "white" }}
              >
                High
              </Button>
            )}
          </div>
          <div className="w-[15%] text-center">
            {data?.RequestStatus === "Pending" ? (
              <Button
                type="button"
                className="text-sm"
                radius="xl"
                color="rgba(242, 178, 2, 0.44)"
                style={{ color: "black" }}
              >
                Pending
              </Button>
            ) : data?.RequestStatus === "Approved" ? (
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
          <div className="w-[14%] text-center text-sm font-semibold flex items-center justify-center">
            {data?.CreatedOn
              ? new Date(data.CreatedOn).toISOString().split("T")[0]
              : ""}
          </div>
        </>
      ) : type === "TimeOff" ? (
        <>
          {/* <div className="w-[5%] flex justify-start ml-4">
            <Checkbox color="black" className="!cursor-pointer" />
          </div> */}
          <div className="w-[10%] text-center text-sm font-semibold flex items-center justify-center">
            {data?.RequestType}
          </div>
          <div className="w-[14%] text-center text-sm font-semibold flex items-center justify-center">
            {data?.RequestDetails?.Reason}
          </div>
          <div className="w-[15%] text-center text-sm font-semibold flex items-center justify-center gap-2">
            <CalenderType1 />
            {convertUTCToLocalTime(data?.RequestDetails?.StartDate)}
          </div>
          <div className="w-[15%] text-center text-sm font-semibold flex items-center justify-center gap-2">
            <CalenderType1 />
            {convertUTCToLocalTime(data?.RequestDetails?.EndDate)}
          </div>
          <div className="w-[10%] text-center text-sm font-semibold flex items-center justify-center">
            {data?.RequestPriority === "Medium" ? (
              <Button
                type="button"
                className="text-sm"
                radius="xl"
                color="rgba(242, 178, 2, 0.44)"
                style={{ color: "black" }}
              >
                Medium
              </Button>
            ) : data?.RequestPriority === "Low" ? (
              <Button
                type="button"
                className="text-sm"
                radius="xl"
                color="rgba(0, 255, 49, 0.44)"
                style={{ color: "black" }}
              >
                Low
              </Button>
            ) : (
              <Button
                type="button"
                className="text-sm"
                radius="xl"
                color="#C20025"
                style={{ color: "white" }}
              >
                High
              </Button>
            )}
          </div>
          <div className="w-[15%] text-center">
            {data?.RequestStatus === "Pending" ? (
              <Button
                type="button"
                className="text-sm"
                radius="xl"
                color="rgba(242, 178, 2, 0.44)"
                style={{ color: "black" }}
              >
                Pending
              </Button>
            ) : data?.RequestStatus === "Approved" ? (
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
          <div className="w-[14%] text-center text-sm font-semibold flex items-center justify-center">
            {data?.CreatedOn
              ? new Date(data.CreatedOn).toISOString().split("T")[0]
              : ""}
          </div>
        </>
      ) : type === "TimeSheet" && !isLoading ? (
        <>
          {/* <div className="w-[5%] flex justify-start ml-4">
            <Checkbox color="black" className="!cursor-pointer" />
          </div> */}
          <div className="w-[10%] text-center text-sm font-semibold flex items-center justify-center">
            {data?.RequestType}
          </div>
          <div className="w-[14%] text-center text-sm font-semibold flex items-center justify-center">
            {data?.RequestDetails?.Client}
          </div>
          <div className="w-[14%] text-center text-sm font-semibold flex items-center justify-center">
            {data?.RequestDetails?.Project}
          </div>
          <div className="w-[14%] text-center text-sm font-semibold flex items-center justify-center">
            {data?.RequestDetails?.Task}
          </div>
          <div className="w-[15%] text-center text-sm font-semibold flex items-center justify-center gap-2">
            <CalenderType1 />
            {data?.RequestDetails?.Time &&
            data.RequestDetails.Time.length > 0 &&
            data.RequestDetails.Time[0]?.StartDate
              ? convertUTCToLocalTime(data.RequestDetails.Time[0].StartDate)
              : ""}
          </div>
          <div className="w-[15%] text-center text-sm font-semibold flex items-center justify-center gap-2">
            <CalenderType1 />
            {data?.RequestDetails?.Time &&
            data.RequestDetails.Time.length > 0 &&
            data.RequestDetails.Time[0]?.EndDate
              ? convertUTCToLocalTime(data.RequestDetails.Time[0].EndDate)
              : ""}
          </div>
          <div className="w-[15%] text-center text-sm font-semibold flex items-center justify-center gap-2">
            {data?.RequestDetails?.Time &&
            data.RequestDetails.Time.length > 0 &&
            data.RequestDetails.Time[0]?.Hours
              ? data.RequestDetails.Time[0].Hours
              : ""}
          </div>
          {/* <div className="w-[14%] text-center text-sm font-semibold flex items-center justify-center">
            {data?.CreatedOn
              ? new Date(data.CreatedOn).toISOString().split("T")[0]
              : ""}
          </div> */}
        </>
      ) : type === "Access" ? (
        <>
          {/* <div className="w-[5%] flex justify-start ml-4">
            <Checkbox color="black" className="!cursor-pointer" />
          </div> */}
          <div className="w-[15%] text-center text-sm font-semibold flex items-center justify-center">
            {data?.RequestType}
          </div>
          <div className="w-[15%] text-center text-sm font-semibold flex items-center justify-center">
            {data?.RequestDetails?.Access}
          </div>
          <div className="w-[15%] text-center text-sm font-semibold flex items-center justify-center">
            {data?.RequestDescription}
          </div>
          <div className="w-[15%] flex justify-center">
            <div
              className="flex gap-1 items-center justify-center border-gray-300 border-2 rounded-lg px-1 cursor-pointer"
              onClick={open}
            >
              {data?.RequestAttachmentURL !== null ? (
                <>
                  <PDFType1 />
                  <span className="text-gray-500">
                    {data?.RequestAttachmentURL?.slice(0, 4)}...
                    {data?.RequestAttachmentURL?.split(".")[1]}
                  </span>
                </>
              ) : (
                <p>No Attachment</p>
              )}
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
          <div className="w-[20%] text-center">
            {data?.RequestStatus === "Pending" ? (
              <Button
                type="button"
                className="text-sm"
                radius="xl"
                color="rgba(242, 178, 2, 0.44)"
                style={{ color: "black" }}
              >
                Pending
              </Button>
            ) : data?.RequestStatus === "Approved" ? (
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
          <div className="w-[10%] text-center text-sm font-semibold flex items-center justify-center">
            {data?.CreatedOn
              ? new Date(data.CreatedOn).toISOString().split("T")[0]
              : ""}
          </div>
        </>
      ) : type === "ProfileChange" ? (
        <>
          {/* <div className="w-[5%] flex justify-start ml-4">
            <Checkbox color="black" className="!cursor-pointer" />
          </div> */}
          <div className="w-[15%] text-center text-sm font-semibold flex items-center justify-center">
            {data?.RequestType}
          </div>
          <div className="w-[25%] text-center text-sm font-semibold flex items-center justify-center">
            {data?.RequestDetails?.Change}
          </div>
          <div className="w-[25%] text-center text-sm font-semibold flex items-center justify-center">
            {data?.RequestDescription}
          </div>
          <div className="w-[20%] flex justify-center">
            <div
              className="flex gap-1 items-center justify-center border-gray-300 border-2 rounded-lg px-1 cursor-pointer"
              onClick={data?.RequestAttachmentURL !== null ? open : undefined}
            >
              {data?.RequestAttachmentURL !== null ? (
                <>
                  <PDFType1 />
                  <span className="text-gray-500">
                    {data?.RequestAttachmentURL?.slice(0, 4)}...
                    {data?.RequestAttachmentURL?.split(".")[1]}
                  </span>
                </>
              ) : (
                <>
                  <p>No Attachment</p>
                </>
              )}
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
            {data?.RequestPriority === "Medium" ? (
              <Button
                type="button"
                className="text-sm"
                radius="xl"
                color="rgba(242, 178, 2, 0.44)"
                style={{ color: "black" }}
              >
                Medium
              </Button>
            ) : data?.RequestPriority === "Low" ? (
              <Button
                type="button"
                className="text-sm"
                radius="xl"
                color="rgba(0, 255, 49, 0.44)"
                style={{ color: "black" }}
              >
                Low
              </Button>
            ) : (
              <Button
                type="button"
                className="text-sm"
                radius="xl"
                color="#C20025"
                style={{ color: "white" }}
              >
                High
              </Button>
            )}
          </div>
          <div className="w-[20%] text-center">
            {data?.Status === "Pending" ? (
              <Button
                type="button"
                className="text-sm"
                radius="xl"
                color="rgba(242, 178, 2, 0.44)"
                style={{ color: "black" }}
              >
                Pending
              </Button>
            ) : data?.Status === "Approved" ? (
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
        </>
      ) : null}
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
                  fetchDeleteUserRequest({
                    portalUrl,
                    requestIds: [data?.ID],
                  })
                ).then(() => {
                  notifications.show({
                    color: "blue",
                    title: "Success",
                    message: "Request deleted successfully",
                    autoClose: 4000,
                  });
                });
                reFetch();
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

export default SingleRequestList;
