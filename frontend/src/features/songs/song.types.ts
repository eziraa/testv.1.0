interface SongPayload {
  title: string;
  artist: string;
  album?: string;
  genre?: string;
  audioUrl?: string;
  releaseDate?: Date;
}
interface Song extends SongPayload {
  _id: string;
}
interface Stats {
  totalSongs: number;
  artists: any[];
  genres: any[];
  albums: any[];
}

export type { Song, Stats, SongPayload };
