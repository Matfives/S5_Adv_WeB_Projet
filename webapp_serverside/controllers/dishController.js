const dishRepository = require('../repositories/dishRepository');

async function getDishes(req, res, next) {
  try {
    const dishes = await dishRepository.getAllDishes();

    // MySQL DECIMAL values are returned as strings by default.
    res.json(dishes.map((dish) => ({
      ...dish,
      dish_price: dish.dish_price === null ? null : Number(dish.dish_price)
    })));
  } catch (error) {
    next(error);
  }
}

module.exports = { getDishes };
