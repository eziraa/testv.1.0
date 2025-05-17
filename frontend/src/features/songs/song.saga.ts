import { call, put, takeLatest } from 'redux-saga/effects';
import { songAPI } from './song.api';
import {
  fetchSongsSuccess,
  fetchSongsFailure,
} from './song.slice';
import {  type SongPayload } from './song.types';


const SongActionTypes = {
  FETCH_SONGS: "songs/fetchSongs",
  FETCH_SONGS_SUCCESS: "songs/fetchSongsSuccess",
  FETCH_SONGS_FAILURE: "songs/fetchSongsFailure",


  FETCH_STATS: 'stats/fetchStats',
  FETCH_STATS_SUCCESS: 'stats/fetchStatsSuccess',
  FETCH_STATS_FAILURE: 'stats/fetchStatsFailure',

  CREATE_SONG: "songs/createSong",
  UPDATE_SONG: "songs/updateSong",
  DELETE_SONG: "songs/deleteSong",

  FETCH_SONG: "songs/fetchSong",
  FETCH_SONG_SUCCESS: "songs/fetchSongSuccess",
  FETCH_SONG_FAILURE: "songs/fetchSongFailure",
} as const;

export  type SongActionTypes = (typeof SongActionTypes)[keyof typeof SongActionTypes];


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
    yield put({ type: SongActionTypes.FETCH_SONGS });
  } catch (error) {
    console.error('Create song error', error);
  }
}

function* updateSongWorker(action: { type: string; payload: { id: string; data: Partial<SongPayload> } }) {
  try {
    yield call(songAPI.updateSong, action.payload.id, action.payload.data);
    yield put({ type: SongActionTypes.FETCH_SONGS });
  } catch (error) {
    console.error('Update song error', error);
  }
}

function* deleteSongWorker(action: { type: string; payload: string }) {
  try {
    yield call(songAPI.deleteSong, action.payload);
    yield put({ type: SongActionTypes.FETCH_SONGS });
  } catch (error) {
    console.error('Delete song error', error);
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


