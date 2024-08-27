import SyncWorkspaceLogo from "@/assets/base-icon";
import { MdLegendToggle } from "react-icons/md";
import DarkModeSwitcher from "./dark-mode-switcher";
import DropdownUser from "./dropdown-user";
import DropdownMessage from "./message";
import DropdownNotification from "./notification";
import Search from "./search";
import SearchModal from "./search-modal";
const Navbar = ({
  toggleSidebar,
}: {
  toggleSidebar: () => void;
  sidebarOpen: boolean;
}) => {
  return (
    <nav className="flex items-center justify-between px-3 flex-grow bg-white z-50 py-3 border-b border-stroke relative">
      <div
        className={`flex justify-start items-center gap-7 transition-all duration-300 ease-in-out lg:w-[380px]`}
      >
        <MdLegendToggle
          size={33}
          className="hover:bg-slate-200 cursor-pointer p-1.5"
          onClick={toggleSidebar}
        />

        <SyncWorkspaceLogo />
      </div>

      <Search />

      <div className="flex items-center justify-between w-full">
        <div className="flex items-center justify-end space-x-4 md:space-x-6 w-full">
          <SearchModal />

          <DarkModeSwitcher />
          <DropdownNotification />
          <DropdownMessage />
          <DropdownUser />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
