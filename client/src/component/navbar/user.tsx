import ChangePasswordIcon from "@/assets/account/ChangePasswordIcon";
import LogoutIcon from "@/assets/account/LogoutIcon";
import ManageAccountIcon from "@/assets/account/ManageAccount";
import { Menu } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { MdAccountCircle } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const User = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    navigate("/");
    notifications.show({
      color: "blue",
      title: "Success",
      message: "Logout Successful",
      autoClose: 4000,
    });
  };

  return (
    <div className="flex items-center gap-2">
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <div className="flex items-center gap-4 cursor-pointer">
            <MdAccountCircle size={35} />

            <div className="flex flex-col items-start">
              <p className="text-sm font-semibold">{"Eaysin"}</p>
              <p className="text-xs font-medium capitalize">{"User"}</p>
            </div>
          </div>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item
            leftSection={<ManageAccountIcon />}
            onClick={() => navigate("/account")}
          >
            Manage Account
          </Menu.Item>
          <Menu.Divider />

          <Menu.Item
            leftSection={<ChangePasswordIcon />}
            onClick={() => navigate("/account")}
          >
            Change Password
          </Menu.Item>
          <Menu.Divider />

          <Menu.Item
            leftSection={<LogoutIcon />}
            color="red"
            className="font-semibold"
            onClick={handleLogout}
          >
            Log out
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
};

export default User;
