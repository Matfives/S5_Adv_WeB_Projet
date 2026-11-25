const repo = require('./restaurant.repository');

const INT_MAX = 2147483647; // rest_phone is an INT column

function parseId(req, res) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    res.status(400).json({ error: 'Invalid restaurant id.' });
    return null;
  }
  return id;
}

function validate(body, res) {
  const b = body || {};
  if (!b.rest_name || !String(b.rest_name).trim()) {
    res.status(400).json({ error: 'rest_name is required.' });
    return null;
  }
  const phone = b.rest_phone === '' || b.rest_phone == null ? null : Number(b.rest_phone);
  if (phone !== null && (!Number.isInteger(phone) || phone < 0 || phone > INT_MAX)) {
    res.status(400).json({ error: `rest_phone must be a whole number up to ${INT_MAX}.` });
    return null;
  }
  return {
    rest_name: String(b.rest_name).trim(),
    rest_adress: b.rest_adress ?? null,
    rest_size: b.rest_size ?? null,
    rest_phone: phone,
    rest_hours: b.rest_hours ?? null
  };
}

async function getRestaurants(req, res, next) {
  try {
    res.json(await repo.getAllRestaurants());
  } catch (error) {
    next(error);
  }
}

async function getRestaurant(req, res, next) {
  try {
    const id = parseId(req, res);
    if (id === null) return;
    const restaurant = await repo.getRestaurantById(id);
    if (!restaurant) return res.status(404).json({ error: 'Restaurant not found.' });
    res.json(restaurant);
  } catch (error) {
    next(error);
  }
}

async function createRestaurant(req, res, next) {
  try {
    const data = validate(req.body, res);
    if (!data) return;
    res.status(201).json(await repo.createRestaurant(data));
  } catch (error) {
    next(error);
  }
}

async function updateRestaurant(req, res, next) {
  try {
    const id = parseId(req, res);
    if (id === null) return;
    const data = validate(req.body, res);
    if (!data) return;
    const restaurant = await repo.updateRestaurant(id, data);
    if (!restaurant) return res.status(404).json({ error: 'Restaurant not found.' });
    res.json(restaurant);
  } catch (error) {
    next(error);
  }
}

async function deleteRestaurant(req, res, next) {
  try {
    const id = parseId(req, res);
    if (id === null) return;
    const deleted = await repo.deleteRestaurant(id);
    if (!deleted) return res.status(404).json({ error: 'Restaurant not found.' });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getRestaurants, getRestaurant, createRestaurant, updateRestaurant, deleteRestaurant
};