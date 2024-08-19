import CalenderType1 from "@/assets/Icons/CalenderType1";
import { RequestType } from "@/Types/requestType";
import { convertUTCToLocalTime } from "@/utils/utcToLocalTime";
import { Button, Checkbox, Menu, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { BiEdit } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { TbTrash } from "react-icons/tb";
import RequestViewTimeSheetModal from "../request/request-timesheet-modal";
import RequestViewModal from "../request/request-view-modal";

export interface RequestListType {
  ID: number;
  RequestUUID: string;
  RequestType: string;
  RequestDetails: RequestDetails;
  RequestDescription?: string;
  RequestPriority?: string;
  RequestStatus: string;
  CreatedOn: string;
}

interface RequestDetails {
  ClientName: string;
  ProjectName: string;
  Task: string;
  Days: number;
  Reason: string;
  LeaveType: string;
  Hours: string;
  StartDate: string;
  RequestAttachmentURL: string;
  EndDate: string;
  RequestType: string;
  Change: string;
  Access: string;
  Client?: string;
  RequestDescription?: string;
  Project?: string;
  Time: any;
}

const convertDate = (dateString: string) => {
  const date = new Date(dateString);

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};

const RequestSingleList = ({
  userRequestsList,
  viewType,
  selectedRequests,
  setSelectedRequests,
  handleDelete,
}: {
  userRequestsList: RequestListType[];
  viewType: string;
  selectedRequests: string[];
  setSelectedRequests: (ids: string[]) => void;
  handleDelete: (ids: string[]) => void;
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedData, setSelectedData] = useState<RequestListType | null>(
    null
  );

  const handleSelect = (ID: string) => {
    if (selectedRequests.includes(ID)) {
      setSelectedRequests(selectedRequests.filter((id) => id !== ID));
    } else {
      setSelectedRequests([...selectedRequests, String(ID)]);
    }
  };

  return (
    <>
      {userRequestsList?.map((item: RequestListType) => (
        <div
          className="flex items-center py-3 bg-white mt-2 rounded-md"
          key={item?.ID}
          id={item?.RequestUUID}
        >
          <div className="w-[10%] flex justify-start ml-4">
            <Checkbox
              color="black"
              checked={selectedRequests.includes(String(item.ID))}
              onChange={() => handleSelect(String(item.ID))}
            />
          </div>
          {viewType === "time-off" ? (
            <>
              <div className="flex gap-1 items-center w-[15%] justify-center">
                <CalenderType1 />
                <p>{convertUTCToLocalTime(item?.RequestDetails?.StartDate)}</p>
              </div>
              <div className="flex gap-1 items-center w-[15%] justify-center">
                <CalenderType1 />
                <p>{convertUTCToLocalTime(item?.RequestDetails?.EndDate)}</p>
              </div>
              <div className="w-[15%] text-center">
                {item?.RequestDetails?.LeaveType}
              </div>
              <div className="w-[20%] text-center">
                {item?.RequestDetails?.Reason}
              </div>
            </>
          ) : viewType === "time-sheet" ? (
            <>
              <div className="flex gap-1 items-center w-[15%] justify-center">
                <CalenderType1 />
                <p>
                  {Array.isArray(item?.RequestDetails?.Time) &&
                  item?.RequestDetails?.Time.length > 0
                    ? convertUTCToLocalTime(
                        item?.RequestDetails?.Time[0].StartDate
                      )
                    : null}
                </p>
              </div>
              <div className="flex gap-1 items-center w-[15%] justify-center">
                <CalenderType1 />
                <p>
                  {Array.isArray(item?.RequestDetails?.Time) &&
                  item?.RequestDetails?.Time.length > 0
                    ? convertUTCToLocalTime(
                        item?.RequestDetails?.Time[0].EndDate
                      )
                    : null}
                </p>
              </div>
              <div className="flex gap-1 items-center w-[10%] justify-center">
                <p>
                  {Array.isArray(item?.RequestDetails?.Time) &&
                  item?.RequestDetails?.Time.length > 0
                    ? item.RequestDetails.Time[0].Hours
                    : null}
                </p>
              </div>
              <div className="w-[15%] text-center">
                {item?.RequestDetails?.Client}
              </div>
              <div className="w-[12%] text-center">
                {item?.RequestDetails?.Project}
              </div>
              <div className="w-[17%] text-center">
                {item?.RequestDetails?.Task}
              </div>
              <div className="w-[15%] text-center">
                {item?.RequestDetails?.RequestDescription}
              </div>
            </>
          ) : viewType === "hr" || viewType === "profile-edit" ? (
            <>
              <div className="flex gap-2 items-center w-[15%] justify-center">
                <CalenderType1 /> <p>{convertDate(item?.CreatedOn)}</p>
              </div>
              <div className="w-[20%] text-center">
                {(viewType === "hr" && item?.RequestDetails?.RequestType) ||
                  (viewType === "profile-edit" && item?.RequestDetails?.Change)}
              </div>
              <div className="w-[15%] text-center">
                {item?.RequestPriority === "Medium" ? (
                  <Button
                    type="button"
                    className="text-sm"
                    radius="xl"
                    color="rgba(0, 255, 49, 0.44"
                    style={{ color: "black" }}
                  >
                    Medium
                  </Button>
                ) : item?.RequestPriority === "Low" ? (
                  <Button
                    type="button"
                    className="text-sm"
                    radius="xl"
                    color="#FDB447"
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
                {item?.RequestDescription}
              </div>
            </>
          ) : (
            <>
              <div className="flex gap-2 items-center w-[15%] justify-center">
                <CalenderType1 />
                <p>{convertDate(item?.CreatedOn)}</p>
              </div>
              <div className="w-[20%] text-center">
                {item?.RequestDetails?.Access}
              </div>
              <div className="w-[15%] text-center">
                {item?.RequestPriority === "Medium" ? (
                  <Button
                    type="button"
                    className="text-sm"
                    radius="xl"
                    color="rgba(0, 255, 49, 0.44"
                    style={{ color: "black" }}
                  >
                    Medium
                  </Button>
                ) : item?.RequestPriority === "Low" ? (
                  <Button
                    type="button"
                    className="text-sm"
                    radius="xl"
                    color="#FDB447"
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
                {item?.RequestDescription}
              </div>
            </>
          )}
          <div className="w-[15%] text-center">
            {item?.RequestStatus === "Pending" ? (
              <Button
                type="button"
                className="text-sm"
                radius="xl"
                color="rgba(242, 178, 2, 0.44)"
                style={{ color: "black" }}
              >
                Pending
              </Button>
            ) : item?.RequestStatus === "Approved" ? (
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
          <div className="w-[10%] text-center">
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
                <Menu.Item
                  leftSection={<BiEdit />}
                  onClick={() => {
                    open();
                    setSelectedData(item);
                  }}
                >
                  Edit
                </Menu.Item>
                <Menu.Item leftSection={<TbTrash color="red" />}>
                  <span
                    className="text-red-500"
                    onClick={() => handleDelete([String(item.ID)])}
                  >
                    Delete
                  </span>
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </div>
        </div>
      ))}

      <Modal
        opened={opened}
        onClose={close}
        withCloseButton={false}
        size="auto"
        centered
      >
        {viewType === "time-sheet" ? (
          <RequestViewTimeSheetModal close={close} data={selectedData as any} />
        ) : (
          <RequestViewModal
            close={close}
            type={viewType as RequestType}
            data={selectedData || null}
          />
        )}
      </Modal>
    </>
  );
};

export default RequestSingleList;
