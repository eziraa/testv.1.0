import { Router } from 'express';
import albumController from '../controllers/album.controller';

const router = Router();

router.get('/', albumController.getAllAlbums);
router.post('/', albumController.createAlbum);
router.get('/:id', albumController.getAlbumById);
router.put('/:id', albumController.updateAlbum);
router.delete('/:id', albumController.deleteAlbum);

export default router;
