import express from "express";
import cors from "cors";
import { prisma } from "./lib/prisma.js";
import gameRouter from "./routes/gameRouter.js";
import roundRouter from "./routes/roundRouter.js";
import scoreRouter from "./routes/scoreRouter.js";

const app = express();

app.use(cors({ origin: process.env.FRONTEND_SITE }));
app.use(express.json());

app.use("/games", gameRouter);
app.use("/round", roundRouter);
app.use("/scores", scoreRouter);

const PORT = 3000;

app.listen(PORT, (error) => {
    if (error) {
        throw error;
    }
    console.log(`app listening on port ${PORT}!`);
});
