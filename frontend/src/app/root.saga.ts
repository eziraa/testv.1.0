import { all } from "redux-saga/effects";
import { watchSongs } from "../features/songs/song.saga";
import { watchArtists } from "../features/artists/artist.saga";
import { watchAlbums } from "../features/albums/album.saga";

export default function* rootSaga() {
    yield all([
      watchArtists(),
      watchSongs(),
      watchAlbums(),
    ])
  }