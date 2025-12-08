import { useState, useEffect } from "react";
import { X, Menu } from "lucide-react";
import { menuItems } from "./MenuItems";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/features/auth/authSlice";

export function Sidebar() {
  const [activeItem, setActiveItem] = useState<string>("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const currentPath = location.pathname.replace('/', '');
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
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-md"
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
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
      >
        {/* Header */}
        <div className="p-6 border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-medium">Admin</h2>
              <p className="text-sm text-[#1E1E1E]">Super Dashboard</p>
            </div>
            <button
              onClick={toggleSidebar}
              className="lg:hidden text-white hover:bg-gray-700 p-1 rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="px-3 py-4">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleItemClick(item.id)}
                  className={`
                    w-full flex items-center gap-3 px-4 py-2.5 rounded-md transition-all text-base font-medium
                    ${activeItem === item.id 
                      ? 'bg-[#BD001F] text-white font-medium' 
                      : 'text-black hover:bg-[#f18295] hover:text-white'
                    }
                  `}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}
