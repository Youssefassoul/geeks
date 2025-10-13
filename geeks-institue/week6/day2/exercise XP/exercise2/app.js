const express = require("express");
const app = express();
const todosRouter = require("./routes/todos");

app.use(express.json()); // Parse JSON body
app.use("/todos", todosRouter); // Mount router

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
