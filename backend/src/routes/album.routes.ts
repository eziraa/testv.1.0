import { Router } from "express";
import albumController from "../controllers/album.controller";
import fileUpLoader from "../utils/FileUploader";

const router = Router();
const uploader = fileUpLoader.getUploader();

router.get("/", albumController.getAllAlbums);
router.post(
  "/",
  uploader.single('coverImage'),
  albumController.createAlbum
);
router.get("/:id", albumController.getAlbumById);
router.put("/:id",
  uploader.single('coverImage'),
   albumController.updateAlbum,
  );
router.delete("/:id", albumController.deleteAlbum);

export default router;
