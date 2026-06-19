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

const PORT = 3000;

app.listen(PORT, (error) => {
    if (error) {
        throw error;
    }
    console.log(`app listening on port ${PORT}!`);
});
