import pool from "./db";

const createNotesTableQuery = async () => {
  const query = `CREATE TABLE IF NOT EXISTS notes (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          description TEXT NOT NULL,
          category TEXT NOT NULL,
          created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
      )`;
  try {
    const result = await pool.query(query);
    return result;
  } catch (error) {
    console.log("Error creating notes table: ", error);
  }
};
// userId INTEGER REFERENCES users(id) ON DELETE CASCADE,

const initializeDatabase = async () => {
  await createNotesTableQuery();
};

export default initializeDatabase;
