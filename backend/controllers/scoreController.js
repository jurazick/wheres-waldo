import { prisma } from "../lib/prisma.js";

const getAllScores = async (req, res) => {
    try {
        const scores = await prisma.score.findMany({
            orderBy: { time: "asc" },
        });
        res.status(200).json({ scores });
    } catch (error) {
        res.status(500).json({ error: "Error getting scores" });
    }
};

const getGameScores = async (req, res) => {
    const { gameId } = req.params;
    try {
        const scores = await prisma.score.findMany({
            where: { gameId: Number(gameId) },
            orderBy: { time: "asc" },
            take: 20,
        });
        res.status(200).json({ scores });
    } catch (error) {
        res.status(500).json({ error: "Error getting scores" });
    }
};

const saveScore = async (req, res) => {
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
};

export { getAllScores, getGameScores, saveScore };
