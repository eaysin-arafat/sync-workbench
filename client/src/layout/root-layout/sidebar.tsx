import useWindowWidth from "@/hooks/shared/useWindowWidth";
import { useEffect, useState } from "react";
import { IoIosLink } from "react-icons/io";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { sidebarMenu } from "./sidebar-data";

const Sidebar = ({
  sidebarOpen,
  setSidebarOpen,
}: {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const navigate = useNavigate();
  const W1024 = useWindowWidth(1024);

  const toggleMenu = (id: string, link?: string) => {
    if (link) {
      navigate(link);
      if (W1024) setSidebarOpen(!sidebarOpen);
    } else {
      setOpenMenuId(openMenuId === id ? null : id);
    }
  };

  useEffect(() => {
    if (W1024) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [W1024]);

  return (
    <div className="h-screen">
      <aside
        className={`overflow-y-auto shadow-lg bg-white h-[94%] pb-5 transition-all duration-300 ease-in-out fixed lg:static z-50 w-[280px]  ${
          sidebarOpen ? "ms-[0px]" : "ms-[-280px]"
        }`}
      >
        <nav aria-label="Main" className="space-y-2">
          {sidebarMenu?.map((item) => (
            <div key={item?.id}>
              <div
                onClick={() => toggleMenu(item?.id, item?.link)}
                className={`flex items-center p-2 transition-colors hover:bg-slate-200 space-x-3 px-5 py-2.5 cursor-pointer`}
              >
                <span aria-hidden="true">
                  {item?.icon ? item?.icon : <IoIosLink />}
                </span>
                <span className="text-sm">{item?.title}</span>
                {item?.submenu && item?.submenu?.length > 0 && (
                  <MdOutlineKeyboardArrowDown
                    size={23}
                    className={`${openMenuId === item.id ? "rotate-180" : ""}`}
                  />
                )}
              </div>
              {item?.submenu && openMenuId === item?.id && (
                <div className={`mt-2 space-y-2 pl-10`}>
                  {item?.submenu?.map((subItem) => (
                    <Link
                      className={`flex items-center p-2 transition-colors rounded-sm hover:bg-slate-200 cursor-pointer`}
                      key={subItem?.id}
                      to={subItem?.link}
                      onClick={() => {
                        if (W1024) setSidebarOpen(!sidebarOpen);
                      }}
                    >
                      <span aria-hidden="true">
                        {subItem?.icon ? subItem?.icon : <IoIosLink />}
                      </span>
                      <span className="ml-3 text-sm">{subItem?.title}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
