import {
  getAttendanceLink,
  getCalendarLink,
  getDashboardLink,
  getDepartmentLink,
  getDocumentLink,
  getEmployeeLink,
  getFeedbackSuggestionsLink,
  getHelpSupportLink,
  getLeaveLink,
  getPayrollLink,
  getPerformanceReviewsLink,
  getProjectTaskLink,
  getReportsLink,
  getRolePermissionLink,
  getSecurityLink,
  getSettingsLink,
  getUserProfileLink,
} from "@/routes/router-link";
import { getShortId } from "@/utils/generate-shortid";
import { FaProjectDiagram } from "react-icons/fa";
import { FiMonitor } from "react-icons/fi";
import { GrDocumentPerformance } from "react-icons/gr";
import { IoMdCalendar } from "react-icons/io";
import {
  MdDashboard,
  MdOutlinePermDataSetting,
  MdPeople,
  MdTimeToLeave,
} from "react-icons/md";
import { SiBasicattentiontoken } from "react-icons/si";

export type SidebarMenuType = {
  id: string;
  title: string;
  icon: React.ReactNode;
  link: string;
  submenu?: SidebarMenuType[];
};

export const sidebarMenu: SidebarMenuType[] = [
  {
    id: getShortId(),
    title: "Dashboard",
    icon: <MdDashboard />,
    link: getDashboardLink(),
  },
  {
    id: getShortId(),
    title: "Employee",
    icon: <MdPeople />,
    link: getEmployeeLink(),
  },
  {
    id: getShortId(),
    title: "Department",
    icon: <FiMonitor />,
    link: getDepartmentLink(),
  },
  {
    id: getShortId(),
    title: "Role & Permission",
    icon: <MdOutlinePermDataSetting />,
    link: getRolePermissionLink(),
  },
  {
    id: getShortId(),
    title: "Project & Task",
    icon: <FaProjectDiagram />,
    link: getProjectTaskLink(),
  },
  {
    id: getShortId(),
    title: "Attendance",
    icon: <SiBasicattentiontoken />,
    link: getAttendanceLink(),
  },
  {
    id: getShortId(),
    title: "Leave",
    icon: <MdTimeToLeave />,
    link: getLeaveLink(),
  },
  {
    id: getShortId(),
    title: "Calendar",
    icon: <IoMdCalendar />,
    link: getCalendarLink(),
  },
  {
    id: getShortId(),
    title: "Performance Reviews",
    icon: <GrDocumentPerformance />,
    link: getPerformanceReviewsLink(),
  },
  {
    id: getShortId(),
    title: "Payroll",
    icon: "",
    link: getPayrollLink(),
  },
  {
    id: getShortId(),
    title: "Document",
    icon: "",
    link: getDocumentLink(),
  },
  {
    id: getShortId(),
    title: "Reports",
    icon: "",
    link: getReportsLink(),
  },
  {
    id: getShortId(),
    title: "Settings",
    icon: "",
    link: getSettingsLink(),
  },
  {
    id: getShortId(),
    title: "User Profile & Security",
    icon: "",
    link: "",
    submenu: [
      {
        id: getShortId(),
        title: "User Profile",
        icon: <GrDocumentPerformance />,
        link: getUserProfileLink(),
      },
      {
        id: getShortId(),
        title: "Security",
        icon: <GrDocumentPerformance />,
        link: getSecurityLink(),
      },
    ],
  },
  {
    id: getShortId(),
    title: "Help & Support",
    icon: "",
    link: getHelpSupportLink(),
  },
  {
    id: getShortId(),
    title: "Feedback & Suggestions",
    icon: "",
    link: getFeedbackSuggestionsLink(),
  },
];
