import { Request, Response } from "express";
import Song from "../models/Song";
import {
  SongSchemaZod,
  SongUpdateSchemaZod,
} from "../validators/song.validator";
import User from "../models/User";
import mongoose from "mongoose";

// SONG CONTROLLER CLASS: to handle song-related requests
class SongController {
  // METHOD: to get all songs
  async getAllSongs(req: Request, res: Response) {
    try {
      const { search } = req.query;
      const matchStage: any = {};
  
      if (search) {
        const regex = new RegExp(search as string, 'i');
        matchStage.$or = [
          { title: { $regex: regex } },
          { 'artistData.name': { $regex: regex } },
        ];
      }
  
      const songs = await Song.aggregate([
        {
          $lookup: {
            from: 'artists',
            localField: 'artist',
            foreignField: '_id',
            as: 'artistData',
          },
        },
        {
          $unwind: '$artistData',
        },
        {
          $lookup: {
            from: 'albums',
            localField: 'album',
            foreignField: '_id',
            as: 'albumData',
          },
        },
        {
          $unwind: {
            path: '$albumData',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $match: matchStage,
        },
        {
          $project: {
            title: 1,
            genre: 1,
            audioUrl: 1,
            releaseDate: 1,
            artist: '$artistData',
            album: '$albumData',
          },
        },
      ]);
  
      res.json(songs);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch songs' });
    }
  }
  

  // METHOD: to create a new song
  createSong = async (req: Request, res: Response): Promise<void> => {
    try {
      const parsed = SongSchemaZod.parse(req.body);
      const song = new Song(parsed);
      await song.save();

      res.status(201).json(song);
    } catch (err) {
      if (err instanceof Error && "errors" in err) {
        res.status(400).json({
          message: "Validation failed",
          errors: (err as any).errors,
        });
      }

      res.status(500).json({ message: "Internal Server error" });
    }
  };

  // METHOD: to get a song by ID
  async getSongById(req: Request, res: Response): Promise<void> {
    try {
      const song = await Song.findById(req.params.id);

      // CHECK: if song exists
      if (!song) {
        res.status(404).json({ message: "Song not found" });
      }
      res.json(song);
    } catch (err) {
      if (err instanceof Error && "errors" in err) {
        res.status(400).json({
          message: "Validation failed",
          errors: (err as any).errors,
        });
      }

      res.status(500).json({ message: "Internal Server error" });
    }
  }

  // METHOD: to update song
  async updateSong(req: Request, res: Response): Promise<void> {
    try {
      const parsed = SongUpdateSchemaZod.parse(req.body);
      const song = await Song.findByIdAndUpdate(req.params.id, parsed, {
        new: true,
      });

      // CHECK: if song exists
      if (!song) {
        res.status(404).json({ message: "Song not found" });
      }

      res.json(song);
    } catch (err) {
      if (err instanceof Error && "errors" in err) {
        res.status(400).json({
          message: "Validation failed",
          errors: (err as any).errors,
        });
      }

      res.status(500).json({ message: "Internal Server error" });
    }
  }

  // METHOD: to delete song
  async deleteSong(req: Request, res: Response) {
    await Song.findByIdAndDelete(req.params.id);
    res.status(204).send();
  }

  // METHOD: to add or remove song to favorite list

  async favoriteSong(req: Request, res: Response) {
    try {
      const userId = req.userId;
      if (!userId) {
        res.status(401).json({ message: "Unauthorized please login" });
        return;
      }
      const songId = req.params.songId;
      if (!songId) {
        res.status(400).json({ message: "Please provide song Id" });
        return;
      }
      const user = await User.findById(userId);
      if (!user) {
        res.status(404).json({ message: "Unauthorized please login" });
      }
      let updatedFavorites = [];
      if (!!user?.favorites.length) {
        if (
          user.favorites.includes(songId as unknown as mongoose.Types.ObjectId)
        )
          updatedFavorites = user.favorites.filter(
            (song) => !song.equals(new mongoose.Types.ObjectId(songId))
          );
        else {
          updatedFavorites = [...user.favorites, songId];
        }
      } else {
        updatedFavorites = [songId];
      }

      await User.findByIdAndUpdate(userId, {
        favorites: [...updatedFavorites]
      })

      
      res.status(200).json({message: "Song Favorited"})
    } catch (error) {
      if (error instanceof Error && "errors" in error) {
        res.status(400).json({
          message: "Validation failed",
          errors: (error as any).errors,
        });
      }

      res.status(500).json({ message: "Internal Server error" });

    }
  }
}

export default new SongController();
