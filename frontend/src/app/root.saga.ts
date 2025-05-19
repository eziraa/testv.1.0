import { all } from "redux-saga/effects";
import { watchSongs } from "../features/songs/song.saga";
import { watchArtists } from "../features/artists/artist.saga";
import { watchAlbums } from "../features/albums/album.saga";
import { watchPlaylists } from "../features/playlists/playlist.saga";
import { watchAuth } from "../features/auth/auth.saga";
import { watchStats } from "../features/stats/stat.saga";

export default function* rootSaga() {
    yield all([
      watchArtists(),
      watchSongs(),
      watchAlbums(),
      watchPlaylists(),
      watchAuth(),
      watchStats()
    ])
  }