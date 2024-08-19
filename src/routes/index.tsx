import NewTimeSheetTemplateTwo from "@/component/time-sheets/new-timesheet-template-two";
import RootLayout from "@/layout/RootLayout";
import Account from "@/pages/account";
import AddUsers from "@/pages/add-users";
import Applications from "@/pages/applications";
import BgvReport from "@/pages/bgv-report";
import CompanyDashboard from "@/pages/company-dashboard";
import CompanySignUp from "@/pages/company-signup";
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
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { createBrowserRouter, Navigate } from "react-router-dom";
import ProtectedRoute from "./protected-route";
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
  const { role } = useSelector((state: RootState) => state.userReducer);

  if (role === "Admin") {
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
        element: (
          <ProtectedRoute
            allowedRoles={["user", "Admin"]}
            fallback={<Navigate to={URLSignIn()} />}
          >
            <RoleBasedDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: URLTimeSheets(),
        element: (
          <ProtectedRoute
            allowedRoles={["user", "Admin"]}
            fallback={<Navigate to={URLSignIn()} />}
          >
            <TimeSheets />
          </ProtectedRoute>
        ),
      },
      {
        path: URLTimeSheetsView(),
        element: (
          <ProtectedRoute
            allowedRoles={["user", "Admin"]}
            fallback={<Navigate to={URLSignIn()} />}
          >
            <TimeSheetsView />
          </ProtectedRoute>
        ),
      },
      {
        path: URLTimeSheetsTemplateTwo(),
        element: (
          <ProtectedRoute
            allowedRoles={["user", "Admin"]}
            fallback={<Navigate to={URLSignIn()} />}
          >
            <NewTimeSheetTemplateTwo />
          </ProtectedRoute>
        ),
      },
      {
        path: URLTermsConditions(),
        element: (
          <ProtectedRoute
            allowedRoles={["user", "Admin"]}
            fallback={<Navigate to={URLSignIn()} />}
          >
            <Terms />
          </ProtectedRoute>
        ),
      },
      {
        path: URLRequests(),
        element: (
          <ProtectedRoute
            allowedRoles={["user", "Admin"]}
            fallback={<Navigate to={URLSignIn()} />}
          >
            <Requests />
          </ProtectedRoute>
        ),
      },
      {
        path: URLRequestsView(),
        element: (
          <ProtectedRoute
            allowedRoles={["user", "Admin"]}
            fallback={<Navigate to={URLSignIn()} />}
          >
            <RequestsView />
          </ProtectedRoute>
        ),
      },
      {
        path: URLAccount(),
        element: (
          <ProtectedRoute
            allowedRoles={["user", "Admin"]}
            fallback={<Navigate to={URLSignIn()} />}
          >
            <Account />
          </ProtectedRoute>
        ),
      },
      {
        path: URLApplications(),
        element: (
          <ProtectedRoute
            allowedRoles={["user", "Admin"]}
            fallback={<Navigate to={URLSignIn()} />}
          >
            <Applications />
          </ProtectedRoute>
        ),
      },
      {
        path: URLUserInfo(),
        element: (
          <ProtectedRoute
            allowedRoles={["user", "Admin"]}
            fallback={<Navigate to={URLSignIn()} />}
          >
            <UserInfo />
          </ProtectedRoute>
        ),
      },
      {
        path: URLAddUsers(),
        element: (
          <ProtectedRoute
            allowedRoles={["Admin"]}
            fallback={<Navigate to={URLSignIn()} />}
          >
            <AddUsers />
          </ProtectedRoute>
        ),
      },
      {
        path: URLDeleteUsers(),
        element: (
          <ProtectedRoute
            allowedRoles={["Admin"]}
            fallback={<Navigate to={URLSignIn()} />}
          >
            <DeleteUsers />
          </ProtectedRoute>
        ),
      },
      {
        path: URLBGVReport(),
        element: (
          <ProtectedRoute
            allowedRoles={["user", "Admin"]}
            fallback={<Navigate to={URLSignIn()} />}
          >
            <BgvReport />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: URLUserBGV(),
    element: (
      <ProtectedRoute
        allowedRoles={["user", "Admin"]}
        fallback={<Navigate to={URLSignIn()} />}
      >
        <UserBGV />
      </ProtectedRoute>
    ),
  },
]);

export default router;
