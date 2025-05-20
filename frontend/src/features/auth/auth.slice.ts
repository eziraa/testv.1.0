import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import type { LoginPayload, SignupPayload } from "./auth.types";
import type { Song } from "../songs/song.slice";

interface User {
  name: string;
  _id: string;
  email: string;
  username: string;
  favorites: Song[];
  createdAt: string;
  updatedAt: string;
}


interface AuthState {
  user: User | null;
  authTokens: {
    accessToken: string | null;
    refreshToken: string | null;
  },
  error: string | null;
  fetching: boolean;
  fetchError : string | null;
  mutuated: boolean;
  logingIn: boolean;
  signingUp: boolean;
  signingOut: boolean;
  toastId: any | null;
}

const initialState: AuthState = {
  user: null,
  authTokens: {
    accessToken: null,
    refreshToken: null,
  },
  fetchError: null,
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
      state.mutuated = false;
    },
    signupSuccess: (state, action: PayloadAction<AuthState>) => {
      state.signingUp = false;
      state.user = action.payload.user;
      state.authTokens = action.payload.authTokens
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
      state.mutuated = false;
    },
    loginSuccess: (state, action: PayloadAction<AuthState>) => {
      state.logingIn = false;
      state.user = action.payload.user;
      state.authTokens = action.payload.authTokens
      if (action.payload.authTokens) {
        localStorage.setItem("accessToken", action.payload.authTokens.accessToken || "");
        localStorage.setItem("refreshToken", action.payload.authTokens.refreshToken || "");
      }
      state.error = null;
      state.mutuated = true;
      toast.update(state.toastId, {
        render: "Signed in successfully",
        type: "success",
        isLoading: false,
        autoClose:3000,
      });
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.logingIn = false;
      state.error = action.payload;
      toast.update(state.toastId, {
        render: action.payload || "Failed to sign in",
        type: "error",
        isLoading: false,
        autoClose:3000,
      });
    },

    logout: (state) => {
      state.signingOut = true;
      state.error = null;
      state.mutuated = false;
    },
    logoutSuccess: (state) => {
      state.signingOut = false;
      state.user = null;
      state.authTokens = {
        accessToken: null,
        refreshToken: null,
      }
      state.error = null;
      state.mutuated = true;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      toast.success("Signed out successfully", {toastId: state.toastId});
    },
    logoutFailure: (state, action: PayloadAction<string>) => {
      state.signingOut = false;
      state.error = action.payload;
      state.toastId = toast.error("Failed to sign out", {toastId: state.toastId});
    },
    getMe: (state, _:PayloadAction<string | null>) => {
      state.fetching = true;
      state.fetchError = null;
      state.mutuated = false;
    },
    getMeSuccess: (state, action: PayloadAction<AuthState>) => {
      state.fetching = false;
      state.user = action.payload.user;
      state.authTokens = action.payload.authTokens
      state.fetchError = null;
      state.mutuated = true;
      
    },
    getMeFailure: (state, action: PayloadAction<string>) => {
      state.fetching = false;
      state.fetchError = action.payload;
      toast.update(state.toastId, {
        render: action.payload || "Failed to fetch user",
        type: "error",
        isLoading: false,
        autoClose:3000,
      });
    },

    refreshToken: (state) => {
      state.fetching = true;
      state.error = null;
      state.mutuated = false;
    },
    refreshTokenSuccess: (state, action: PayloadAction<AuthState>) => {
      state.fetching = false;
      state.user = action.payload.user;
      state.authTokens = action.payload.authTokens
      state.error = null;
      state.mutuated = true;
    },
    refreshTokenFailure: (state, action: PayloadAction<string>) => {
      state.fetching = false;
      state.error = action.payload;
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

