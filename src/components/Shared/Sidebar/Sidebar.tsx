import { useState, useEffect, useMemo } from "react";
import { X, Menu, LogOut } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/features/auth/authSlice";

import { menuItems } from "./MenuItems";
import { useAppSelector } from "@/redux/hook";

export function Sidebar() {
  const [activeItem, setActiveItem] = useState<string>("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // const userRole = Cookies.get("role");
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();


const { role } = useAppSelector(state => state.auth);
const filteredMenuItems = useMemo(() => {
  if (!role) return [];
  return menuItems.filter(item => item.allowedRoles?.includes(role));
}, [role]);


  useEffect(() => {
    const currentPath = location.pathname.replace("/", "");
    setActiveItem(currentPath);
  }, [location.pathname]);

  const handleItemClick = (id: string) => {
    setActiveItem(id);

    if (id === "login") {
      dispatch(logout());
      navigate("/login");
    } else {
      navigate(`/${id}`);
    }

    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed flex items-center top-6 left-4 z-50 p-2 bg-gray-800 text-white rounded-md"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen bg-white text-gray-900 w-64 z-50 transition-transform duration-300
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Header */}
        <div className="p-6 border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">Admin</h2>
              <p className="text-sm text-[#1E1E1E]">Super Dashboard</p>
            </div>
            <button
              onClick={toggleSidebar}
              className="lg:hidden text-black hover:bg-gray-700 p-1 rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="px-3 py-4">
          <ul className="space-y-1">
            {filteredMenuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleItemClick(item.id)}
                  className={`
                    w-full flex items-center gap-3 px-4 py-2.5 rounded-md transition-all text-base font-medium
                    ${
                      activeItem === item.id
                        ? "btn-primary text-white font-medium ml-1.5"
                        : "text-black hover:bg-[#f18295] hover:text-white"
                    }
                  `}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => handleItemClick("login")}
                className="w-full flex items-center gap-3 px-4 py-2.5 mt-6 rounded-md transition-all text-base text-[#FF0000] font-medium
                   hover:bg-[#f18295] hover:text-white"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}
