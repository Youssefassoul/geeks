import { getAllQuestions } from "../models/Question.js";
import { getOptionsForQuestion } from "../models/QuestionOption.js";

export const getQuestions = async (req, res) => {
  try {
    const questions = await getAllQuestions();

    const quizData = [];
    for (const q of questions) {
      const options = await getOptionsForQuestion(q.id);
      quizData.push({
        id: q.id,
        question: q.question,
        correctAnswer: q.correct_answer,
        options: options.map((o) => ({ id: o.id, text: o.option_text })),
      });
    }

    res.json(quizData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching questions" });
  }
};
