import PageNotFound from "@/component/not-found/PageNotFound";
import { createBrowserRouter } from "react-router-dom";
import privateRoute from "./private-route";
import publicRoute from "./public-route";

const routes = createBrowserRouter([
  ...privateRoute,
  ...publicRoute,
  { path: "*", element: <PageNotFound /> },
]);

export default routes;
