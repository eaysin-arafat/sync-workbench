import { Outlet } from "react-router-dom";
import Navbar from "../Component/Navbar/Navbar";

const RootLayout: React.FC = () => {
  return (
    <div className="bg-[#FAFAFB] px-5 min-h-screen">
      <Navbar />
      <main className="w-[1440px] mx-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
