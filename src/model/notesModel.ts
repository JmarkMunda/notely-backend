import pool from "../config/db";
import { NotesType } from "../types/notes";

const createNotesTableQuery = async () => {
  const query = `CREATE TABLE IF NOT EXISTS notes (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        userId INTEGER NOT NULL,
        createdAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
    )`;
  const result = await pool.query(query);
  return result;
};
// userId INTEGER REFERENCES users(id) ON DELETE CASCADE,

const getAllNotesQuery = async () => {
  const query = `SELECT * FROM notes;`;
  const result = await pool.query(query);
  return result;
};

const addNoteQuery = async (data: NotesType) => {
  const { title, description, userId } = data;
  const query = `INSERT INTO notes (title, description, userId)
    VALUES ($1, $2, $3)
    RETURNING *;`;
  const values = [title, description, userId];
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
    SET title = $1, description = $2, userId = $3
    WHERE id = $4
    RETURNING *;`;
  const values = [data.title, data.description, data.userId, id];
  const result = await pool.query(query, values);
  return result;
};

export {
  createNotesTableQuery,
  getAllNotesQuery,
  getNoteByIdQuery,
  addNoteQuery,
  updateNoteQuery,
  deleteNoteQuery,
};
