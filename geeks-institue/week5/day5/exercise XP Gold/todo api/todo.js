const express = require("express");
const data = require("./data");
const app = express();

app.use(express.json());

app.get("/api/todos", (req, res) => {
  res.json(data);
});
app.get("/api/todos/:id", (req, res) => {
  const todo = data.find((todo) => todo.id === parseInt(req.params.id));
  if (!todo) return res.status(404).send("Todo not found");
  res.json(todo);
});
app.post("/api/todos", (req, res) => {
  const todo = {
    id: data.length + 1,
    title: req.body.title,
    completed: false,
  };
  data.push(todo);
  res.status(201).json(todo);
});

app.put("/api/todos/:id", (req, res) => {
  const todo = data.find((todo) => todo.id === parseInt(req.params.id));
  if (!todo) return res.status(404).send("Todo not found");
  todo.completed = req.body.completed;
  res.json(todo);
});

app.delete("/api/todos/:id", (req, res) => {
  const todo = data.find((todo) => todo.id === parseInt(req.params.id));
  if (!todo) return res.status(404).send("Todo not found");

  const index = data.findIndex((t) => t.id === parseInt(req.params.id));
  data.splice(index, 1); // remove item directly

  res.json(todo);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
