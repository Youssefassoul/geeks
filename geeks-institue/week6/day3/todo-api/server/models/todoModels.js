const db = require("../config/db");

class TodoModel {
  static getAll() {
    return db("todos");
  }

  static getById(id) {
    return db("todos").where({ id }).first();
  }

  static create(data) {
    return db("todos").insert(data).returning("*");
  }

  static update(id, data) {
    return db("todos").where({ id }).update(data).returning("*");
  }

  static delete(id) {
    return db("todos").where({ id }).del();
  }
}

module.exports = TodoModel;
