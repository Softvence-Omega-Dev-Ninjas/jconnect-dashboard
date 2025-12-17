import { Bell, Search } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useAppSelector } from "@/redux/hook";
import { useEffect, useRef, useState } from "react";
import NotificationList from "./component/NotificationList";

const Navbar = () => {
  const user = useAppSelector((state) => state.auth.user);

  const unread = useAppSelector((state) => state.notifications.unread);

  const [open, setOpen] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <nav className="fixed top-0 right-0 left-0 lg:left-64 bg-white border-b border-gray-200 z-30 h-14 sm:h-16">
      <div className="flex items-center justify-between h-full px-3 sm:px-4 md:px-6 ml-12 lg:ml-0">
        {/* Search Bar */}
        <div className="flex-1 max-w-xs sm:max-w-sm md:max-w-md hidden sm:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-9 pr-3 py-1.5 sm:py-2 bg-[#F8E6E9] border border-gray-200 rounded-md text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-gray-300"
            />
          </div>
        </div>

        {/* Mobile Search */}
        <button className="sm:hidden text-gray-600 p-1">
          <Search className="w-5 h-5" />
        </button>

        {/* Right Section */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 relative">
          {/* Notification */}
          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => setOpen((p) => !p)}
              className="relative text-gray-600 hover:text-gray-900 p-1"
            >
              <Bell className="w-5 h-5" />
              {unread > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
                  {unread}
                </span>
              )}
            </button>

            {open && (
              <div className="absolute right-0 mt-2 z-50">
                <NotificationList onClose={() => setOpen(false)} />
              </div>
            )}
          </div>

          {/* User */}
          <div className="flex items-center gap-2">
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm font-medium text-gray-700 hidden md:block max-w-[120px] truncate">
                Admin User
              </span>
              <span className="text-xs sm:text-sm font-medium text-gray-700 hidden md:block max-w-[120px] truncate">
                {user?.role || "admin"}
              </span>
            </div>
            <Avatar className="w-7 h-7 sm:w-8 sm:h-8">
              <AvatarImage
                src={
                  user?.profilePhoto ||
                  "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"
                }
              />
              <AvatarFallback className="text-xs">
                {user?.full_name?.charAt(0) || "A"}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
