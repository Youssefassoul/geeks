const express = require("express");
const router = express.Router();

// Sample in-memory data
let todos = [];

// GET all todos
router.get("/", (req, res) => {
  res.json(todos);
});

// POST create new todo
router.post("/", (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  const newTodo = {
    id: todos.length + 1,
    title,
    completed: false,
  };

  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// PUT update a todo by ID
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const { title, completed } = req.body;

  const todo = todos.find((t) => t.id === id);
  if (!todo) {
    return res.status(404).json({ error: "Todo not found" });
  }

  if (title !== undefined) todo.title = title;
  if (completed !== undefined) todo.completed = completed;

  res.json(todo);
});

// DELETE a todo by ID
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = todos.findIndex((t) => t.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Todo not found" });
  }

  todos.splice(index, 1);
  res.json({ message: "Todo deleted" });
});

module.exports = router;
