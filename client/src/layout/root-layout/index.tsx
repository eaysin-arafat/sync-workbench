import Navbar from "@/component/navbar";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";

const RootLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="bg-[#FAFAFB] h-screen flex flex-col">
      <Navbar toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
      <div className="flex flex-grow overflow-hidden">
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <main className="px-3 md:px-6 w-full border border-stroke border-t-0 py-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default RootLayout;
