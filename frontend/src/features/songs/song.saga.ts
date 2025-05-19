import { call, put, takeLatest } from "redux-saga/effects";
import { songAPI } from "./song.api";
import {
  fetchSongsSuccess,
  fetchSongsFailure,
  createSongFailure,
  updateSongFailure,
  deleteSongFailure,
  favoriteSongFailure,
  fetchSongFailure,
} from "./song.slice";
import { type SongPayload } from "./song.types";
import { AuthActionTypes } from "../auth/auth.saga";
import { toast } from "react-toastify";

export enum SongActionTypes {
  FETCH_SONGS = "songs/fetchSongs",
  FETCH_SONGS_SUCCESS = "songs/fetchSongsSuccess",
  FETCH_SONGS_FAILURE = "songs/fetchSongsFailure",

  CREATE_SONG = "songs/createSong",
  CREATE_SONGS_SUCCESS = "songs/createSongSuccess",
  CREATE_SONGS_FAILURE = "songs/createSongFailure",

  UPDATE_SONG = "songs/updateSong",
  UPDATE_SONGS_SUCCESS = "songs/updateSongSuccess",
  UPDATE_SONGS_FAILURE = "songs/updateSongFailure",

  DELETE_SONG = "songs/deleteSong",
  DELETE_SONGS_SUCCESS = "songs/deleteSongSuccess",
  DELETE_SONGS_FAILURE = "songs/deleteSongFailure",

  FETCH_SONG = "songs/fetchSong",
  FETCH_SONG_SUCCESS = "songs/fetchSongSuccess",
  FETCH_SONG_FAILURE = "songs/fetchSongFailure",

  FAVORITE_SONG = "songs/favoriteSong",
  FAVORITE_SONG_SUCCESS = "songs/favoriteSongSuccess",
  FAVORITE_SONG_FAILURE = "songs/favoriteSongFailure",
}

function* fetchSongsWorker(): Generator<any, void, { data: any }> {
  try {
    const response = yield call(songAPI.fetchSongs);
    yield put(fetchSongsSuccess(response.data));
  } catch (error: any) {
    yield put(fetchSongsFailure(error.message));
  }
}

function* createSongWorker(action: { type: string; payload: SongPayload }) {
  const toastId = toast.info("Addin new song ...");
  try {
    yield call(songAPI.createSong, action.payload);
    toast.update(toastId, {
      render: "Song added successfully",
      type: "success",
      isLoading: false,
      autoClose: 3000,
    });
    yield put({ type: SongActionTypes.CREATE_SONGS_SUCCESS });
    yield put({ type: SongActionTypes.FETCH_SONGS });
  } catch (error) {
    console.log("Song Error", error);
    if ((error as { response: { status: number } })?.response?.status !== 400)
      toast.update(toastId, {
        render: "Internal server error",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    else {
      toast.dismiss(toastId);
    }
    yield put(createSongFailure("An unknown error occurred"));
  }
}

function* updateSongWorker(action: {
  type: string;
  payload: { id: string; data: Partial<SongPayload> };
}) {
  const toastId = toast.loading("Song updating ...");
  try {
    yield call(songAPI.updateSong, action.payload.id, action.payload.data);
    toast.update(toastId, {
      render: "Song updated successfully",
      type: "success",
      isLoading: false,
      autoClose: 3000,
    });
    yield put({ type: SongActionTypes.UPDATE_SONGS_SUCCESS });
    yield put({ type: SongActionTypes.FETCH_SONGS });
  } catch (error) {
    console.log("Song Error", error);
    if ((error as { response: { status: number } })?.response?.status !== 400)
      toast.update(toastId, {
        render: "Internal server error",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    else {
      toast.dismiss(toastId);
    }
    yield put(updateSongFailure("An unknown error occurred"));
  }
}

function* deleteSongWorker(action: { type: string; payload: string }) {
  const toastId = toast.loading("Deleting song ...");
  try {
    yield call(songAPI.deleteSong, action.payload);
    toast.update(toastId, {
      render: "Song deleted successfully",
      type: "success",
      isLoading: false,
      autoClose: 3000,
    });
    yield put({ type: SongActionTypes.DELETE_SONGS_SUCCESS });
    yield put({ type: SongActionTypes.FETCH_SONGS });
  } catch (error) {
    console.log("Song Error", error);
    if ((error as { response: { status: number } })?.response?.status !== 400)
      toast.update(toastId, {
        render: "Internal server error",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    else {
      toast.dismiss(toastId);
    }
    yield put(deleteSongFailure("An unknown error occurred"));
  }
}

function* fetchSongWorker(action: {
  type: string;
  payload: string;
}): Generator<any, void, { data: any }> {
  try {
    const response = yield call(songAPI.getSongById, action.payload);
    yield put({
      type: SongActionTypes.FETCH_SONG_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put(
      fetchSongFailure((error as Error).message || "Internal Server Error")
    );
  }
}

function* favoriteSongWorker(action: {
  type: string;
  payload: string;
}): Generator<any, void, { data: any }> {
  try {
    const response = yield call(songAPI.favoriteSong, action.payload);
    yield put({ type: AuthActionTypes.GET_ME });
    yield put({
      type: SongActionTypes.FAVORITE_SONG_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put(
      favoriteSongFailure((error as Error).message || "Internal Server Error")
    );
  }
}

export function* watchSongs() {
  yield takeLatest(SongActionTypes.FETCH_SONGS, fetchSongsWorker);
  yield takeLatest(SongActionTypes.CREATE_SONG, createSongWorker);
  yield takeLatest(SongActionTypes.UPDATE_SONG, updateSongWorker);
  yield takeLatest(SongActionTypes.DELETE_SONG, deleteSongWorker);
  yield takeLatest(SongActionTypes.FETCH_SONG, fetchSongWorker);
  yield takeLatest(SongActionTypes.FAVORITE_SONG, favoriteSongWorker);
}
