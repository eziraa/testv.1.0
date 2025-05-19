import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Artist } from "../artists/artist.types";

export interface Song {
  _id: string;
  title: string;
  artist: Artist;
  album: string;
  genre: string;
  audioUrl: string;
  releaseDate: string;
}

interface SongState {
  songs: (Song & {artist: Artist})[];
  song: Song | null;
  fetching: boolean;
  mutuated: boolean;
  error: string | null;
  fetchError: string | null;
  creating: boolean;
  deleting: boolean;
  updating: boolean;
}

const initialState: SongState = {
  songs: [],
  song: null,
  fetching: false,
  mutuated: false,
  error: null,
  fetchError: null,
  creating: false,
  deleting: false,
  updating: false,
};

const songSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    fetchSongs: (state, _: PayloadAction<string>) => {
      state.fetching = true;
      state.fetchError = null;
    },
    fetchSongsSuccess: (state, action: PayloadAction<Song[]>) => {
      state.songs = action.payload;
      state.fetching = false;
      state.fetchError = null;
    },
    fetchSongsFailure: (state, action: PayloadAction<string>) => {
      state.fetchError = action.payload;
      state.fetching = false;
    },

    fetchSong: (state) => {
      state.fetchError = null;
      state.fetching = true;
    },
    fetchSongSuccess: (state, action: PayloadAction<Song>) => {
      state.song = action.payload;
      state.fetching = false;
      state.fetchError = null;
    },
    fetchSongFailure: (state, action: PayloadAction<string>) => {
      state.fetchError = action.payload;
      state.fetching = false;

    },

    createSong: (state, _: PayloadAction<FormData>) => {
      state.error = null;
      state.mutuated= false;
      state.creating = true;
    },
    createSongSuccess: (state) => {
      state.error = null;
      state.mutuated = true;
      state.creating = false;
    },
    createSongFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.mutuated = false;
      state.creating = false;
    },

    deleteSong: (state, _: PayloadAction<string>) => {
      state.error = null;
      state.mutuated= false
      state.deleting = true;
    },
    deleteSongSuccess: (state) => {
      state.error = null;
      state.mutuated = true
      state.deleting = false;
    },
    deleteSongFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.mutuated = false
      state.deleting = false;
    },

    updateSong: (state, _: PayloadAction<{data: FormData, id:string}>) => {
      state.error = null;
      state.mutuated= false
      state.updating = true;
    },
    updateSongSuccess: (state) => {
      state.error = null;
      state.mutuated = true;
      state.updating = false;
    },
    updateSongFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.mutuated = false;
      state.updating = false;
    },

    favoriteSong: (state, _:PayloadAction<string>) => {
      state.error= null
      state.mutuated = false,
      state.creating = false;
    },

    favoriteSongSuccess: (state) => {
      state.error = null;
      state.mutuated = true;
      state.updating = false;
    }
    ,favoriteSongFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.mutuated = false;
      state.updating = false;
    },
    resetMutation: (state, action : PayloadAction<Partial<SongState>>) =>{
      state = {
        ...state,
        ...action.payload,
      };

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

  createSong,
  createSongSuccess,
  createSongFailure,

  deleteSong,
  deleteSongSuccess,
  deleteSongFailure,

  updateSong,
  updateSongSuccess,
  updateSongFailure,

  favoriteSong,
  favoriteSongSuccess,
  favoriteSongFailure,
  resetMutation
} = songSlice.actions;

export const songReducer = songSlice.reducer;
