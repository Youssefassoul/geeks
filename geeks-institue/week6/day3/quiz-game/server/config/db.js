import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "quiz",
  password: "70752001",
  port: 5432,
});

export default pool;
