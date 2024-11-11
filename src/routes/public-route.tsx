import PublicGuard from "@/component/guards/public-guard";
import Login from "@/pages/authentication/login";
import Register from "@/pages/authentication/register";
import { RouteObject } from "react-router-dom";
import { getSignupLink } from "./router-link";

const publicRoute: RouteObject[] = [
  {
    element: <PublicGuard />,
    children: [
      { path: "/", element: <Login /> },
      { path: getSignupLink(), element: <Register /> },
    ],
  },
];

export default publicRoute;
