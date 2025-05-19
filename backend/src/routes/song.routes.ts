import express from 'express';
import songController from '../controllers/song.controller';
import { AuthenticatedOnly } from '../middleware/auth.middleware';

const router = express.Router();

router.get('/', songController.getAllSongs);
router.post('/', songController.createSong);
router.get('/:id', songController.getSongById);
router.put('/:id', songController.updateSong);
router.delete('/:id', songController.deleteSong);
router.patch('/:songId/favorite',AuthenticatedOnly, songController.favoriteSong)

export default router;
