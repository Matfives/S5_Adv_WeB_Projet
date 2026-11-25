const pool = require('../config/database');

const COLUMNS = 'dish_id, dish_type, dish_name, dish_price, dish_calories, dish_ingredients';

async function getAllDishes() {
  const [rows] = await pool.query(`SELECT ${COLUMNS} FROM dish ORDER BY dish_id`);
  return rows;
}

async function getDishById(id) {
  const [rows] = await pool.query(`SELECT ${COLUMNS} FROM dish WHERE dish_id = ?`, [id]);
  return rows[0] || null;
}

async function createDish(d) {
  const [result] = await pool.query(
    `INSERT INTO dish (dish_type, dish_name, dish_price, dish_calories, dish_ingredients)
     VALUES (?, ?, ?, ?, ?)`,
    [d.dish_type, d.dish_name, d.dish_price, d.dish_calories, d.dish_ingredients]
  );
  return getDishById(result.insertId);
}

async function updateDish(id, d) {
  const [result] = await pool.query(
    `UPDATE dish
     SET dish_type = ?, dish_name = ?, dish_price = ?, dish_calories = ?, dish_ingredients = ?
     WHERE dish_id = ?`,
    [d.dish_type, d.dish_name, d.dish_price, d.dish_calories, d.dish_ingredients, id]
  );
  return result.affectedRows === 0 ? null : getDishById(id);
}

async function deleteDish(id) {
  const [result] = await pool.query('DELETE FROM dish WHERE dish_id = ?', [id]);
  return result.affectedRows > 0;
}

module.exports = { getAllDishes, getDishById, createDish, updateDish, deleteDish };