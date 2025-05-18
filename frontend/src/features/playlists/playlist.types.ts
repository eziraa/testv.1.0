import { type ITimeStamp } from './../albums/general.type';
interface PlaylistPayload {
  name: string;
  user: string;
  songs?: string[];
}
interface Playlist extends PlaylistPayload, ITimeStamp {
  _id: string;
}

export type { Playlist, PlaylistPayload };
