import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Song } from "../songs/song.types";

interface Playlist {
  _id: string;
  name: string;
  coverImage?: string;
  user: {
    _id: string;
    email: string;
    username: string;
  };

  songs: Song[];
  createdAt: string;
  updatedAt: string;
}

interface PlaylistState {
  playlists: Playlist[];
  playlist: Playlist | null;
  fetching: boolean;
  mutuated: boolean;
  fetchError: string | null;
  error: string | null;
  creating: boolean;
  deleting: boolean;
  updating: boolean;
}

const initialState: PlaylistState = {
  playlists: [],
  playlist: null,
  fetching: false,
  fetchError: null,
  mutuated: false,
  error: null,
  creating: false,
  deleting: false,
  updating: false,
};

const playlistSlice = createSlice({
  name: "playlists",
  initialState,
  reducers: {
    fetchPlaylists: (state) => {
      state.fetching = true;
      state.error = null;
      state.fetchError = null;
    },
    fetchPlaylistsSuccess: (state, action: PayloadAction<Playlist[]>) => {
      state.playlists = action.payload;
      state.fetching = false;
      state.error = null;
    },
    fetchPlaylistsFailure: (state, action: PayloadAction<string>) => {
      state.fetchError = action.payload;
      state.fetching = false;
    },

    fetchPlaylist: (state) => {
      state.fetchError = null;
      state.fetching = true;
    },
    fetchPlaylistSuccess: (state, action: PayloadAction<Playlist>) => {
      state.playlist = action.payload;
      state.fetching = false;
      state.error = null;
    },
    fetchPlaylistFailure: (state, action: PayloadAction<string>) => {
      state.fetchError = action.payload;
      state.fetching = false;
    },

    createPlaylist: (state, _: PayloadAction<FormData>) => {
      state.error = null;
      state.mutuated = false;
      state.creating = true;
    },
    createPlaylistSuccess: (state) => {
      state.error = null;
      state.mutuated = true;
      state.creating = false;
    },
    createPlaylistFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.mutuated = false;
      state.creating = false;
    },

    deletePlaylist: (state, _: PayloadAction<string>) => {
      state.error = null;
      state.mutuated = false;
      state.deleting = true;
    },
    deletePlaylistSuccess: (state) => {
      state.error = null;
      state.mutuated = true;
      state.deleting = false;
    },
    deletePlaylistFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.mutuated = false;
      state.deleting = false;
    },

    updatePlaylist: (
      state,
      _: PayloadAction<{ data: FormData; id: string }>
    ) => {
      state.error = null;
      state.mutuated = false;
      state.updating = true;
    },
    updatePlaylistSuccess: (state) => {
      state.error = null;
      state.mutuated = true;
      state.updating = false;
    },
    updatePlaylistFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.mutuated = false;
      state.updating = false;
    },

    resetMutation: (state, action: PayloadAction<Partial<PlaylistState>>) => {
      state = {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const {
  fetchPlaylists,
  fetchPlaylistsSuccess,
  fetchPlaylistsFailure,

  fetchPlaylist,
  fetchPlaylistSuccess,
  fetchPlaylistFailure,

  createPlaylist,
  createPlaylistSuccess,
  createPlaylistFailure,

  deletePlaylist,
  deletePlaylistSuccess,
  deletePlaylistFailure,

  updatePlaylist,
  updatePlaylistSuccess,
  updatePlaylistFailure,
  resetMutation,
} = playlistSlice.actions;

export const playlistReducer = playlistSlice.reducer;
