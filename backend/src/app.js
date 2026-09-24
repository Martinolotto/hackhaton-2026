import cors from "cors";
import express from "express";
import { corsOptions } from "./config/cors.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { notFound } from "./middlewares/notFound.js";
import { apiRouter } from "./routes/index.routes.js";

export const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api", apiRouter);
app.use(notFound);
app.use(errorHandler);
