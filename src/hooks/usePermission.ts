import { Role } from "@/config/rbac";
import { useAppSelector } from "@/redux/hook";

export const usePermission = (requiredRoles: Role[]) => {
  const role = useAppSelector(state => state.auth.role);
  return requiredRoles.includes(role!);
};
