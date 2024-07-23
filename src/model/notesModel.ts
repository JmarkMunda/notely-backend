import pool from "../config/db";
import { NotesType } from "../types/notes";

const getAllNotesQuery = async () => {
  const query = `SELECT * FROM notes ORDER BY created_at DESC;`;
  const result = await pool.query(query);
  return result;
};

const addNoteQuery = async (data: NotesType) => {
  const { title, description, user_id } = data;
  const query = `INSERT INTO notes (title, description, user_id)
    VALUES ($1, $2, $3)
    RETURNING *;`;
  const values = [title, description, user_id];
  const result = await pool.query<NotesType>(query, values);
  return result;
};

const deleteNoteQuery = async (id: string) => {
  const query = `DELETE FROM notes where id = $1 RETURNING id`;
  const values = [id];
  const result = await pool.query(query, values);
  return result;
};

const getNoteByIdQuery = async (id: string) => {
  const query = `SELECT * FROM notes where id = $1`;
  const values = [id];
  const result = await pool.query(query, values);
  return result;
};

const updateNoteQuery = async (id: string, data: NotesType) => {
  const query = `UPDATE notes
    SET title = $1, description = $2, user_id = $3
    WHERE id = $4
    RETURNING *;`;
  const values = [data.title, data.description, data.user_id, id];
  const result = await pool.query(query, values);
  return result;
};

export {
  getAllNotesQuery,
  getNoteByIdQuery,
  addNoteQuery,
  updateNoteQuery,
  deleteNoteQuery,
};
