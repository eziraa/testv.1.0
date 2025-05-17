interface ArtistPayload {
  name: string;
  bio?: string;
  profilePicture?: string;
}
interface Artist extends ArtistPayload {
  _id: string;
}

export type { Artist, ArtistPayload };
