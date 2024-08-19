import { Menu } from "@mantine/core";
import { IoIosNotifications } from "react-icons/io";
import { generate } from "shortid";
import Notification, { NotificationType } from "../Notification/Notification";

const notifications: NotificationType[] = [
  {
    id: generate(),
    title: "Hardware",
    type: "settings",
    color: "#4E96FF",
    message: "Hardware Access Granted",
  },
  {
    id: generate(),
    type: "profile",
    color: "#9E8FFF",
    title: "Profile",
    message: "Hardware Access Granted",
  },
  {
    id: generate(),
    type: "request",
    color: "#F40000",
    title: "Setting",
    message: "Update profile Approved",
  },
  {
    id: generate(),
    type: "profile",
    color: "#9E8FFF",
    title: "Profile",
    message: "Hardware Access Granted",
  },
  {
    id: generate(),
    type: "request",
    color: "#F40000",
    title: "Setting",
    message: "Update profile Approved",
  },
  {
    id: generate(),
    type: "request",
    color: "#F40000",
    title: "Setting",
    message: "Update profile Approved",
  },
  {
    id: generate(),
    type: "request",
    color: "#F40000",
    title: "Setting",
    message: "Update profile Approved",
  },
  {
    id: generate(),
    type: "request",
    color: "#F40000",
    title: "Setting",
    message: "Update profile Approved",
  },
];

const UserNotifications = () => {
  return (
    <div className="relative">
      <Menu shadow="md" width={304}>
        <Menu.Target>
          <div className="cursor-pointer">
            <IoIosNotifications size={25} />
            <span className="absolute flex items-center justify-center bg-red-600 h-[12px] w-[12px] text-[8px] text-white rounded-full top-0 right-0">
              5
            </span>
          </div>
        </Menu.Target>

        <Menu.Dropdown className="!rounded-2xl flex flex-col justify-between !py-3 !px-0">
          <Notification notifications={notifications} />
        </Menu.Dropdown>
      </Menu>
    </div>
  );
};

export default UserNotifications;
