const mysql = require("mysql2");
require("dotenv").config();
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME || "task_manager",
}).promise()
//console.log("works");
module.exports = pool;