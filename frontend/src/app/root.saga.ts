import { all } from "redux-saga/effects";
import { watchSongs } from "../features/songs/song.saga";

export default function* rootSaga() {
    yield all([watchSongs()]);
  }