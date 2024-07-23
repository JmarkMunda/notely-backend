import express from "express";
import { notesRouter } from "./routes/notes";
import logger from "./middlwares/logger";
import cors from "cors";
import helmet from "helmet";
import initializeDatabase from "./config/dbInit";

const app = express();
const PORT = process.env.port || 3000;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);
app.use("/api/notes", notesRouter);

app.listen(PORT, async () => {
  await initializeDatabase();
  console.log("Server is running on port:", PORT);
});
