import RootLayout from "@/layout/root-layout";
import Calendar from "@/pages/calendar";
import Dashboard from "@/pages/dashboard";
import Department from "@/pages/department";
import Designation from "@/pages/designation";
import Employee from "@/pages/employee";
import Profile from "@/pages/profile";
import RolePermission from "@/pages/rule-permission";
import { RouteObject } from "react-router-dom";
import {
  getCalendarLink,
  getDashboardLink,
  getDepartmentLink,
  getDesignationLink,
  getEmployeeLink,
  getRolePermissionLink,
  getUserProfileLink,
} from "./router-link";

const privateRoute: RouteObject[] = [
  // {
  //   element: <PrivateGuard />,
  //   children: [
  {
    element: <RootLayout />,
    children: [
      { path: getDashboardLink(), element: <Dashboard /> },
      {
        path: getUserProfileLink(),
        element: <Profile />,
      },
      {
        path: getCalendarLink(),
        element: <Calendar />,
      },
      {
        path: getEmployeeLink(),
        element: <Employee />,
      },
      {
        path: getDepartmentLink(),
        element: <Department />,
      },
      {
        path: getRolePermissionLink(),
        element: <RolePermission />,
      },
      {
        path: getDesignationLink(),
        element: <Designation />,
      },
    ],
  },
  //     ],
  //   },
];

export default privateRoute;
