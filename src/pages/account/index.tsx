import EditProfile from "@/component/account/EditProfile";
import Security from "@/component/account/Security";
import MantineTab, { TabContentType } from "@/component/tabs";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

const Account = () => {
  const { signInData } = useSelector((state: RootState) => state.userReducer);

  const tabsContent: TabContentType = {
    components: [
      {
        id: "edit-profile",
        component: <EditProfile signInData={signInData} />,
      },
      { id: "security", component: <Security /> },
    ],
    labels: [
      { id: "edit-profile", label: "Edit Profile" },
      { id: "security", label: "Security" },
    ],
  };

  return (
    <div className="px-60 mt-16">
      <MantineTab tabsContent={tabsContent} />
    </div>
  );
};

export default Account;
