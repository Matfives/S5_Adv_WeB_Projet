const repo = require('./order.repository');

function format(order) {
  return {
    ...order,
    order_finalSum: order.order_finalSum === null ? null : Number(order.order_finalSum)
  };
}

function parseKeys(req, res) {
  const userId = Number(req.params.userId);
  const dishId = Number(req.params.dishId);
  if (!Number.isInteger(userId) || !Number.isInteger(dishId)) {
    res.status(400).json({ error: 'Invalid order identifiers.' });
    return null;
  }
  return { userId, dishId };
}

// Validates the fields that can be edited (everything except the key).
function validateFields(b, res) {
  const sum = Number(b.order_finalSum);
  const table = b.order_table === '' || b.order_table == null ? null : Number(b.order_table);
  if (!b.order_id || !String(b.order_id).trim()) {
    res.status(400).json({ error: 'order_id is required.' });
    return null;
  }
  if (b.order_finalSum === '' || b.order_finalSum == null || !Number.isFinite(sum) || sum < 0) {
    res.status(400).json({ error: 'order_finalSum must be a positive number.' });
    return null;
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(b.order_date || '')) {
    res.status(400).json({ error: 'order_date must use the YYYY-MM-DD format.' });
    return null;
  }
  if (!/^\d{2}:\d{2}(:\d{2})?$/.test(b.order_hour || '')) {
    res.status(400).json({ error: 'order_hour must use the HH:MM format.' });
    return null;
  }
  if (table !== null && !Number.isInteger(table)) {
    res.status(400).json({ error: 'order_table must be a number.' });
    return null;
  }
  return {
    order_id: String(b.order_id).trim(),
    order_finalSum: sum,
    order_date: b.order_date,
    order_hour: b.order_hour,
    order_table: table,
    order_AdressBill: b.order_AdressBill ?? null
  };
}

async function getOrders(req, res, next) {
  try {
    res.json((await repo.getAllOrders()).map(format));
  } catch (error) {
    next(error);
  }
}

async function getOrder(req, res, next) {
  try {
    const keys = parseKeys(req, res);
    if (!keys) return;
    const order = await repo.getOrderByKeys(keys.userId, keys.dishId);
    if (!order) return res.status(404).json({ error: 'Order not found.' });
    res.json(format(order));
  } catch (error) {
    next(error);
  }
}

async function createOrder(req, res, next) {
  try {
    const b = req.body || {};
    const userId = Number(b.user_id);
    const dishId = Number(b.dish_id);
    if (!Number.isInteger(userId) || !Number.isInteger(dishId)) {
      return res.status(400).json({ error: 'user_id and dish_id are required.' });
    }
    const fields = validateFields(b, res);
    if (!fields) return;
    const order = await repo.createOrder({ user_id: userId, dish_id: dishId, ...fields });
    res.status(201).json(format(order));
  } catch (error) {
    next(error);
  }
}

async function updateOrder(req, res, next) {
  try {
    const keys = parseKeys(req, res);
    if (!keys) return;
    const fields = validateFields(req.body || {}, res);
    if (!fields) return;
    const order = await repo.updateOrder(keys.userId, keys.dishId, fields);
    if (!order) return res.status(404).json({ error: 'Order not found.' });
    res.json(format(order));
  } catch (error) {
    next(error);
  }
}

async function deleteOrder(req, res, next) {
  try {
    const keys = parseKeys(req, res);
    if (!keys) return;
    const deleted = await repo.deleteOrder(keys.userId, keys.dishId);
    if (!deleted) return res.status(404).json({ error: 'Order not found.' });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
}

module.exports = { getOrders, getOrder, createOrder, updateOrder, deleteOrder };