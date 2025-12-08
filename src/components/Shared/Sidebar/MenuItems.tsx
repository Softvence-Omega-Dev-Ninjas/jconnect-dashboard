import {
  LayoutDashboard,
  Users,
  CreditCard,
  BarChart3,
  Settings,
  LogOut,
  HeartHandshake,
} from "lucide-react";

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  children?: MenuItem[];
}

export const menuItems: MenuItem[] = [
  {
    id: "",
    label: "Dashboard",
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    id: "user",
    label: "User",
    icon: <Users className="w-5 h-5" />,
  },
  {
    id: "payments",
    label: "Payments",
    icon: <CreditCard className="w-5 h-5" />,
  },
  {
    id: " disputes",
    label: "Disputes",
    icon: <HeartHandshake className="w-5 h-5" />,
  },
  {
    id: "reports",
    label: "Reports & Analytics",
    icon: <BarChart3 className="w-5 h-5" />,
  },
  {
    id: "settings",
    label: "Settings",
    icon: <Settings className="w-5 h-5" />,
  },
  {
    id: "login",
    label: "Logout",
    icon: <LogOut className="w-5 h-5" />,
  },
];
