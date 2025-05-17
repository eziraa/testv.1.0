import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type Artist, type ArtistPayload,  } from "./artist.types";


interface ArtistState {
  artists: Artist[];
  artist: Artist | null;
  fetching: boolean;
  mutuated: boolean;
  error: string | null;
}

const initialState: ArtistState = {
  artists: [],
  artist: null,
  fetching: false,
  mutuated: false,
  error: null,
};

const artistSlice = createSlice({
  name: "artists",
  initialState,
  reducers: {
    fetchArtists: (state) => {
      state.fetching = true;
      state.error = null;
    },
    fetchArtistsSuccess: (state, action: PayloadAction<Artist[]>) => {
      state.artists = action.payload;
      state.fetching = false;
      state.error = null;
    },
    fetchArtistsFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.fetching = false;
    },
    fetchArtist: (state) => {
      state.error = null;
      state.fetching = true;
    },
    fetchArtistSuccess: (state, action: PayloadAction<Artist>) => {
      state.artist = action.payload;
      state.fetching = false;
      state.error = null;
    },
    fetchArtistFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.fetching = false;

    },
    createArtist: (state, _: PayloadAction<ArtistPayload>) => {
      state.error = null;
      state.mutuated= false
    },
    createArtistSuccess: (state) => {
      state.error = null;
      state.mutuated = true
    },
    createArtistFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.mutuated = false
    },

    deleteArtist: (state, _: PayloadAction<string>) => {
      state.error = null;
      state.mutuated= false
    },

    deleteArtistSuccess: (state) => {
      state.error = null;
      state.mutuated = true
    },

    deleteArtistFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.mutuated = false
    },

    updateArtist: (state, _: PayloadAction<{data: ArtistPayload, id:string}>) => {
      state.error = null;
      state.mutuated= false
    },
    updateArtistSuccess: (state) => {
      state.error = null;
      state.mutuated = true
    },
    updateArtistFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.mutuated = false
    },

    resetMutation: (state) =>{
      state.mutuated = false;
    },
  },
});

export const {
  fetchArtists,
  fetchArtistsSuccess,
  fetchArtistsFailure,

  fetchArtist,
  fetchArtistSuccess,
  fetchArtistFailure,

  createArtist,
  createArtistSuccess,
  createArtistFailure,

  deleteArtist,
  deleteArtistSuccess,
  deleteArtistFailure,

  updateArtist,
  updateArtistSuccess,
  updateArtistFailure,
  resetMutation
} = artistSlice.actions;

export const artistReducer = artistSlice.reducer;
