const pool = require('../config/database');

const SELECT = `
  SELECT u.user_id, u.user_name, u.user_type, u.user_phone,
         u.user_birthdate, u.user_city, u.rest_id, r.rest_name
  FROM Users u
  JOIN Restaurants r ON r.rest_id = u.rest_id
`;

async function getAllUsers() {
  const [rows] = await pool.query(`${SELECT} ORDER BY u.user_id`);
  return rows;
}

async function getUserById(id) {
  const [rows] = await pool.query(`${SELECT} WHERE u.user_id = ?`, [id]);
  return rows[0] || null;
}

async function createUser(u) {
  const [result] = await pool.query(
    `INSERT INTO Users (user_name, user_type, user_phone, user_birthdate, user_city, rest_id)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [u.user_name, u.user_type, u.user_phone, u.user_birthdate, u.user_city, u.rest_id]
  );
  return getUserById(result.insertId);
}

async function updateUser(id, u) {
  const [result] = await pool.query(
    `UPDATE Users
     SET user_name = ?, user_type = ?, user_phone = ?, user_birthdate = ?, user_city = ?, rest_id = ?
     WHERE user_id = ?`,
    [u.user_name, u.user_type, u.user_phone, u.user_birthdate, u.user_city, u.rest_id, id]
  );
  return result.affectedRows === 0 ? null : getUserById(id);
}

async function deleteUser(id) {
  const [result] = await pool.query('DELETE FROM Users WHERE user_id = ?', [id]);
  return result.affectedRows > 0;
}

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };