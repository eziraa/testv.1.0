import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type Song, type Stats,  } from "./song.types";


interface SongState {
  songs: Song[];
  song: Song | null;
  stats: Stats | null;
  fetching: boolean;
  creating: boolean;
  updating: boolean;
  deleting: boolean;
  error: string | null;
}

const initialState: SongState = {
  songs: [],
  song: null,
  stats: null,
  fetching: false,
  creating: false,
  updating: false,
  deleting: false,
  error: null,
};

const songSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    fetchSongs: (state) => {
      state.fetching = true;
      state.error = null;
    },
    fetchSongsSuccess: (state, action: PayloadAction<Song[]>) => {
      state.songs = action.payload;
      state.fetching = false;
      state.error = null;
    },
    fetchSongsFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.fetching = false;
    },
    fetchStats: (state) => {
          state.fetching = true;
          state.error = null;
        },
        fetchStatsSuccess: (state, action: PayloadAction<Stats>) => {
          state.stats = action.payload;
          state.fetching = false;
          state.error = null;
        },
        fetchStatsFailure: (state, action: PayloadAction<string>) => {
          state.fetching = false;
          state.error = action.payload;
        },
    fetchSong: (state) => {
      state.error = null;
      state.fetching = true;
    },
    fetchSongSuccess: (state, action: PayloadAction<Song>) => {
      state.song = action.payload;
      state.fetching = false;
      state.error = null;
    },
    fetchSongFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.fetching = false;

    },
    createSong: (state) => {
      state.error = null;
      state.creating = true;
    },
    createSongSuccess: (state) => {
      state.creating = false;
      state.error = null;
    },
    createSongFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.creating = false;
    },
  },
});

export const {
  fetchSongs,
  fetchSongsSuccess,
  fetchSongsFailure,

  fetchSong,
  fetchSongSuccess,
  fetchSongFailure,

  fetchStats,
  fetchStatsSuccess,
  fetchStatsFailure,

  createSong,
  createSongSuccess,
  createSongFailure,
} = songSlice.actions;

export const songReducer = songSlice.reducer;
