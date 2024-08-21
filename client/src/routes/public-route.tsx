import PublicGuard from "@/component/guards/PublicGuard";
import SignIn from "@/pages/signin";
import UserBGV from "@/pages/user-bgv";
import UserSignUp from "@/pages/user-signup";
import { RouteObject } from "react-router-dom";
import { URLUserBGV, URLUserSignup } from "./router-link";

const publicRoute: RouteObject[] = [
  {
    element: <PublicGuard />,
    children: [
      { path: "/", element: <SignIn /> },
      { path: URLUserSignup(), element: <UserSignUp /> },
      {
        path: URLUserBGV(),
        element: <UserBGV />,
      },
    ],
  },
];

export default publicRoute;
