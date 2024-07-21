import express from "express";
import pool from "./config/db";
import { notesRouter } from "./routes/notes";
import logger from "./middlwares/logger";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(logger);
app.use("/notes", notesRouter);

app.get("/", async (req, res) => {
  const result = await pool.query("SELECT current_database();");
  console.log(result.rows);

  res.send("Successful get request");
});

app.listen(PORT, () => {
  console.log("Server is running on port: ", PORT);
});
