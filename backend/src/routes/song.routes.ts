import express from 'express';
import songController from '../controllers/song.controller';

const router = express.Router();

router.get('/', songController.getAllSongs);
router.post('/', songController.createSong);
router.get('/:id', songController.getSongById);
router.put('/:id', songController.updateSong);
router.delete('/:id', songController.deleteSong);

export default router;
