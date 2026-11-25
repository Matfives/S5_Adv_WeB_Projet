const mysql = require('mysql2/promise');

// Connections are opened when a query runs, so health and static routes work
// even when MySQL is unavailable.
const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'Restaurant',
  waitForConnections: true,
  connectionLimit: 10
});

module.exports = pool;
