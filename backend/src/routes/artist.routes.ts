import { Router } from "express";

import artistController from "../controllers/artist.controller";
const router = Router();

// Artist related endpoints
router.get("/", artistController.getAllArtists);
router.post("/", artistController.createArtist);
router.get("/:id", artistController.getArtistById);
router.put("/:id", artistController.updateArtist);
router.delete("/:id", artistController.deleteArtist);



export default router;

