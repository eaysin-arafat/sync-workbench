import PrivateGuard from "@/component/guards/private-guard";
import NewTimeSheetTemplateTwo from "@/component/time-sheets/new-timesheet-template-two";
import RootLayout from "@/layout/root-layout";
import Account from "@/pages/account";
import AddUsers from "@/pages/add-users";
import Applications from "@/pages/applications";
import Calendar from "@/pages/calendar";
import Dashboard from "@/pages/dashboard";
import DeleteUsers from "@/pages/delete-users";
import Employee from "@/pages/employee";
import Profile from "@/pages/profile";
import Requests from "@/pages/request";
import RequestsView from "@/pages/requests-view";
import Terms from "@/pages/terms";
import TimeSheets from "@/pages/time-sheets";
import TimeSheetsView from "@/pages/time-sheets-view";
import UserInfo from "@/pages/user-info.tsx";
import { RouteObject } from "react-router-dom";
import {
  getCalendarLink,
  getDashboardLink,
  getEmployeeLink,
  getUserProfileLink,
  URLAccount,
  URLAddUsers,
  URLApplications,
  URLDeleteUsers,
  URLRequests,
  URLRequestsView,
  URLTermsConditions,
  URLTimeSheets,
  URLTimeSheetsTemplateTwo,
  URLTimeSheetsView,
  URLUserInfo,
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
            path: URLTimeSheets(),
            element: <TimeSheets />,
          },
          {
            path: URLTimeSheetsView(),
            element: <TimeSheetsView />,
          },
          {
            path: URLTimeSheetsTemplateTwo(),
            element: <NewTimeSheetTemplateTwo />,
          },
          {
            path: URLTermsConditions(),
            element: <Terms />,
          },
          {
            path: URLRequests(),
            element: <Requests />,
          },
          {
            path: URLRequestsView(),
            element: <RequestsView />,
          },
          {
            path: URLAccount(),
            element: <Account />,
          },
          {
            path: URLApplications(),
            element: <Applications />,
          },
          {
            path: URLUserInfo(),
            element: <UserInfo />,
          },
          {
            path: URLAddUsers(),
            element: <AddUsers />,
          },
          {
            path: URLDeleteUsers(),
            element: <DeleteUsers />,
          },
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
        ],
      },
    ],
  },
];

export default privateRoute;
