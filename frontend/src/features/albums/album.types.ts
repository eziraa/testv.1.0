import { type ITimeStamp } from './general.type';
interface AlbumPayload {
  title: string;
  artist: string;
  releaseDate?: string;
  coverImage?: string;
  songs?: string[];
  genre?: string;
}
interface Album extends AlbumPayload, ITimeStamp {
  _id: string;
}

export type { Album, AlbumPayload };
