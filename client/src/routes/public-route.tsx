import PublicGuard from "@/component/guards/PublicGuard";
import SignIn from "@/pages/authentication/signIn";
import SignUp from "@/pages/authentication/signUp";
import { RouteObject } from "react-router-dom";
import { getSignupLink } from "./router-link";

const publicRoute: RouteObject[] = [
  {
    element: <PublicGuard />,
    children: [
      { path: "/", element: <SignIn /> },
      { path: getSignupLink(), element: <SignUp /> },
    ],
  },
];

export default publicRoute;
