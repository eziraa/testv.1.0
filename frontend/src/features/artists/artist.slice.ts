import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type Artist, type ArtistPayload,  } from "./artist.types";
import { toast } from "react-toastify";


interface ArtistState {
  artists: Artist[];
  artist: Artist | null;
  fetching: boolean;
  mutuated: boolean;
  error: string | null;
  creating: boolean;
  deleting: boolean;
  updating: boolean;
}

const initialState: ArtistState = {
  artists: [],
  artist: null,
  fetching: false,
  mutuated: false,
  error: null,
  creating: false,
  deleting: false,
  updating: false,
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

    createArtist: (state, _: PayloadAction<FormData>) => {
      state.error = null;
      state.mutuated= false;
      state.creating = true;
    },
    createArtistSuccess: (state) => {
      state.error = null;
      state.mutuated = true;
      state.creating = false;
      toast.success("Artist added successfully!")
    },
    createArtistFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.mutuated = false;
      state.creating = false;
      toast.error("Failed to add artist")
    },

    deleteArtist: (state, _: PayloadAction<string>) => {
      state.error = null;
      state.mutuated= false
      state.deleting = true;
    },
    deleteArtistSuccess: (state) => {
      state.error = null;
      state.mutuated = true
      state.deleting = false;
      toast.success("Artist deleted successfully!")
    },
    deleteArtistFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.mutuated = false
      state.deleting = false;
      toast.error("Failed to delete artist")
    },

    updateArtist: (state, _: PayloadAction<{data: FormData, id:string}>) => {
      state.error = null;
      state.mutuated= false
      state.updating = true;
    },
    updateArtistSuccess: (state) => {
      state.error = null;
      state.mutuated = true;
      state.updating = false;
      toast.success("Artist updated successfully!")
    },
    updateArtistFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.mutuated = false;
      state.updating = false;
      toast.error("Failed to update artist")
    },

    resetMutation: (state, action : PayloadAction<Partial<ArtistState>>) =>{
      state = {
        ...state,
        ...action.payload,
      };

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
