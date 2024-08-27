import PrivateGuard from "@/component/guards/private-guard";
import RootLayout from "@/layout/root-layout";
import Calendar from "@/pages/calendar";
import Dashboard from "@/pages/dashboard";
import Department from "@/pages/department";
import Employee from "@/pages/employee";
import Profile from "@/pages/profile";
import { RouteObject } from "react-router-dom";
import {
  getCalendarLink,
  getDashboardLink,
  getDepartmentLink,
  getEmployeeLink,
  getUserProfileLink,
} from "./router-link";

const privateRoute: RouteObject[] = [
  {
    element: <PrivateGuard />,
    children: [
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
        ],
      },
    ],
  },
];

export default privateRoute;
