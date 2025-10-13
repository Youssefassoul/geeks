const express = require("express");
const app = express();
const path = require("path");
const greetingRouter = require("./routes/greeting");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", greetingRouter);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
