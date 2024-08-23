import PublicGuard from "@/component/guards/PublicGuard";
import SignIn from "@/pages/Authentication/SignIn";
import SignUp from "@/pages/Authentication/SignUp";
import { RouteObject } from "react-router-dom";
import { URLUserSignup } from "./router-link";

const publicRoute: RouteObject[] = [
  {
    element: <PublicGuard />,
    children: [
      { path: "/", element: <SignIn /> },
      { path: URLUserSignup(), element: <SignUp /> },
    ],
  },
];

export default publicRoute;
