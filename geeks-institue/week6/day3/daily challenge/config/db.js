const knex = require("knex")({
  client: "pg",
  connection: {
    host: "localhost", // your PostgreSQL host
    user: "postgres", // your PostgreSQL username
    password: "70752001",
    database: "users",
  },
});

// Create tables if they don't exist
(async () => {
  const hasUsers = await knex.schema.hasTable("users");
  if (!hasUsers) {
    await knex.schema.createTable("users", (t) => {
      t.increments("id").primary();
      t.string("email").notNullable();
      t.string("username").unique().notNullable();
      t.string("first_name");
      t.string("last_name");
    });
  }

  const hasHashpwd = await knex.schema.hasTable("hashpwd");
  if (!hasHashpwd) {
    await knex.schema.createTable("hashpwd", (t) => {
      t.increments("id").primary();
      t.string("username").unique().notNullable();
      t.string("password").notNullable();
    });
  }
})();

module.exports = knex;
