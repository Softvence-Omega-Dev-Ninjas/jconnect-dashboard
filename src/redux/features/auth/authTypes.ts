export interface User {
  id: string;
  full_name: string;
  email: string;
  profilePhoto: string | null;
  phone: string | null;
  role: "SUPER_ADMIN" | "ADMIN" | "USER";
  isVerified: boolean;
  isActive: boolean;
  isDeleted: boolean;
  is_terms_agreed: boolean;
  created_at: string;
  updated_at: string;
  last_login_at: string;
  login_attempts: number;
  auth_provider: string | null;
  validation_type: string;
  googleId: string | null;
  token_expires_at: string | null;
}

export interface Device {
  id: string;
  userId: string;
  browser: string;
  browserVersion: string;
  os: string;
  osVersion: string;
  deviceType: string;
  deviceModel: string;
  ipAddress: string;
  lastUsedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: User;
    devices: Device[];
  };
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface UserMeResponse {
  id: string;
  full_name: string;
  email: string;
  profilePhoto: string | null;
  phone: string | null;
  role: "SUPER_ADMIN" | "ADMIN" | "ARTIST";
  isVerified: boolean;
  isActive: boolean;
  isDeleted: boolean;
  is_terms_agreed: boolean;
  created_at: string;
  updated_at: string;
  last_login_at: string;
}
