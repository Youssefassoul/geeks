// app.js

import { TodoList } from "./todo.js";

// Create instance
const myTodos = new TodoList();

// Add tasks
myTodos.addTask("Learn ES6 modules");
myTodos.addTask("Build Todo App");
myTodos.addTask("Drink coffee");

// Mark some as complete
myTodos.markComplete(0);
myTodos.markComplete(2);

// List all tasks
console.log("My Todo List:");
myTodos.listTasks();
