import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserMeResponse } from "./authTypes";
import Cookies from "js-cookie";

interface AuthState {
  user: UserMeResponse | null;
}

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: UserMeResponse }>) => {
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.user = null;
      Cookies.remove('token');
      Cookies.remove('role');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
