import { Request, Response } from "express";
import {
  addNoteQuery,
  deleteNoteQuery,
  getAllNotesQuery,
  updateNoteQuery,
} from "../model/notesModel";
import { matchedData, validationResult } from "express-validator";
import { NotesType, QueryType } from "../types/notes";

const getAllNotes = async (req: Request, res: Response) => {
  try {
    const { order, category, search } = req.query as QueryType;
    // Perform get all notes query
    const queryResult = await getAllNotesQuery(order, category, search);
    // Success
    res.status(200).json({
      statusCode: 1,
      message: "Success",
      data: queryResult.rows,
    });
  } catch (error: any) {
    // Error
    return res.status(500).json({
      statusCode: 0,
      message: "Something went wrong",
      error: {
        details: error.message,
      },
    });
  }
};

const addNote = async (req: Request, res: Response) => {
  try {
    // Validate and extract
    const validation = validationResult(req);
    const data = matchedData<NotesType>(req);
    // Valid fields
    if (validation.isEmpty()) {
      // Perform add note query
      const queryResult = await addNoteQuery(data);
      // Succesfful creation
      return res.status(201).json({
        statusCode: 1,
        message: "Added new note",
        data: queryResult.rows,
      });
    }
    // Invalid fields or missing fields
    return res.status(400).json({
      statusCode: 0,
      message: "Please provide the required fields",
      errors: validation.array(),
    });
  } catch (error: any) {
    // Error
    return res.status(500).json({
      statusCode: 0,
      message: "Something went wrong",
      error: {
        details: error.message,
      },
    });
  }
};

const deleteNote = async (req: Request, res: Response) => {
  try {
    // Extract data from validation
    const data = matchedData(req);
    // Perform deletion query
    const queryResult = await deleteNoteQuery(data.id);
    // Check if id doesn't exist in the database
    if (queryResult.rowCount === 0)
      return res.status(404).json({
        statusCode: 0,
        message: "Failed to delete",
        error: {
          details: `Note with id ${data.id} doesn't exist`,
        },
      });
    // Successful deletion
    return res.status(200).json({
      statusCode: 1,
      message: "Note has been deleted",
      data: {
        id: data.id,
      },
    });
  } catch (error: any) {
    // Error
    return res.status(500).json({
      statusCode: 0,
      message: "Something went wrong",
      error: {
        details: error.message,
      },
    });
  }
};

const editNote = async (req: Request, res: Response) => {
  try {
    // Validate fields
    const validation = validationResult(req);
    if (!validation.isEmpty()) {
      return res.status(400).json({
        statusCode: 0,
        message: "Please provide the required fields",
        error: validation.array(),
      });
    }
    // Check if exist and update
    const data = matchedData<NotesType & { id: string }>(req);
    // Perform update query
    const queryResult = await updateNoteQuery(data.id, data);
    // Check if id doesn't exist in the database
    if (queryResult.rowCount === 0)
      return res.status(404).json({
        statusCode: 0,
        message: "Update failed",
        error: {
          details: `Id ${data.id} doesn't exist in the database`,
        },
      });
    // Successful update
    return res.status(200).json({
      statusCode: 1,
      message: "Note has been updated successfully",
      data: queryResult.rows,
    });
  } catch (error: any) {
    // Error
    return res.status(500).json({
      statusCode: 0,
      message: "Something went wrong",
      error: {
        details: error.message,
      },
    });
  }
};

export { getAllNotes, addNote, deleteNote, editNote };
