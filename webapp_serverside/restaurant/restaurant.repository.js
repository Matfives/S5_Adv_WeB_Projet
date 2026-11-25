const pool = require('../config/database');

const COLUMNS = 'rest_id, rest_name, rest_adress, rest_size, rest_phone, rest_hours';

async function getAllRestaurants() {
  const [rows] = await pool.query(`SELECT ${COLUMNS} FROM Restaurants ORDER BY rest_id`);
  return rows;
}

async function getRestaurantById(id) {
  const [rows] = await pool.query(`SELECT ${COLUMNS} FROM Restaurants WHERE rest_id = ?`, [id]);
  return rows[0] || null;
}

async function createRestaurant(r) {
  const [result] = await pool.query(
    `INSERT INTO Restaurants (rest_name, rest_adress, rest_size, rest_phone, rest_hours)
     VALUES (?, ?, ?, ?, ?)`,
    [r.rest_name, r.rest_adress, r.rest_size, r.rest_phone, r.rest_hours]
  );
  return getRestaurantById(result.insertId);
}

async function updateRestaurant(id, r) {
  const [result] = await pool.query(
    `UPDATE Restaurants
     SET rest_name = ?, rest_adress = ?, rest_size = ?, rest_phone = ?, rest_hours = ?
     WHERE rest_id = ?`,
    [r.rest_name, r.rest_adress, r.rest_size, r.rest_phone, r.rest_hours, id]
  );
  return result.affectedRows === 0 ? null : getRestaurantById(id);
}

async function deleteRestaurant(id) {
  const [result] = await pool.query('DELETE FROM Restaurants WHERE rest_id = ?', [id]);
  return result.affectedRows > 0;
}

module.exports = {
  getAllRestaurants, getRestaurantById, createRestaurant, updateRestaurant, deleteRestaurant
};