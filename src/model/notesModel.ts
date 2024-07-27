import pool from "../config/db";
import { NotesType } from "../types/notes";

const getAllNotesQuery = async (
  order: string = "",
  category: string = "",
  search: string = ""
) => {
  const orderBy = order?.toUpperCase() || "DESC";
  let query = `SELECT * FROM notes WHERE 1=1`;
  const values: string[] = [];
  let paramIndex = 1;

  if (search) {
    query += ` AND title ILIKE $${paramIndex++}`;
    values.push(`%${search}%`);
  }

  if (category) {
    query += ` AND category = $${paramIndex++}`;
    values.push(category);
  }

  query += ` ORDER BY created_at ${orderBy};`;

  console.log("Search Query: ", search);
  console.log("Category Query: ", category);
  console.log(query);

  const result = await pool.query(query, values);
  return result;
};

const addNoteQuery = async (data: NotesType) => {
  const { title, description, category } = data;
  const query = `INSERT INTO notes (title, description, category)
    VALUES ($1, $2, $3)
    RETURNING *;`;
  const values = [title, description, category];
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
    SET title = $1, description = $2, category = $3
    WHERE id = $4
    RETURNING *;`;
  const values = [data.title, data.description, data.category, id];
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
