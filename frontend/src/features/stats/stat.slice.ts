import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { DashboardStats } from "./stat.type";


interface StatState {
    stats: DashboardStats | null
  fetchError: string | null;
  fetching: boolean;
}

const initialState: StatState = {
  fetching: false,
  fetchError: null,
  stats: null
};

const statSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {
    fetchStats: (state) => {
      state.fetching = true;
      state.fetchError = null;
    },
    fetchStatsSuccess: (state, action: PayloadAction<DashboardStats>) => {
      state.stats = action.payload;
      state.fetching = false;
      state.fetchError = null;
    },
    fetchStatsFailure: (state, action: PayloadAction<string>) => {
      state.fetchError = action.payload;
      state.fetching = false;
    },

  },
});

export const {
  fetchStats,
  fetchStatsSuccess,
  fetchStatsFailure,

 
} = statSlice.actions;

export const statReducer = statSlice.reducer;
