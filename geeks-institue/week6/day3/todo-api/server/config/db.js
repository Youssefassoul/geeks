const knex = require("knex");

const db = knex({
  client: "pg",
  connection: {
    host: "localhost",
    user: "postgres",
    password: "70752001",
    database: "todo_db",
  },
});

module.exports = db;
