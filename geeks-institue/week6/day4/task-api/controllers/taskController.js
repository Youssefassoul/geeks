const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "../data/tasks.json");

const readTasks = () => {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    throw new Error("Error reading tasks file");
  }
};

const writeTasks = (tasks) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
  } catch (err) {
    throw new Error("Error writing tasks file");
  }
};

const getTasks = (req, res) => {
  try {
    const tasks = readTasks();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getTaskById = (req, res) => {
  try {
    const tasks = readTasks();
    const task = tasks.find((t) => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createTask = (req, res) => {
  const { title, description, status } = req.body;
  if (!title || !description) {
    return res.status(400).json({ message: "Title and description required" });
  }

  try {
    const tasks = readTasks();
    const newTask = {
      id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
      title,
      description,
      status: status || "pending",
    };
    tasks.push(newTask);
    writeTasks(tasks);
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateTask = (req, res) => {
  const { title, description, status } = req.body;

  try {
    const tasks = readTasks();
    const index = tasks.findIndex((t) => t.id === parseInt(req.params.id));
    if (index === -1)
      return res.status(404).json({ message: "Task not found" });

    if (title) tasks[index].title = title;
    if (description) tasks[index].description = description;
    if (status) tasks[index].status = status;

    writeTasks(tasks);
    res.json(tasks[index]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteTask = (req, res) => {
  try {
    const tasks = readTasks();
    const filtered = tasks.filter((t) => t.id !== parseInt(req.params.id));

    if (filtered.length === tasks.length) {
      return res.status(404).json({ message: "Task not found" });
    }

    writeTasks(filtered);
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getTasks, getTaskById, createTask, updateTask, deleteTask };
