import express from "express";
import { body, param, query } from "express-validator";
import {
  addNote,
  deleteNote,
  editNote,
  getAllNotes,
} from "../controller/notesController";

const router = express.Router();

router.get(
  "/",
  query(["order", "category", "search"]).isString().escape(),
  getAllNotes
);
router.post(
  "/add",
  body(["title", "description", "category"]).notEmpty().escape(),
  addNote
);
router.patch(
  "/:id",
  [
    param("id").notEmpty(),
    body(["title", "description", "category"]).notEmpty().escape(),
  ],
  editNote
);
router.delete("/:id", param("id").notEmpty(), deleteNote);

export { router as notesRouter };
