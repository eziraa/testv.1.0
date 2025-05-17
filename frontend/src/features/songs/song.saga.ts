import { call, put, takeLatest } from 'redux-saga/effects';
import { songAPI } from './song.api';
import {
  fetchSongsSuccess,
  fetchSongsFailure,
  createSongFailure,
} from './song.slice';
import {  type SongPayload } from './song.types';


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
  try {
    yield call(songAPI.createSong, action.payload);
    yield put({ type: SongActionTypes.CREATE_SONGS_SUCCESS });
    yield put({type: SongActionTypes.FETCH_SONGS })
  } catch (error) {
    if (error instanceof Error && error.message) {
      yield put(createSongFailure(error.message));
    } else {
      yield put(createSongFailure('An unknown error occurred'));
    }
  }
}

function* updateSongWorker(action: { type: string; payload: { id: string; data: Partial<SongPayload> } }) {
  try {
    yield call(songAPI.updateSong, action.payload.id, action.payload.data);
    yield put({ type: SongActionTypes.UPDATE_SONGS_SUCCESS });
    yield put({ type: SongActionTypes.FETCH_SONGS });
  } catch (error) {
    if (error instanceof Error && error.message) {
      yield put(createSongFailure(error.message));
    } else {
      yield put(createSongFailure('An unknown error occurred'));
    }  }
}

function* deleteSongWorker(action: { type: string; payload: string }) {
  try {
    yield call(songAPI.deleteSong, action.payload);
    yield put({ type: SongActionTypes.DELETE_SONGS_SUCCESS });
    yield put({ type: SongActionTypes.FETCH_SONGS });
  } catch (error) {
    if (error instanceof Error && error.message) {
      yield put(createSongFailure(error.message));
    } else {
      yield put(createSongFailure('An unknown error occurred'));
    } 
   }
}

function* fetchSongWorker(action: { type: string; payload: string }): Generator<any, void, { data: any }> {
  try {
    const response = yield call(songAPI.getSongById, action.payload);
    yield put({ type: SongActionTypes.FETCH_SONG_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: SongActionTypes.FETCH_SONG_FAILURE, payload: (error as Error).message });
  }
}

export function* watchSongs() {
  yield takeLatest(SongActionTypes.FETCH_SONGS, fetchSongsWorker);
  yield takeLatest(SongActionTypes.CREATE_SONG, createSongWorker);
  yield takeLatest(SongActionTypes.UPDATE_SONG, updateSongWorker);
  yield takeLatest(SongActionTypes.DELETE_SONG, deleteSongWorker);
  yield takeLatest(SongActionTypes.FETCH_SONG, fetchSongWorker);
}


