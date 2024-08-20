import EditProfile from "@/component/account/edit-profile";
import Security from "@/component/account/security";
import MantineTab, { TabContentType } from "@/component/tabs";

const Account = () => {
  const tabsContent: TabContentType = {
    components: [
      {
        id: "edit-profile",
        component: <EditProfile signInData={{}} />,
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
