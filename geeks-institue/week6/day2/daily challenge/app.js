const express = require("express");
const app = express();
const quizRouter = require("./routes/quiz");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/quiz", quizRouter);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000/quiz");
});
