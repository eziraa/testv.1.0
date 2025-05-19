import { call, put, takeLatest } from "redux-saga/effects";
import { albumAPI } from "./album.api";
import {
  fetchAlbumsSuccess,
  fetchAlbumsFailure,
  createAlbumFailure,
  updateAlbumFailure,
  deleteAlbumFailure,
} from "./album.slice";
import { type AlbumPayload } from "./album.types";
import { toast } from "react-toastify";

export enum AlbumActionTypes {
  FETCH_ALBUMS = "albums/fetchAlbums",
  FETCH_ALBUMS_SUCCESS = "albums/fetchAlbumsSuccess",
  FETCH_ALBUMS_FAILURE = "albums/fetchAlbumsFailure",

  CREATE_ALBUM = "albums/createAlbum",
  CREATE_ALBUMS_SUCCESS = "albums/createAlbumSuccess",
  CREATE_ALBUMS_FAILURE = "albums/createAlbumFailure",

  UPDATE_ALBUM = "albums/updateAlbum",
  UPDATE_ALBUMS_SUCCESS = "albums/updateAlbumSuccess",
  UPDATE_ALBUMS_FAILURE = "albums/updateAlbumFailure",

  DELETE_ALBUM = "albums/deleteAlbum",
  DELETE_ALBUMS_SUCCESS = "albums/deleteAlbumSuccess",
  DELETE_ALBUMS_FAILURE = "albums/deleteAlbumFailure",

  FETCH_ALBUM = "albums/fetchAlbum",
  FETCH_ALBUM_SUCCESS = "albums/fetchAlbumSuccess",
  FETCH_ALBUM_FAILURE = "albums/fetchAlbumFailure",
}

function* fetchAlbumsWorker(): Generator<any, void, { data: any }> {
  try {
    const response = yield call(albumAPI.fetchAlbums);
    yield put(fetchAlbumsSuccess(response.data));
  } catch (error: any) {
    yield put(fetchAlbumsFailure(error.message));
  }
}

function* createAlbumWorker(action: { type: string; payload: AlbumPayload }) {
  const toastId = toast.loading("Adding new album ...");
  try {
    yield call(albumAPI.createAlbum, action.payload);
    toast.update(toastId, {
      render: "New album added successfully",
      type: "success",
      isLoading: false,
      autoClose: 3000,
    });
    yield put({ type: AlbumActionTypes.CREATE_ALBUMS_SUCCESS });
    yield put({ type: AlbumActionTypes.FETCH_ALBUMS });
  } catch (error) {
    console.log("Album creating Error", error);
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
    yield put(createAlbumFailure("An unknown error occurred"));
  }
}

function* updateAlbumWorker(action: {
  type: string;
  payload: { id: string; data: Partial<AlbumPayload> };
}) {
  const toastId = toast.loading("Album updating ...");
  try {
    yield call(albumAPI.updateAlbum, action.payload.id, action.payload.data);
    toast.update(toastId, {
      render: "Album updated successfully",
      type: "success",
      isLoading: false,
      autoClose: 3000,
    });
    yield put({ type: AlbumActionTypes.UPDATE_ALBUMS_SUCCESS });
    yield put({ type: AlbumActionTypes.FETCH_ALBUMS });
  } catch (error) {
    console.log("album updating Error", error);
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
    yield put(updateAlbumFailure("An unknown error occurred"));
  }
}

function* deleteAlbumWorker(action: { type: string; payload: string }) {
  const toastId = toast.loading("Deleting album");
  try {
    yield call(albumAPI.deleteAlbum, action.payload);
    toast.update(toastId, {
      render: "Album deleted successfully",
      type: "success",
      isLoading: false,
      autoClose: 3000,
    });
    yield put({ type: AlbumActionTypes.DELETE_ALBUMS_SUCCESS });
    yield put({ type: AlbumActionTypes.FETCH_ALBUMS });
  } catch (error) {
    console.log("album deleting Error", error);
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
    yield put(deleteAlbumFailure("An unknown error occurred"));
  }
}

function* fetchAlbumWorker(action: {
  type: string;
  payload: string;
}): Generator<any, void, { data: any }> {
  try {
    const response = yield call(albumAPI.getAlbumById, action.payload);
    yield put({
      type: AlbumActionTypes.FETCH_ALBUM_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: AlbumActionTypes.FETCH_ALBUM_FAILURE,
      payload: (error as Error).message,
    });
  }
}

export function* watchAlbums() {
  yield takeLatest(AlbumActionTypes.FETCH_ALBUMS, fetchAlbumsWorker);
  yield takeLatest(AlbumActionTypes.CREATE_ALBUM, createAlbumWorker);
  yield takeLatest(AlbumActionTypes.UPDATE_ALBUM, updateAlbumWorker);
  yield takeLatest(AlbumActionTypes.DELETE_ALBUM, deleteAlbumWorker);
  yield takeLatest(AlbumActionTypes.FETCH_ALBUM, fetchAlbumWorker);
}
