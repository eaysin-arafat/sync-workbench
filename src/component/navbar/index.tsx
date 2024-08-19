import {
  URLApplications,
  URLDashboard,
  URLRequests,
  URLTimeSheets,
} from "@/routes/router-link";
import { getUserRole, Role } from "@/utils/get-role";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";
import User from "./user";
import UserNotifications from "./user-notifications";

interface NavLink {
  label: string;
  path?: string;
}
const Navbar = () => {
  const role: Role = getUserRole();

  const location = useLocation();
  const navLinks: NavLink[] = [
    {
      label: "Dashboard",
      path: URLDashboard(),
    },
    { label: "TimeSheets", path: URLTimeSheets() },
    { label: "Requests", path: URLRequests() },
  ];

  if (role === "admin") {
    navLinks.push({ label: "Applications", path: URLApplications() });
  }

  const isActive = (path?: string) => {
    if (!path) return false;
    return location.pathname === path || location.pathname.startsWith(path);
  };

  return (
    <nav className="flex items-center justify-between px-11 py-5 sticky top-0 bg-white z-50">
      <div className="flex items-center">
        <img src={logo} alt="Logo" height={55} width={175} />
      </div>

      <ul className="hidden md:flex space-x-4">
        {navLinks.map((navLink) => (
          <li key={navLink.label} className="flex flex-col">
            <Link
              to={navLink.path || "#"}
              className={`px-3 py-0.5 font-medium text-black ${
                isActive(navLink.path) ? "text-red-600" : ""
              }`}
            >
              {navLink.label}
            </Link>
            <span
              className={
                isActive(navLink.path) ? "bg-red-500 h-1 rounded-lg w-full" : ""
              }
            ></span>
          </li>
        ))}
      </ul>

      <div className="flex items-center space-x-16">
        <UserNotifications />
        <User />
      </div>
    </nav>
  );
};

export default Navbar;
