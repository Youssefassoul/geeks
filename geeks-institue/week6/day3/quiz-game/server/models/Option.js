import pool from "../config/db.js";

// Get all options
export const getAllOptions = async () => {
  const result = await pool.query("SELECT * FROM options");
  return result.rows;
};

// Create a new option
export const createOption = async (text) => {
  const result = await pool.query(
    "INSERT INTO options (option_text) VALUES ($1) RETURNING *",
    [text],
  );
  return result.rows[0];
};

// Get option by ID
export const getOptionById = async (id) => {
  const result = await pool.query("SELECT * FROM options WHERE id = $1", [id]);
  return result.rows[0];
};
