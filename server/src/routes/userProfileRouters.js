import { Router } from "express";
import { upsertProfile, getProfile } from "../controllers/profileController.js";
import { verifyJWT } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/:id", verifyJWT, getProfile);
router.post("/:id", verifyJWT, upsertProfile); // create/update

export default router
