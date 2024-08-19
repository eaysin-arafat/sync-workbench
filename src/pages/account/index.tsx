import MantineTab, { TabContentType } from "@/Component/Tabs/MantineTab";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import EditProfile from "../../Component/Account/EditProfile";
import Security from "../../Component/Account/Security";

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
