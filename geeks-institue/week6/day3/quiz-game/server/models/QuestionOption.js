import pool from "../config/db.js";

// Link a question to an option
export const linkQuestionOption = async (questionId, optionId) => {
  const result = await pool.query(
    "INSERT INTO questions_options (question_id, option_id) VALUES ($1, $2) RETURNING *",
    [questionId, optionId],
  );
  return result.rows[0];
};

// Get all options for a specific question
export const getOptionsForQuestion = async (questionId) => {
  const result = await pool.query(
    `
    SELECT o.id, o.option_text
    FROM options o
    JOIN questions_options qo ON o.id = qo.option_id
    WHERE qo.question_id = $1
    `,
    [questionId],
  );
  return result.rows;
};
