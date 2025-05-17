import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {  type SongPayload,  } from "./song.types";
import { toast } from "react-toastify";
import type { Artist } from "../artists/artist.types";

interface Song {
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
  creating: false,
  deleting: false,
  updating: false,
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

    createSong: (state, _: PayloadAction<SongPayload>) => {
      state.error = null;
      state.mutuated= false;
      state.creating = true;
    },
    createSongSuccess: (state) => {
      state.error = null;
      state.mutuated = true;
      state.creating = false;
      toast.success("Song added successfully!")
    },
    createSongFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.mutuated = false;
      state.creating = false;
      toast.error("Failed to add song")
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
      toast.success("Song deleted successfully!")
    },
    deleteSongFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.mutuated = false
      state.deleting = false;
      toast.error("Failed to delete song")
    },

    updateSong: (state, _: PayloadAction<{data: SongPayload, id:string}>) => {
      state.error = null;
      state.mutuated= false
      state.updating = true;
    },
    updateSongSuccess: (state) => {
      state.error = null;
      state.mutuated = true;
      state.updating = false;
      toast.success("Song updated successfully!")
    },
    updateSongFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.mutuated = false;
      state.updating = false;
      toast.error("Failed to update song")
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
  resetMutation
} = songSlice.actions;

export const songReducer = songSlice.reducer;
