import { User } from "@/constants/api-interface/user";
import { cookieManager } from "@/utils/cookie-manager";
import { createSlice } from "@reduxjs/toolkit";

type AuthState = {
  isLoggedIn: boolean;
  user: User | null;
  jwtToken: string | null;
  error: string | null;
};

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
  jwtToken: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.jwtToken = action.payload.jwt;
    },
    logout: (state) => {
      cookieManager.removeCookie("jwtToken");

      state.isLoggedIn = false;
      state.user = null;
      state.jwtToken = null;
    },
    setToken: (state, action) => {
      state.jwtToken = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { login, logout, setError, setToken, setUser } = authSlice.actions;

export default authSlice.reducer;
