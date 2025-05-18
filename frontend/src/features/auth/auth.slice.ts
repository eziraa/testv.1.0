import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import type { LoginPayload, SignupPayload } from "./auth.types";

interface User {
  name: string;
  _id: string;
  email: string;
  username: string;
  favoriteSongs: string[];
  createdAt: string;
  updatedAt: string;
}


interface AuthState {
  user: User | null;
  refeshToken: string | null;
  accessToken: string | null;
  error: string | null;
  fetching: boolean;
  mutuated: boolean;
  logingIn: boolean;
  signingUp: boolean;
  signingOut: boolean;
  toastId: any | null;
}

const initialState: AuthState = {
  user: null,
  refeshToken: null,
  accessToken: null,
  error: null,
  fetching: false,
  mutuated: false,
  logingIn: false,
  signingUp: false,
  signingOut: false,
  toastId: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signup: (state, _: PayloadAction<SignupPayload>) => {
      state.signingUp = true;
      state.error = null;
      state.toastId = toast.loading("Signing up...");
      state.mutuated = false;
    },
    signupSuccess: (state, action: PayloadAction<AuthState>) => {
      state.signingUp = false;
      state.user = action.payload.user;
      state.refeshToken = action.payload.refeshToken;
      state.accessToken = action.payload.accessToken;
      state.error = null;
      state.mutuated = true;
      toast.success("Signed up successfully", {updateId: state.toastId, });
    },
    signupFailure: (state, action: PayloadAction<string>) => {
      state.signingUp = false;
      state.error = action.payload;
      toast.dismiss(state.toastId);
      state.toastId = null;
      state.toastId = toast.error(action.payload || "Failed to sign up");
    },

    login: (state, _: PayloadAction<LoginPayload>) => {
      state.logingIn = true;
      state.error = null;
      state.toastId = toast.loading("Signing in...");
      state.mutuated = false;
    },
    loginSuccess: (state, action: PayloadAction<AuthState>) => {
      state.logingIn = false;
      state.user = action.payload.user;
      state.refeshToken = action.payload.refeshToken;
      state.accessToken = action.payload.accessToken;
      state.error = null;
      state.mutuated = true;
      toast.success("Signed in successfully", {toastId: state.toastId});
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.logingIn = false;
      state.error = action.payload;
      state.toastId = toast.error("Failed to sign in", {toastId: state.toastId});
    },

    logout: (state) => {
      state.signingOut = true;
      state.error = null;
      state.toastId = toast.loading("Signing out...");
      state.mutuated = false;
    },
    logoutSuccess: (state) => {
      state.signingOut = false;
      state.user = null;
      state.refeshToken = null;
      state.accessToken = null;
      state.error = null;
      state.mutuated = true;
      toast.success("Signed out successfully", {toastId: state.toastId});
    },
    logoutFailure: (state, action: PayloadAction<string>) => {
      state.signingOut = false;
      state.error = action.payload;
      state.toastId = toast.error("Failed to sign out", {toastId: state.toastId});
    },
    getMe: (state) => {
      state.fetching = true;
      state.error = null;
      state.toastId = toast.loading("Fetching user...");
      state.mutuated = false;
    },
    getMeSuccess: (state, action: PayloadAction<AuthState>) => {
      state.fetching = false;
      state.user = action.payload.user;
      state.refeshToken = action.payload.refeshToken;
      state.accessToken = action.payload.accessToken;
      state.error = null;
      state.mutuated = true;
      toast.success("Fetched user successfully", {toastId: state.toastId});
    },
    getMeFailure: (state, action: PayloadAction<string>) => {
      state.fetching = false;
      state.error = action.payload;
      state.toastId = toast.error("Failed to fetch user", {toastId: state.toastId});
    },

    refreshToken: (state) => {
      state.fetching = true;
      state.error = null;
      state.toastId = toast.loading("Refreshing token...");
      state.mutuated = false;
    },
    refreshTokenSuccess: (state, action: PayloadAction<AuthState>) => {
      state.fetching = false;
      state.user = action.payload.user;
      state.refeshToken = action.payload.refeshToken;
      state.accessToken = action.payload.accessToken;
      state.error = null;
      state.mutuated = true;
      toast.success("Refreshed token successfully", {toastId: state.toastId});
    },
    refreshTokenFailure: (state, action: PayloadAction<string>) => {
      state.fetching = false;
      state.error = action.payload;
      state.toastId = toast.error("Failed to refresh token", {toastId: state.toastId});
    },
    resetMutation: (state, action : PayloadAction<Partial<AuthState>>) =>{
      state = {
        ...state,
        ...action.payload,
      };

    },
  },
});

export const {
  signup,
  signupSuccess,
  signupFailure,

  login,
  loginSuccess,
  loginFailure,

  logout,
  logoutSuccess,
  logoutFailure,

  getMe,
  getMeSuccess,
  getMeFailure,

  refreshToken,
  refreshTokenSuccess,
  refreshTokenFailure,
  resetMutation
} = authSlice.actions;

export const authReducer = authSlice.reducer;

