const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// Quiz questions
const questions = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["Paris", "Madrid", "Rome", "Berlin"],
    answer: "Paris",
  },
  {
    id: 2,
    question: "Which language runs in a web browser?",
    options: ["Python", "C", "JavaScript", "Java"],
    answer: "JavaScript",
  },
  {
    id: 3,
    question: "What does HTML stand for?",
    options: [
      "Hyper Trainer Marking Language",
      "Hyper Text Marketing Language",
      "Hyper Text Markup Language",
      "Hyper Text Markup Leveler",
    ],
    answer: "Hyper Text Markup Language",
  },
];

app.get("/api/questions", (req, res) => {
  res.json(questions);
});

app.post("/api/answer", (req, res) => {
  const { id, selected } = req.body;
  const question = questions.find((q) => q.id === id);
  if (!question) return res.status(404).send("Question not found");

  const correct = question.answer === selected;
  res.json({ correct });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
