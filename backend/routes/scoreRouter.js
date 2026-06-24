import { Router } from "express";
import {
    getAllScores,
    getGameScores,
    saveScore,
} from "../controllers/scoreController.js";

const router = new Router();

router.get("/", getAllScores);
router.get("/game/:gameId", getGameScores);
router.post("/", saveScore);

export default router;
