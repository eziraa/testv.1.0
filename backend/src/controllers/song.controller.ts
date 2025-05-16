import { Request, Response } from 'express';
import Song from '../models/Song';
import { SongSchemaZod, SongUpdateSchemaZod } from '../validators/song.validator';

// SONG CONTROLLER CLASS: to handle song-related requests
class SongController {

  // METHOD: to get all songs
  async getAllSongs(_: Request, res: Response) {
    const songs = await Song.find();
    res.json(songs);
  }

  // METHOD: to create a new song
  createSong = async (req: Request, res: Response): Promise<void> => {
    try {

      const parsed = SongSchemaZod.parse(req.body); 
      const song = new Song(parsed);
      await song.save();

      res.status(201).json(song);
    } catch (err) {
      if (err instanceof Error && 'errors' in err) {
        res.status(400).json({
          message: 'Validation failed',
          errors: (err as any).errors,
        });
      }

      res.status(500).json({ message: 'Internal Server error' });
    }
  };

  // METHOD: to get a song by ID
  async getSongById(req: Request, res: Response): Promise<void> {
    try {
      const song = await Song.findById(req.params.id);

      // CHECK: if song exists
      if (!song) {
        res.status(404).json({ message: 'Song not found' });
      }
      res.json(song);
    } catch (err) {
      if (err instanceof Error && 'errors' in err) {
        res.status(400).json({
          message: 'Validation failed',
          errors: (err as any).errors,
        });
      }
      
      res.status(500).json({ message: 'Internal Server error' });
    }
  }

  // METHOD: to update song
  async updateSong(req: Request, res: Response): Promise<void> {
    try {
      const parsed = SongUpdateSchemaZod.parse(req.body);
      const song = await Song.findByIdAndUpdate(req.params.id, parsed, { new: true });

    // CHECK: if song exists
      if (!song) {
        res.status(404).json({ message: 'Song not found' });
      }

      res.json(song);
    } catch (err) {
      if (err instanceof Error && 'errors' in err) {
        res.status(400).json({
          message: 'Validation failed',
          errors: (err as any).errors,
        });
      }

      res.status(500).json({ message: 'Internal Server error' });
    }
  }

  // METHOD: to delete song
  async deleteSong(req: Request, res: Response) {
    await Song.findByIdAndDelete(req.params.id);
    res.status(204).send();
  }

}

export default new SongController();
