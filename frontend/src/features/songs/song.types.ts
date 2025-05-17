
interface SongPayload {
  title: string;
  artist?: string ;
  album?: string;
  genre?: string;
  audioUrl?: string;
  releaseDate?: string ;
}
interface Song extends SongPayload {
  _id: string;
}

export type { Song, SongPayload };
