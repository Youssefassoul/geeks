import pool from "../config/db.js";

// Get all questions with their correct answer ID
export const getAllQuestions = async () => {
  const result = await pool.query("SELECT * FROM questions");
  return result.rows;
};

// Get single question by ID
export const getQuestionById = async (id) => {
  const result = await pool.query("SELECT * FROM questions WHERE id = $1", [
    id,
  ]);
  return result.rows[0];
};

// Create a new question
export const createQuestion = async (question, correctAnswer) => {
  const result = await pool.query(
    "INSERT INTO questions (question, correct_answer) VALUES ($1, $2) RETURNING *",
    [question, correctAnswer],
  );
  return result.rows[0];
};
