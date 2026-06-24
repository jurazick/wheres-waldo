import { prisma } from "../lib/prisma.js";

const getGames = async (req, res) => {
    const games = await prisma.game.findMany({ include: { characters: true } });
    res.json({ games });
};

const validate = async (req, res) => {
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
};

export { getGames, validate };
