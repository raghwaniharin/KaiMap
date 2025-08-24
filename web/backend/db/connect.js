import mysql from "mysql2/promise";
// backend/db.js
const { Pool } = require('pg');

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "ABCabc_123",
  database: "kai_map",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
