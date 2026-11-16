const pool = require('../config/database');

async function getAllDishes() {
  const [rows] = await pool.query(`
    SELECT dish_id, dish_type, dish_name, dish_price, dish_calories, dish_ingredients
    FROM dish
    ORDER BY dish_id
  `);

  return rows;
}

module.exports = { getAllDishes };
