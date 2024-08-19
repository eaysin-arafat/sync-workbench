import NewTimeSheetTemplateTwo from "@/Component/TimeSheets/NewTimeSheetTemplateTwo";
import Account from "@/Pages/Account";
import AddUsers from "@/Pages/AddUsers";
import Applications from "@/Pages/Applications";
import BgvReport from "@/Pages/BgvReport";
import CompanyDashboard from "@/Pages/CompanyDashboard";
import CompanySignUp from "@/Pages/CompanySignUp";
import DeleteUsers from "@/Pages/DeleteUsers";
import Requests from "@/Pages/Request";
import RequestsView from "@/Pages/RequestsView";
import TimeSheets from "@/Pages/TimeSheets";
import TimeSheetsView from "@/Pages/TimeSheetsView";
import UserDashboard from "@/Pages/UserDashboard";
import UserInfo from "@/Pages/UserInfo.tsx";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { createBrowserRouter, Navigate } from "react-router-dom";
import RootLayout from "../Layout/RootLayout";
import SignIn from "../Pages/SignIn/SignIn";
import Terms from "../Pages/Terms/Terms";
import UserBGV from "../Pages/UserBGV";
import UserSignUp from "../Pages/UserSignUp/UserSignUp";
import ProtectedRoute from "./ProtectedRoute";
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
