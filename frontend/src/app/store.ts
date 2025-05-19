import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { songReducer } from "../features/songs/song.slice";
import { artistReducer } from "../features/artists/artist.slice";
import { albumReducer } from "../features/albums/album.slice";
import { playlistReducer } from "../features/playlists/playlist.slice";
import { authReducer } from "../features/auth/auth.slice";
import { statReducer } from "../features/stats/stat.slice";
import rootSaga from "./root.saga";
import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    artists: artistReducer,
    songs: songReducer,
    albums: albumReducer,
    playlists: playlistReducer,
    auth: authReducer,
    stats: statReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      erializableCheck: {
        ignoredActions: ["albums/createAlbum", "songs/createSong"],
        ignoredActionPaths: ["payload.coverImage"],
        ignoredPaths: ["album.coverImage"],
      },
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
