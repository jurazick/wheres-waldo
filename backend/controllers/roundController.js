import { prisma } from "../lib/prisma.js";

const startRound = async (req, res) => {
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
};

const finishRound = async (req, res) => {
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
};

export { startRound, finishRound };
