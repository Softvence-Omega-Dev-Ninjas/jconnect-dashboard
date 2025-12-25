export const ROLES = {
  SUPER_ADMIN: "SUPER_ADMIN",
  ADMIN: "ADMIN",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

export const ROUTE_PERMISSIONS: Record<string, Role[]> = {
  "/": [ROLES.SUPER_ADMIN, ROLES.ADMIN],
  "/users": [ROLES.SUPER_ADMIN, ROLES.ADMIN],
  "/users/:id": [ROLES.SUPER_ADMIN, ROLES.ADMIN],
  "/users/edit/:id": [ROLES.SUPER_ADMIN, ROLES.ADMIN],
  "/payments": [ROLES.SUPER_ADMIN, ROLES.ADMIN],
  "/reports": [ROLES.SUPER_ADMIN, ROLES.ADMIN],
  "/settings": [ROLES.SUPER_ADMIN, ROLES.ADMIN],
  "/disputes": [ROLES.SUPER_ADMIN, ROLES.ADMIN],
  "/disputes/:id": [ROLES.SUPER_ADMIN, ROLES.ADMIN],
};
