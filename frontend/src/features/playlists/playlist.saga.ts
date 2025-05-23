import { call, put, takeLatest } from 'redux-saga/effects';
import { playlistAPI } from './playlist.api';
import {
  fetchPlaylistsSuccess,
  fetchPlaylistsFailure,
  createPlaylistFailure,
  deletePlaylistFailure,
} from './playlist.slice';
import {  type PlaylistPayload } from './playlist.types';
import { toast } from 'react-toastify';


export enum PlaylistActionTypes {
  FETCH_PLAYLISTS = "playlists/fetchPlaylists",
  FETCH_PLAYLISTS_SUCCESS = "playlists/fetchPlaylistsSuccess",
  FETCH_PLAYLISTS_FAILURE = "playlists/fetchPlaylistsFailure",

  CREATE_PLAYLIST = "playlists/createPlaylist",
  CREATE_PLAYLISTS_SUCCESS = "playlists/createPlaylistSuccess",
  CREATE_PLAYLISTS_FAILURE = "playlists/createPlaylistFailure",
  
  UPDATE_PLAYLIST = "playlists/updatePlaylist",
  UPDATE_PLAYLISTS_SUCCESS = "playlists/updatePlaylistSuccess",
  UPDATE_PLAYLISTS_FAILURE = "playlists/updatePlaylistFailure",

  DELETE_PLAYLIST = "playlists/deletePlaylist",
  DELETE_PLAYLISTS_SUCCESS = "playlists/deletePlaylistSuccess",
  DELETE_PLAYLISTS_FAILURE = "playlists/deletePlaylistFailure",

  FETCH_PLAYLIST = "playlists/fetchPlaylist",
  FETCH_PLAYLIST_SUCCESS = "playlists/fetchPlaylistSuccess",
  FETCH_PLAYLIST_FAILURE = "playlists/fetchPlaylistFailure",
} 

function* fetchPlaylistsWorker(): Generator<any, void, { data: any }> {
  try {
    const response = yield call(playlistAPI.fetchPlaylists);
    yield put(fetchPlaylistsSuccess(response.data));
  } catch (error: any) {
    yield put(fetchPlaylistsFailure(error.message));
  }
}

function* createPlaylistWorker(action: { type: string; payload: PlaylistPayload }) {
  const toastId = toast.loading("Creating new playlist ...")
  try {
    yield call(playlistAPI.createPlaylist, action.payload);
    toast.update(toastId, {
      render: "Playlist created successfully",
      type: 'success',
      isLoading: false,
      autoClose:3000,
    });
    yield put({ type: PlaylistActionTypes.CREATE_PLAYLISTS_SUCCESS });
    yield put({type: PlaylistActionTypes.FETCH_PLAYLISTS })
  } catch (error) {
    console.log("Create playlist Error", error);
    if ((error as { response: { status: number } })?.response?.status !== 400)
      toast.update(toastId, {
        render: "Internal server error",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
      else{
        toast.dismiss(toastId)
      }
    yield put(createPlaylistFailure("An unknown error occurred"));

  }
}

function* updatePlaylistWorker(action: { type: string; payload: { id: string; data: Partial<PlaylistPayload> } }) {
  const toastId =  toast.loading("Updating palylist ...")
  try {
    yield call(playlistAPI.updatePlaylist, action.payload.id, action.payload.data);
    toast.update(toastId, {
      render: "Playlist updated successfully",
      type: "success",
      isLoading: false,
      autoClose: 3000,
    });
    yield put({ type: PlaylistActionTypes.UPDATE_PLAYLISTS_SUCCESS });
    yield put({ type: PlaylistActionTypes.FETCH_PLAYLISTS });
  } catch (error) {
    console.log("Update playlist Error", error);
    if ((error as { response: { status: number } })?.response?.status !== 400)
      toast.update(toastId, {
        render: "Internal server error",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
      else{
        toast.dismiss(toastId)
      }
    yield put(createPlaylistFailure("An unknown error occurred"));
  }
}

function* deletePlaylistWorker(action: { type: string; payload: string }) {
  const toastId = toast.loading("Deleting playlist ...")
  try {
    yield call(playlistAPI.deletePlaylist, action.payload);
    toast.update(toastId, {
      render: "Playlist deleted successfully",
      type: "success",
      isLoading: false,
      autoClose: 3000,
    });
    yield put({ type: PlaylistActionTypes.DELETE_PLAYLISTS_SUCCESS });
    yield put({ type: PlaylistActionTypes.FETCH_PLAYLISTS });
  } catch (error) {
    console.log("Delete playlist Error", error);
    if ((error as { response: { status: number } })?.response?.status !== 400)
      toast.update(toastId, {
        render: "Internal server error",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
      else{
        toast.dismiss(toastId)
      }
    yield put(deletePlaylistFailure("An unknown error occurred"));

   }
}

function* fetchPlaylistWorker(action: { type: string; payload: string }): Generator<any, void, { data: any }> {
  try {
    const response = yield call(playlistAPI.getPlaylistById, action.payload);
    yield put({ type: PlaylistActionTypes.FETCH_PLAYLIST_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: PlaylistActionTypes.FETCH_PLAYLIST_FAILURE, payload: (error as Error).message });
  }
}

export function* watchPlaylists() {
  yield takeLatest(PlaylistActionTypes.FETCH_PLAYLISTS, fetchPlaylistsWorker);
  yield takeLatest(PlaylistActionTypes.CREATE_PLAYLIST, createPlaylistWorker);
  yield takeLatest(PlaylistActionTypes.UPDATE_PLAYLIST, updatePlaylistWorker);
  yield takeLatest(PlaylistActionTypes.DELETE_PLAYLIST, deletePlaylistWorker);
  yield takeLatest(PlaylistActionTypes.FETCH_PLAYLIST, fetchPlaylistWorker);
}


