import CalenderType1 from "@/Assets/Icons/CalenderType1";
import { Button, Checkbox, Menu, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { BiEdit } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { TbTrash } from "react-icons/tb";
import RequestViewTimesheetModal from "../request/request-timesheet-modal";
import NewTimeSheetModal from "../time-sheets/new-time-sheet-modal";

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
  Days: number;
  Reason: string;
  LeaveType: string;
  StartDate: string;
  EndDate: string;
  RequestType: string;
  Change: string;
  Access: string;
}

const DashboardViewRequestList = ({
  userRequestsList,
  viewType,
  selectedRequests,
  setSelectedRequests,
  handleDelete,
}: {
  userRequestsList: any;
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
      {userRequestsList?.map((item: any) => (
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
              <div className="flex gap-1 items-center w-[15%] justify-center text-sm font-semibold">
                <CalenderType1 />
                <p>{item?.RequestDetails?.StartDate}</p>
              </div>
              <div className="flex gap-1 items-center w-[15%] justify-center text-sm font-semibold">
                <CalenderType1 />
                <p>{item?.RequestDetails?.EndDate}</p>
              </div>
              <div className="w-[15%] text-center text-sm font-semibold">
                {item?.RequestDetails?.LeaveType}
              </div>
              <div className="w-[20%] text-center text-sm font-semibold">
                {item?.RequestDetails?.Reason}
              </div>
            </>
          ) : viewType === "hr" || viewType === "profile-edit" ? (
            <>
              <div className="flex gap-2 items-center w-[15%] justify-center text-sm font-semibold">
                <CalenderType1 />{" "}
                <p>
                  {item?.CreationTimeAndDate
                    ? new Date(item?.CreationTimeAndDate)
                        .toISOString()
                        .split("T")[0]
                    : ""}
                </p>
              </div>
              <div className="w-[20%] text-center text-sm font-semibold">
                {(viewType === "hr" && item?.RequestDetails?.RequestType) ||
                  (viewType === "profile-edit" && item?.RequestDetails?.Change)}
              </div>
              <div className="w-[15%] text-center text-sm font-semibold">
                <Button
                  type="button"
                  className="text-sm"
                  radius="xl"
                  color="#F03E3E"
                  style={{ color: "white" }}
                >
                  {item?.RequestPriority}
                </Button>
              </div>
              <div className="w-[15%] text-center text-sm font-semibold">
                {item?.RequestDescription}
              </div>
            </>
          ) : (
            <>
              <div className="flex gap-2 items-center w-[15%] justify-center text-sm font-semibold">
                <CalenderType1 />
                <p>
                  {item?.CreationTimeAndDate
                    ? new Date(item?.CreationTimeAndDate)
                        .toISOString()
                        .split("T")[0]
                    : ""}
                </p>
              </div>
              <div className="w-[20%] text-center text-sm font-semibold">
                {item?.RequestDetails?.Access}
              </div>
              <div className="w-[15%] text-center">
                {/* <Button
                  type="button"
                  className="text-sm"
                  radius="xl"
                  color="#F03E3E"
                  style={{ color: "white" }}
                >
                  {item?.RequestPriority ? item?.RequestPriority : "Medium"}
                </Button> */}
              </div>
              <div className="w-[15%] text-center text-sm font-semibold">
                {item?.RequestDescription}
              </div>
            </>
          )}
          <div className="w-[15%] text-center">
            <Button
              type="button"
              className="text-sm"
              radius="xl"
              color="rgba(0, 255, 49, 0.44)"
              style={{ color: "black" }}
            >
              {item?.RequestStatus}
            </Button>
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
                  Undo
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
        {viewType === "missedTimesheet" ? (
          <NewTimeSheetModal close={close} type="single" data={[]} />
        ) : (
          <RequestViewTimesheetModal close={close} data={selectedData as any} />
        )}
      </Modal>
    </>
  );
};

export default DashboardViewRequestList;
