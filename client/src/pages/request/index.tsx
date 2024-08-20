import RequestViewTimeSheetModal from "@/component/request/request-timesheet-modal";
import RequestViewModal from "@/component/request/request-view-modal";
import { URLRequestsView } from "@/routes/router-link";
import { RequestType } from "@/types/requestType";
import { Button, Menu, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { BiSolidLock } from "react-icons/bi";
import { BsFillBagFill, BsThreeDots } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { IoWarningOutline } from "react-icons/io5";
import { MdTimelapse } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const requestData = [
  {
    id: "hr",
    title: "HR",
    icon: <BsFillBagFill color="#FF0000" size={40} />,
    subtitle: "Employees can request HR and view status of their request",
  },
  {
    id: "time-off",
    title: "TimeOff",
    icon: <MdTimelapse color="#FF0000" size={40} />,
    subtitle: "Employees can request time off and view status of their request",
  },
  {
    id: "profile-edit",
    title: "Profile Edit",
    icon: <CgProfile color="#FF0000" size={40} />,
    subtitle:
      "Employees can request profile change and view status of their request",
  },
  {
    id: "access",
    title: "Access",
    icon: <BiSolidLock color="#FF0000" size={40} />,
    subtitle:
      "Employees can request Access Change and view status of their request",
  },
  {
    id: "time-sheet",
    title: "Missed Timesheet",
    icon: <IoWarningOutline color="#FF0000" size={40} />,
    subtitle:
      "Employees can request to add missed timesheet and view status of their request",
  },
];

const Requests = () => {
  const [viewType, setViewType] = useState<string | "">("");

  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);

  const handleViewType = (type: RequestType) => setViewType(type);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-10 justify-center mt-20">
      {requestData.map((item) => {
        return (
          <div
            className="bg-white border shadow-sm rounded-md p-8 flex flex-col justify-center items-center"
            key={item.id}
          >
            <div className="flex items-center justify-between w-full mb-6">
              <div className="flex flex-col gap-0.5 items-start">
                {item.icon}
                <p className="text-sm font-medium ml-[4px]">{item.title}</p>
              </div>
              <Menu shadow="md" position="bottom-start">
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
                    width: "140px",
                  }}
                >
                  <Menu.Item
                    onClick={() => {
                      handleViewType(item.id as RequestType);
                      open();
                    }}
                  >
                    New Request
                  </Menu.Item>
                  <Menu.Item onClick={() => navigate(URLRequestsView(item.id))}>
                    View Requests
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </div>
            <p className="text-[12px] text-[#A1A1A1]">{item.subtitle}</p>
          </div>
        );
      })}

      <Modal
        opened={opened}
        onClose={close}
        withCloseButton={false}
        size="auto"
        centered
      >
        {viewType === "time-sheet" ? (
          <RequestViewTimeSheetModal close={close} data={null as any} />
        ) : (
          <RequestViewModal close={close} type={viewType as RequestType} />
        )}
      </Modal>
    </div>
  );
};

export default Requests;
