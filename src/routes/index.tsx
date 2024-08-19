import NewTimeSheetTemplateTwo from "@/component/time-sheets/new-timesheet-template-two";
import RootLayout from "@/layout/RootLayout";
import Account from "@/pages/account";
import AddUsers from "@/pages/add-users";
import CompanyDashboard from "@/pages/admin-dashboard";
import CompanySignUp from "@/pages/admin-signup";
import Applications from "@/pages/applications";
import BgvReport from "@/pages/bgv-report";
import DeleteUsers from "@/pages/delete-users";
import Requests from "@/pages/request";
import RequestsView from "@/pages/requests-view";
import SignIn from "@/pages/signin";
import Terms from "@/pages/terms";
import TimeSheets from "@/pages/time-sheets";
import TimeSheetsView from "@/pages/time-sheets-view";
import UserBGV from "@/pages/user-bgv";
import UserDashboard from "@/pages/user-dashboard";
import UserInfo from "@/pages/user-info.tsx";
import UserSignUp from "@/pages/user-signup";
import { getUserRole, Role } from "@/utils/get-role";
import { createBrowserRouter, Navigate } from "react-router-dom";
import {
  URLAccount,
  URLAddUsers,
  URLApplications,
  URLBGVReport,
  URLCompanySignup,
  URLDashboard,
  URLDeleteUsers,
  URLRequests,
  URLRequestsView,
  URLSignIn,
  URLTermsConditions,
  URLTimeSheets,
  URLTimeSheetsTemplateTwo,
  URLTimeSheetsView,
  URLUserBGV,
  URLUserInfo,
  URLUserSignup,
} from "./router-link";

const RoleBasedDashboard = () => {
  const role: Role = getUserRole();

  if (role === "admin") {
    return <CompanyDashboard />;
  } else if (role === "user") {
    return <UserDashboard />;
  } else {
    return <Navigate to={URLSignIn()} />;
  }
};

const router = createBrowserRouter([
  { path: URLCompanySignup(), element: <CompanySignUp /> },
  { path: URLSignIn(), element: <SignIn /> },
  { path: URLUserSignup(), element: <UserSignUp /> },
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: URLDashboard(),
        element: <RoleBasedDashboard />,
      },
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
        path: URLBGVReport(),
        element: <BgvReport />,
      },
    ],
  },
  {
    path: URLUserBGV(),
    element: <UserBGV />,
  },
]);

export default router;
