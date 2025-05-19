import { Request, Response } from 'express';
import Song from '../models/Song';
import Artist from '../models/Artist';
import Album from '../models/Album';
import Playlist from '../models/Playlist';

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const [totalSongs, totalArtists, totalAlbums, totalPlaylists] = await Promise.all([
      Song.countDocuments(),
      Artist.countDocuments(),
      Album.countDocuments(),
      Playlist.countDocuments()
    ]);

    const latestSongs = await Song.find().sort({ createdAt: -1 }).limit(5).populate('artist album');
    const latestAlbums = await Album.find().sort({ createdAt: -1 }).limit(5).populate('artist');
    const latestPlaylists = await Playlist.find().sort({ createdAt: -1 }).limit(5).populate('user');

    const songsByGenre = await Song.aggregate([
      { $group: { _id: "$genre", count: { $sum: 1 } } }
    ]);

    const albumsPerArtist = await Album.aggregate([
      { $group: { _id: "$artist", count: { $sum: 1 } } },
      {
        $lookup: {
          from: "artists",
          localField: "_id",
          foreignField: "_id",
          as: "artist"
        }
      },
      { $unwind: "$artist" },
      { $project: { _id: 0, artistName: "$artist.name", count: 1 } }
    ]);

    const topArtists = await Song.aggregate([
      { $group: { _id: "$artist", songCount: { $sum: 1 } } },
      {
        $lookup: {
          from: "artists",
          localField: "_id",
          foreignField: "_id",
          as: "artist"
        }
      },
      { $unwind: "$artist" },
      { $sort: { songCount: -1 } },
      { $limit: 5 },
      { $project: { artistName: "$artist.name", songCount: 1 } }
    ]);

    const topPlaylists = await Playlist.aggregate([
      { $project: { name: 1, songCount: { $size: "$songs" } } },
      { $sort: { songCount: -1 } },
      { $limit: 5 }
    ]);

    const monthlyUploads = await Song.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { "_id.year": -1, "_id.month": -1 }
      },
      { $limit: 12 }
    ]);

    res.status(200).json({
      totalSongs,
      totalArtists,
      totalAlbums,
      totalPlaylists,
      latestSongs,
      latestAlbums,
      latestPlaylists,
      songsByGenre,
      albumsPerArtist,
      topArtists,
      topPlaylists,
      monthlyUploads
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).json({ message: "Failed to fetch dashboard stats", error });
  }
};
