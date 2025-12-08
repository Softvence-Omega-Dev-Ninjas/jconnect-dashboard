import { Bell, Search } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const Navbar = () => {
  return (
    <nav className="fixed top-0 right-0 left-0 lg:left-64 bg-white border-b border-gray-200 z-30 h-16">
      <div className="flex items-center justify-between h-full px-4 md:px-6">
        {/* Search Bar */}
        <div className="flex-1 max-w-md hidden sm:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by Order ID"
              className="w-full pl-10 pr-4 py-2 bg-[#F8E6E9] border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gray-300"
            />
          </div>
        </div>

        {/* Mobile Search Icon */}
        <button className="sm:hidden text-gray-600">
          <Search className="w-5 h-5" />
        </button>

        {/* Right Section */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Notification Bell */}
          <button className="relative text-gray-600 hover:text-gray-900">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
              2
            </span>
          </button>

          {/* Admin User */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700 hidden md:block">Admin User</span>
            <Avatar className="w-8 h-8">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" />
              <AvatarFallback>AU</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
