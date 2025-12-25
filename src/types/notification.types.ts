export type NotificationType =
  | "user.create"
  | "service.create";

export interface Notification {
  type: NotificationType;
  title: string;
  message: string;
  createdAt: string;
  meta: Record<string, any>;
}
