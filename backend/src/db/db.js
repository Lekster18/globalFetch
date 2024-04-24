const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "12345678",
  host: "localhost",
  port: 5001,
  database: "pernproj4",
});

module.exports = pool;
