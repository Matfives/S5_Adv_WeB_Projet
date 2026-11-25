const dishRepository = require('./dish.repository');

// MySQL DECIMAL values are returned as strings by default.
function format(dish) {
  return { ...dish, dish_price: dish.dish_price === null ? null : Number(dish.dish_price) };
}

function parseId(req, res) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    res.status(400).json({ error: 'Invalid dish id.' });
    return null;
  }
  return id;
}

function validate(body, res) {
  const b = body || {};
  const price = Number(b.dish_price);
  if (!b.dish_name || !String(b.dish_name).trim()) {
    res.status(400).json({ error: 'dish_name is required.' });
    return null;
  }
  if (b.dish_price === '' || b.dish_price == null || !Number.isFinite(price) || price < 0) {
    res.status(400).json({ error: 'dish_price must be a positive number.' });
    return null;
  }
  return {
    dish_type: b.dish_type ?? null,
    dish_name: String(b.dish_name).trim(),
    dish_price: price,
    dish_calories: b.dish_calories == null ? null : String(b.dish_calories),
    dish_ingredients: b.dish_ingredients ?? null
  };
}

async function getDishes(req, res, next) {
  try {
    res.json((await dishRepository.getAllDishes()).map(format));
  } catch (error) {
    next(error);
  }
}

async function getDish(req, res, next) {
  try {
    const id = parseId(req, res);
    if (id === null) return;
    const dish = await dishRepository.getDishById(id);
    if (!dish) return res.status(404).json({ error: 'Dish not found.' });
    res.json(format(dish));
  } catch (error) {
    next(error);
  }
}

async function createDish(req, res, next) {
  try {
    const data = validate(req.body, res);
    if (!data) return;
    res.status(201).json(format(await dishRepository.createDish(data)));
  } catch (error) {
    next(error);
  }
}

async function updateDish(req, res, next) {
  try {
    const id = parseId(req, res);
    if (id === null) return;
    const data = validate(req.body, res);
    if (!data) return;
    const dish = await dishRepository.updateDish(id, data);
    if (!dish) return res.status(404).json({ error: 'Dish not found.' });
    res.json(format(dish));
  } catch (error) {
    next(error);
  }
}

async function deleteDish(req, res, next) {
  try {
    const id = parseId(req, res);
    if (id === null) return;
    const deleted = await dishRepository.deleteDish(id);
    if (!deleted) return res.status(404).json({ error: 'Dish not found.' });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
}

module.exports = { getDishes, getDish, createDish, updateDish, deleteDish };