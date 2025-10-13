const express = require("express");
const router = express.Router();

const triviaQuestions = [
  { question: "What is the capital of France?", answer: "Paris" },
  { question: "Which planet is known as the Red Planet?", answer: "Mars" },
  {
    question: "What is the largest mammal in the world?",
    answer: "Blue whale",
  },
];

let currentQuestionIndex = 0;
let score = 0;

// Start quiz
router.get("/", (req, res) => {
  if (currentQuestionIndex >= triviaQuestions.length) {
    return res.redirect("/quiz/score");
  }

  const question = triviaQuestions[currentQuestionIndex].question;
  const form = `
  <div style="font-family:sans-serif; margin:50px;">
    <h2>Trivia Quiz</h2>
    <p>Question ${currentQuestionIndex + 1} of ${triviaQuestions.length}</p>
    <form method="POST" action="/quiz">
      <label>${question}</label><br><br>
      <input type="text" name="answer" placeholder="Type your answer" required style="padding:5px;"><br><br>
      <button type="submit" style="padding:8px 12px;">Submit</button>
    </form>
  </div>
  `;
  res.send(form);
});

// Handle answer submission
router.post("/", (req, res) => {
  const userAnswer = req.body.answer.trim().toLowerCase();
  const correctAnswer =
    triviaQuestions[currentQuestionIndex].answer.toLowerCase();

  let feedback = "";
  if (userAnswer === correctAnswer) {
    score++;
    feedback = "<p style='color:green;'>Correct!</p>";
  } else {
    feedback = `<p style='color:red;'>Wrong! The correct answer was <b>${triviaQuestions[currentQuestionIndex].answer}</b>.</p>`;
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < triviaQuestions.length) {
    const nextButton = `<a href="/quiz" style="padding:8px 12px; display:inline-block;">Next Question</a>`;
    res.send(
      `<div style="font-family:sans-serif; margin:50px;">${feedback}${nextButton}</div>`,
    );
  } else {
    res.redirect("/quiz/score");
  }
});

// Show final score
router.get("/score", (req, res) => {
  const total = triviaQuestions.length;
  const result = `
  <div style="font-family:sans-serif; margin:50px;">
    <h2>Quiz Completed!</h2>
    <p>Your Score: ${score} / ${total}</p>
    <a href="/quiz/restart" style="padding:8px 12px;">Restart Quiz</a>
  </div>
  `;
  res.send(result);
});

// Restart quiz
router.get("/restart", (req, res) => {
  currentQuestionIndex = 0;
  score = 0;
  res.redirect("/quiz");
});

module.exports = router;
