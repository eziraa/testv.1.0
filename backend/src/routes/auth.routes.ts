import { Router } from "express";

import authController from "../controllers/auth.controller";
import { AuthenticatedOnly } from "../middleware/auth.middleware";

const router = Router();

// Authentication routes
router.post("/login", authController.login);
router.post("/signup", authController.signUp);
router.patch("/update-profile",AuthenticatedOnly, authController.updateUserProfile);
router.get("/me",AuthenticatedOnly, authController.getMe);
router.post("/logout",AuthenticatedOnly, authController.login);
router.post("/refreshToken",AuthenticatedOnly, authController.refreshToken);


export default router;