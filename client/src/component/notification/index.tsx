import LeaveRequestIcon from "@/assets/notification/LeaveRequestIcon";
import ProfileIcon from "@/assets/notification/ProfileIcon";
import SettingIcon from "@/assets/notification/SettingIcon";
import { useState } from "react";

export interface NotificationType {
  id: string;
  title: string;
  message: string;
  color: string;
  type: "profile" | "settings" | "request";
}

// Type the notificationIcon object with these specific keys
const notificationIcon = {
  profile: <ProfileIcon />,
  settings: <SettingIcon />,
  request: <LeaveRequestIcon />,
};

const Notification = ({
  notifications,
}: {
  notifications: NotificationType[];
}) => {
  const [showAll, setShowAll] = useState(false);

  const displayNotifications = showAll
    ? notifications
    : notifications.slice(0, 5);

  return (
    <>
      <div className="space-y-3 relative bg-white">
        <h2 className="text-[15px] font-medium fixed bg-white w-full px-4 pb-1">
          Notification
        </h2>
        <div className="space-y-6 pt-6 h-[335px] overflow-auto">
          {displayNotifications.map((item) => (
            <button className="flex items-center gap-4 px-4" key={item.id}>
              <div
                className={`h-7 w-7 flex items-center justify-center rounded-full`}
                style={{ backgroundColor: item.color }}
              >
                {notificationIcon[item.type]}
              </div>
              <div className="flex flex-col items-start">
                <h3 className="whitespace-nowrap text-base font-semibold">
                  {item.title}
                </h3>
                <p className="whitespace-nowrap text-xs text-[#B5B5B5]">
                  {item.message}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <button
        className="text-[#A8A8A8] font-semibold text-sm text-center pt-2.5"
        onClick={() => setShowAll(!showAll)}
      >
        {showAll ? "Show less" : "See all notifications"}
      </button>
    </>
  );
};

export default Notification;
