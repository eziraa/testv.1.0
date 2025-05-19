import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import type { Artist } from "../artists/artist.types";
import type { Song } from "../songs/song.types";

interface Album {
  _id: string;
  title: string;
  artist?: Artist;
  releaseDate?: string;
  coverImage?: string;
  songs?: Song[];
  genre?: string;
  createdAt: string;
  updatedAt: string;
}

interface AlbumState {
  albums: Album[];
  album: Album | null;
  fetching: boolean;
  mutuated: boolean;
  fetchError: string | null;
  error: string | null;
  creating: boolean;
  deleting: boolean;
  updating: boolean;
}

const initialState: AlbumState = {
  albums: [],
  album: null,
  fetching: false,
  fetchError: null,
  mutuated: false,
  error: null,
  creating: false,
  deleting: false,
  updating: false,
};

const albumSlice = createSlice({
  name: "albums",
  initialState,
  reducers: {
    fetchAlbums: (state) => {
      state.fetching = true;
      state.fetchError = null;
    },
    fetchAlbumsSuccess: (state, action: PayloadAction<Album[]>) => {
      state.albums = action.payload;
      state.fetching = false;
      state.fetchError = null;
    },
    fetchAlbumsFailure: (state, action: PayloadAction<string>) => {
      state.fetchError = action.payload;
      state.fetching = false;
    },

    fetchAlbum: (state) => {
      state.fetchError = null;
      state.fetching = true;
    },
    fetchAlbumSuccess: (state, action: PayloadAction<Album>) => {
      state.album = action.payload;
      state.fetching = false;
      state.fetchError = null;
    },
    fetchAlbumFailure: (state, action: PayloadAction<string>) => {
      state.fetchError = action.payload;
      state.fetching = false;
    },

    createAlbum: (state, _: PayloadAction<FormData>) => {
      state.error = null;
      state.mutuated = false;
      state.creating = true;
    },
    createAlbumSuccess: (state) => {
      state.error = null;
      state.mutuated = true;
      state.creating = false;
      toast.success("Album added successfully!");
    },
    createAlbumFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.mutuated = false;
      state.creating = false;
      toast.error("Failed to add album");
    },

    deleteAlbum: (state, _: PayloadAction<string>) => {
      state.error = null;
      state.mutuated = false;
      state.deleting = true;
    },
    deleteAlbumSuccess: (state) => {
      state.error = null;
      state.mutuated = true;
      state.deleting = false;
      toast.success("Album deleted successfully!");
    },
    deleteAlbumFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.mutuated = false;
      state.deleting = false;
      toast.error("Failed to delete album");
    },

    updateAlbum: (
      state,
      _: PayloadAction<{ data: FormData; id: string }>
    ) => {
      state.error = null;
      state.mutuated = false;
      state.updating = true;
    },
    updateAlbumSuccess: (state) => {
      state.error = null;
      state.mutuated = true;
      state.updating = false;
      toast.success("Album updated successfully!");
    },
    updateAlbumFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.mutuated = false;
      state.updating = false;
      toast.error("Failed to update album");
    },

    resetMutation: (state, action: PayloadAction<Partial<AlbumState>>) => {
      state = {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const {
  fetchAlbums,
  fetchAlbumsSuccess,
  fetchAlbumsFailure,

  fetchAlbum,
  fetchAlbumSuccess,
  fetchAlbumFailure,

  createAlbum,
  createAlbumSuccess,
  createAlbumFailure,

  deleteAlbum,
  deleteAlbumSuccess,
  deleteAlbumFailure,

  updateAlbum,
  updateAlbumSuccess,
  updateAlbumFailure,
  resetMutation,
} = albumSlice.actions;

export const albumReducer = albumSlice.reducer;
