import { call, put, takeLatest } from "redux-saga/effects";
import { statsAPI } from "./stat.api";
import {
  fetchStatsSuccess,
  fetchStatsFailure,
} from "./stat.slice";

export enum SongActionTypes {
  FETCH_STATS = "stats/fetchStats",
  FETCH_STATS_SUCCESS = "stats/fetchStatsSuccess",
  FETCH_STATS_FAILURE = "stats/fetchStatsFailure",
}

function* fetchStatsWorker(): Generator<any, void, { data: any }> {
  try {
    const response = yield call(statsAPI.fetchStats);
    yield put(fetchStatsSuccess(response.data));
  } catch (error: any) {
    yield put(fetchStatsFailure(error.message));
  }
}



export function* watchStats() {
  yield takeLatest(SongActionTypes.FETCH_STATS, fetchStatsWorker);
}
