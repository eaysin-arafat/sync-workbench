import Navbar from "@/component/navbar";
import { Outlet } from "react-router-dom";

const RootLayout: React.FC = () => {
  return (
    <div className="bg-[#FAFAFB] px-5">
      <Navbar />
      <main className="mx-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
