import { call, put, takeLatest } from 'redux-saga/effects';
import { artistAPI } from './artist.api';
import {
  fetchArtistsSuccess,
  fetchArtistsFailure,
  createArtistFailure,
} from './artist.slice';
import {  type ArtistPayload } from './artist.types';


export enum ArtistActionTypes {
  FETCH_ARTISTS = "artists/fetchArtists",
  FETCH_ARTISTS_SUCCESS = "artists/fetchArtistsSuccess",
  FETCH_ARTISTS_FAILURE = "artists/fetchArtistsFailure",

  CREATE_ARTIST = "artists/createArtist",
  CREATE_ARTISTS_SUCCESS = "artists/createArtistSuccess",
  CREATE_ARTISTS_FAILURE = "artists/createArtistFailure",
  
  UPDATE_ARTIST = "artists/updateArtist",
  UPDATE_ARTISTS_SUCCESS = "artists/updateArtistSuccess",
  UPDATE_ARTISTS_FAILURE = "artists/updateArtistFailure",

  DELETE_ARTIST = "artists/deleteArtist",
  DELETE_ARTISTS_SUCCESS = "artists/deleteArtistSuccess",
  DELETE_ARTISTS_FAILURE = "artists/deleteArtistFailure",

  FETCH_ARTIST = "artists/fetchArtist",
  FETCH_ARTIST_SUCCESS = "artists/fetchArtistSuccess",
  FETCH_ARTIST_FAILURE = "artists/fetchArtistFailure",
} 

function* fetchArtistsWorker(): Generator<any, void, { data: any }> {
  try {
    const response = yield call(artistAPI.fetchArtists);
    yield put(fetchArtistsSuccess(response.data));
  } catch (error: any) {
    yield put(fetchArtistsFailure(error.message));
  }
}

function* createArtistWorker(action: { type: string; payload: ArtistPayload }) {
  try {
    yield call(artistAPI.createArtist, action.payload);
    yield put({ type: ArtistActionTypes.CREATE_ARTISTS_SUCCESS });
    yield put({type: ArtistActionTypes.FETCH_ARTISTS })
  } catch (error) {
    if (error instanceof Error && error.message) {
      yield put(createArtistFailure(error.message));
    } else {
      yield put(createArtistFailure('An unknown error occurred'));
    }
  }
}

function* updateArtistWorker(action: { type: string; payload: { id: string; data: Partial<ArtistPayload> } }) {
  try {
    yield call(artistAPI.updateArtist, action.payload.id, action.payload.data);
    yield put({ type: ArtistActionTypes.UPDATE_ARTISTS_SUCCESS });
    yield put({ type: ArtistActionTypes.FETCH_ARTISTS });
  } catch (error) {
    if (error instanceof Error && error.message) {
      yield put(createArtistFailure(error.message));
    } else {
      yield put(createArtistFailure('An unknown error occurred'));
    }  }
}

function* deleteArtistWorker(action: { type: string; payload: string }) {
  try {
    yield call(artistAPI.deleteArtist, action.payload);
    yield put({ type: ArtistActionTypes.DELETE_ARTISTS_SUCCESS });
    yield put({ type: ArtistActionTypes.FETCH_ARTISTS });
  } catch (error) {
    if (error instanceof Error && error.message) {
      yield put(createArtistFailure(error.message));
    } else {
      yield put(createArtistFailure('An unknown error occurred'));
    } 
   }
}

function* fetchArtistWorker(action: { type: string; payload: string }): Generator<any, void, { data: any }> {
  try {
    const response = yield call(artistAPI.getArtistById, action.payload);
    yield put({ type: ArtistActionTypes.FETCH_ARTIST_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: ArtistActionTypes.FETCH_ARTIST_FAILURE, payload: (error as Error).message });
  }
}

export function* watchArtists() {
  yield takeLatest(ArtistActionTypes.FETCH_ARTISTS, fetchArtistsWorker);
  yield takeLatest(ArtistActionTypes.CREATE_ARTIST, createArtistWorker);
  yield takeLatest(ArtistActionTypes.UPDATE_ARTIST, updateArtistWorker);
  yield takeLatest(ArtistActionTypes.DELETE_ARTIST, deleteArtistWorker);
  yield takeLatest(ArtistActionTypes.FETCH_ARTIST, fetchArtistWorker);
}


