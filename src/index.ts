import express from "express";
import { notesRouter } from "./routes/notes";
import logger from "./middlwares/logger";

const app = express();
const PORT = process.env.port;

app.use(express.json());
app.use(logger);
app.use("/api/notes", notesRouter);

app.listen(PORT, () => {
  console.log("Server is running on port:", PORT);
});
