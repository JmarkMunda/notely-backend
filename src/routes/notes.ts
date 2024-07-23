import express from "express";
import { body, param } from "express-validator";
import {
  addNote,
  deleteNote,
  editNote,
  getAllNotes,
} from "../controller/notesController";

const router = express.Router();

router.get("/", getAllNotes);
router.post(
  "/add",
  body(["title", "description", "user_id"]).notEmpty().escape(),
  addNote
);
router.patch(
  "/:id",
  [
    param("id").notEmpty(),
    body(["title", "description", "user_id"]).notEmpty().escape(),
  ],
  editNote
);
router.delete("/:id", param("id").notEmpty(), deleteNote);

export { router as notesRouter };
