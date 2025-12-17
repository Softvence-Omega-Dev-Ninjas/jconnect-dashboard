import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { Role } from "@/config/rbac";
import { UserMeResponse } from "./authTypes";

interface AuthState {
  user: UserMeResponse | null;
  role: Role | null;
  token: string | null;
}
const initialState: AuthState = {
  user: null,
  role: (Cookies.get('role') as Role) || null,
  token: Cookies.get('token') || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: UserMeResponse; token: string }>
    ) => {
      state.user = action.payload.user;
      state.role = action.payload.user.role as Role;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.role = null;
      state.token = null;
      Cookies.remove("token");
      Cookies.remove("role");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
