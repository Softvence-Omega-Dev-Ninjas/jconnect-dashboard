export const ROLES = {
  ADMIN: "ADMIN",
  FINANCE_ADMIN: "FINANCE_ADMIN",
  ANALYST: "ANALYST",
  SUPPORT_ADMIN: "SUPPORT_ADMIN",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

export const ROUTE_PERMISSIONS: Record<string, Role[]> = {
  "/": [
    ROLES.ADMIN,
    ROLES.FINANCE_ADMIN,
    ROLES.ANALYST,
    ROLES.SUPPORT_ADMIN,
  ],
  "/users": [ROLES.ADMIN, ROLES.SUPPORT_ADMIN],
  "/users/:id": [ROLES.ADMIN, ROLES.SUPPORT_ADMIN],
  "/users/edit/:id": [ROLES.ADMIN, ROLES.SUPPORT_ADMIN],
  "/payments": [ROLES.ADMIN, ROLES.FINANCE_ADMIN],
  "/reports": [ROLES.ADMIN, ROLES.FINANCE_ADMIN],
  "/settings": [ROLES.ADMIN],
  "/disputes": [ROLES.ADMIN, ROLES.ANALYST],
  "/disputes/:id": [ROLES.ADMIN, ROLES.ANALYST],
};
