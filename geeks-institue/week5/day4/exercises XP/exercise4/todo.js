export class TodoList {
    constructor() {
      this.tasks = [];
    }
  
    addTask(task) {
      this.tasks.push({ task, done: false });
    }
  
    markComplete(index) {
      if (this.tasks[index]) {
        this.tasks[index].done = true;
      }
    }
  
    listTasks() {
      this.tasks.forEach((t, i) => {
        console.log(`${i + 1}. ${t.task} - ${t.done ? "✅ Done" : "❌ Not Done"}`);
      });
    }
  }