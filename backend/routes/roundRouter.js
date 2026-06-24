import { Router } from "express";
import { finishRound, startRound } from "../controllers/roundController.js";

const router = new Router();

router.post("/start", startRound);
router.post("/finish", finishRound);

export default router;
