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
    <nav className="flex px-7 bg-bgColor z-10 py-3 border-b border-stroke relative">
      <div
        className={`flex justify-between items-center transition-all duration-300 ease-in-out w-[280px]`}
      >
        <SyncWorkspaceLogo />

        <MdLegendToggle
          size={33}
          className="hover:bg-bgColor text-textColor cursor-pointer p-1.5"
          onClick={toggleSidebar}
        />
      </div>

      <div className="w-full flex items-center justify-between ">
        <Search />

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
