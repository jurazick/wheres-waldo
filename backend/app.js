import express from "express";
import cors from "cors";
import { prisma } from "./lib/prisma.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ testing: "testing" });
});

app.get("/games", async (req, res) => {
    const games = await prisma.game.findMany({ include: { characters: true } });
    res.json({ games });
});
app.post("/games/:gameId/validate", async (req, res) => {
    const { gameId } = req.params;
    const { characterId, x, y } = req.body;

    try {
        const character = await prisma.character.findUnique({
            where: { id: Number(characterId) },
        });
        if (
            Math.abs(Number(x) - character.x) <= 2 &&
            Math.abs(Number(y) - character.y) <= 3
        ) {
            res.json({ found: true });
        } else {
            res.json({ found: false });
        }
    } catch (error) {
        res.status(500).json({ error: "Error validting position" });
    }
});

app.post("/round/start", async (req, res) => {
    const { gameId } = req.body;
    if (!gameId) return res.status(400).json({ error: "Game id is required" });
    try {
        const round = await prisma.round.create({
            data: {
                gameId: Number(gameId),
            },
        });

        res.status(201).json({ roundId: round.id });
    } catch {
        res.status(500).json({ error: "Error starting round" });
    }
});
app.post("/round/finish", async (req, res) => {
    const { roundId } = req.body;

    if (!roundId)
        return res.status(400).json({ error: "Round id is required" });

    try {
        const round = await prisma.round.update({
            where: { id: Number(roundId) },
            data: {
                finishedAt: new Date(),
            },
        });
        const time = round.finishedAt - round.startedAt;
        res.status(200).json({ time });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error ending session" });
    }
});

app.get("/scores", async (req, res) => {
    try {
        const scores = await prisma.score.findMany({
            orderBy: { time: "asc" },
        });
        res.status(200).json({ scores });
    } catch (error) {
        res.status(500).json({ error: "Error getting scores" });
    }
});
app.post("/scores", async (req, res) => {
    const { username, roundId } = req.body;
    if (!username)
        return res.status(400).json({ error: "Username is required!" });

    if (!roundId)
        return res
            .status(400)
            .json({ error: "Round is expired or does not exist!" });

    try {
        const round = await prisma.round.findUnique({
            where: { id: Number(roundId) },
        });
        const time = round.finishedAt - round.startedAt;
        const score = await prisma.score.create({
            data: { username, time, gameId: round.gameId },
        });
        res.status(201).json({ score });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error saving score" });
    }
});

const PORT = 3000;

app.listen(PORT, (error) => {
    if (error) {
        throw error;
    }
    console.log(`app listening on port ${PORT}!`);
});
