const pool = require('../config/database');

const SELECT = `
  SELECT o.user_id, o.dish_id, o.order_id, o.order_finalSum,
         DATE_FORMAT(o.order_date, '%Y-%m-%d') AS order_date,
         o.order_hour, o.order_table, o.order_AdressBill,
         u.user_name AS customerName,
         d.dish_name AS dishName
  FROM order_ o
  JOIN Users u ON u.user_id = o.user_id
  JOIN dish d ON d.dish_id = o.dish_id
`;

async function getAllOrders() {
  const [rows] = await pool.query(`${SELECT} ORDER BY o.order_date, o.order_hour, o.user_id`);
  return rows;
}

async function getOrderByKeys(userId, dishId) {
  const [rows] = await pool.query(
    `${SELECT} WHERE o.user_id = ? AND o.dish_id = ?`,
    [userId, dishId]
  );
  return rows[0] || null;
}

async function createOrder(o) {
  await pool.query(
    `INSERT INTO order_ (user_id, dish_id, order_id, order_finalSum, order_date,
                         order_hour, order_table, order_AdressBill)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [o.user_id, o.dish_id, o.order_id, o.order_finalSum, o.order_date,
     o.order_hour, o.order_table, o.order_AdressBill]
  );
  return getOrderByKeys(o.user_id, o.dish_id);
}

async function updateOrder(userId, dishId, o) {
  const [result] = await pool.query(
    `UPDATE order_
     SET order_id = ?, order_finalSum = ?, order_date = ?, order_hour = ?,
         order_table = ?, order_AdressBill = ?
     WHERE user_id = ? AND dish_id = ?`,
    [o.order_id, o.order_finalSum, o.order_date, o.order_hour,
     o.order_table, o.order_AdressBill, userId, dishId]
  );
  return result.affectedRows === 0 ? null : getOrderByKeys(userId, dishId);
}

async function deleteOrder(userId, dishId) {
  const [result] = await pool.query(
    'DELETE FROM order_ WHERE user_id = ? AND dish_id = ?',
    [userId, dishId]
  );
  return result.affectedRows > 0;
}

module.exports = { getAllOrders, getOrderByKeys, createOrder, updateOrder, deleteOrder };