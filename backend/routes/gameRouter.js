import { Router } from "express";
import { getGames, validate } from "../controllers/gameController.js";

const router = new Router();

router.get("/", getGames);
router.post("/:gameId/validate", validate);

export default router;
