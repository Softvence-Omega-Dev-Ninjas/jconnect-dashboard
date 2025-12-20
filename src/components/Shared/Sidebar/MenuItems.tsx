import {
  LayoutDashboard,
  Users,
  CreditCard,
  BarChart3,
  Settings,
  HeartHandshake,
} from "lucide-react";

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  children?: MenuItem[];
  allowedRoles?: string[];
}

export const menuItems: MenuItem[] = [
  {
    id: "",
    label: "Dashboard",
    icon: <LayoutDashboard className="w-5 h-5" />,
    allowedRoles: ["SUPER_ADMIN", "ADMIN"],
  },
  {
    id: "users",
    label: "User",
    icon: <Users className="w-5 h-5" />,
    allowedRoles: ["SUPER_ADMIN", "ADMIN"],
  },
  {
    id: "payments",
    label: "Payments",
    icon: <CreditCard className="w-5 h-5" />,
    allowedRoles: ["SUPER_ADMIN", "ADMIN"],
  },
  {
    id: "disputes",
    label: "Disputes",
    icon: <HeartHandshake className="w-5 h-5" />,
    allowedRoles: ["SUPER_ADMIN", "ADMIN"],
  },
  {
    id: "reports",
    label: "Reports & Analytics",
    icon: <BarChart3 className="w-5 h-5" />,
    allowedRoles: ["SUPER_ADMIN", "ADMIN"],
  },
  {
    id: "settings",
    label: "Settings",
    icon: <Settings className="w-5 h-5" />,
    allowedRoles: ["SUPER_ADMIN", "ADMIN"],
  }
];