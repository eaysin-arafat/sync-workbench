import MenuIcon from "@/Assets/application-icon/MenuIcon";
import UserIcon from "@/Assets/application-icon/UserIcon";
import CompletedIcon from "@/Assets/status/CompletedIcon";
import { URLUserInfo } from "@/Routes/router-link";
import { Menu } from "@mantine/core";
import { Link } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const UserProfile = ({ data }: { data: any[] }) => {
  const hasProfileImage = false;

  return (
    <div className="grid grid-cols-4 items-center justify-center gap-10 py-10 px-20">
      {data.map(() => (
        <div
          key={Date.now()}
          className="relative bg-white border py-10 px-2 rounded-lg"
        >
          <button className="absolute right-6 top-6">
            <Menu shadow="md">
              <Menu.Target>
                <button className="py-2 px-2">
                  <MenuIcon />
                </button>
              </Menu.Target>

              <Menu.Dropdown className="flex flex-col items-center justify-center w-full text-center">
                <Menu.Item>View BGV Report</Menu.Item>
                <Menu.Item>User Info</Menu.Item>
                <Menu.Item>Onbaoard</Menu.Item>
                <Menu.Item color="red">Report User</Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </button>

          <Link
            to={URLUserInfo()}
            className="flex flex-col items-center justify-center gap-8 "
          >
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
              <h1 className="text-base font-bold flex items-center gap-1.5">
                Username <CompletedIcon />
              </h1>

              <span className="text-[#202224] text-sm font-semibold">
                Designer
              </span>
              <p className="text-[#202224] text-sm">Example@example.com</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default UserProfile;
