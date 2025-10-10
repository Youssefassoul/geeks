const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.static("public"));
app.use(express.json());

let score = 0;

const emojis = [
  { emoji: "😀", name: "Smile" },
  { emoji: "🐶", name: "Dog" },
  { emoji: "🍕", name: "Pizza" },
  { emoji: "🚗", name: "Car" },
  { emoji: "⚽", name: "Football" },
  { emoji: "🐱", name: "Cat" },
  { emoji: "☕", name: "Coffee" },
];

// Get a random emoji with multiple-choice options
app.get("/emoji", (req, res) => {
  const randomIndex = Math.floor(Math.random() * emojis.length);
  const correct = emojis[randomIndex];

  const options = [correct.name];
  while (options.length < 4) {
    const random = emojis[Math.floor(Math.random() * emojis.length)].name;
    if (!options.includes(random)) options.push(random);
  }

  options.sort(() => Math.random() - 0.5);
  res.json({ emoji: correct.emoji, correct: correct.name, options });
});

// Check answer
app.post("/guess", (req, res) => {
  const { answer, correct } = req.body;
  const isCorrect = answer === correct;
  if (isCorrect) score++;
  res.json({ isCorrect, score });
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`),
);
