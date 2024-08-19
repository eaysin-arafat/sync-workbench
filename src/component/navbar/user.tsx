import ChangePasswordIcon from "@/assets/account/ChangePasswordIcon";
import LogoutIcon from "@/assets/account/LogoutIcon";
import ManageAccountIcon from "@/assets/account/ManageAccount";
import { setChangePassword } from "@/redux/reducers/extra-slicer";
import { setClearAllData } from "@/redux/reducers/user-slicer";
import { AppDispatch, RootState } from "@/redux/store";
import { Menu } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { MdAccountCircle } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const User = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { signInData } = useSelector((state: RootState) => state.userReducer);

  const handleLogout = async () => {
    dispatch(setClearAllData());
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
              <p className="text-sm font-semibold">{signInData?.UserName}</p>
              <p className="text-xs font-medium capitalize">
                {signInData?.Role}
              </p>
            </div>
          </div>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item
            leftSection={<ManageAccountIcon />}
            onClick={() => {
              navigate("/account");
              dispatch(setChangePassword(false));
            }}
          >
            Manage Account
          </Menu.Item>
          <Menu.Divider />

          <Menu.Item
            leftSection={<ChangePasswordIcon />}
            onClick={() => {
              navigate("/account");
              dispatch(setChangePassword(true));
            }}
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
