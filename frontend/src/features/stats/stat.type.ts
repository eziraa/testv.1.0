
export interface DashboardStats {
    totalSongs: number;
    totalArtists: number;
    totalAlbums: number;
    totalPlaylists: number;
    latestSongs: SongSummary[];
    latestAlbums: AlbumSummary[];
    latestPlaylists: PlaylistSummary[];
    songsByGenre: GenreCount[];
    albumsPerArtist: ArtistAlbumCount[];
    topArtists: ArtistSongCount[];
    topPlaylists: PlaylistSongCount[];
    monthlyUploads: MonthlyUploadCount[];
  }
  
  // ---------- Supporting Interfaces ----------
  
  export interface SongSummary {
    _id: string;
    title: string;
    genre?: string;
    releaseDate?: string;
    createdAt: string;
    artist?: {
      _id: string;
      name: string;
      profilePicture?:string;
    };
    album?: {
      _id: string;
      title: string;
    };
  }
  
  export interface AlbumSummary {
    _id: string;
    title: string;
    genre?: string;
    releaseDate?: string;
    createdAt: string;
    coverImage?: string;
    artist?: {
      _id: string;
      name: string;
      profilePicture?:string;
    };
  }
  
  export interface PlaylistSummary {
    _id: string;
    name: string;
    coverImage?: string;
    createdAt: string;
    user?: {
      _id: string;
      username: string;
    };
  }
  
  export interface GenreCount {
    _id: string | null; // genre name or null
    count: number;
  }
  
  export interface ArtistAlbumCount {
    artistName: string;
    count: number;
  }
  
  export interface ArtistSongCount {
    artistName: string;
    songCount: number;
  }
  
  export interface PlaylistSongCount {
    _id: string;
    name: string;
    songCount: number;
  }
  
  export interface MonthlyUploadCount {
    _id: {
      year: number;
      month: number;
    };
    count: number;
  }
  