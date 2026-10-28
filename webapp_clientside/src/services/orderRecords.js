import restaurantData from '@/data/Restaurant_Poisson_Sieux.json'

// An order ID can cover several rows. Keep the original IDs and identify the row
// with its customer and dish in the URL, including when the page is refreshed.
export function orderLocation(name, order) {
  return {
    name,
    params: { orderId: order.order_id },
    query: { userId: String(order.user_id), dishId: String(order.dish_id) }
  }
}

export function findOrderRow(route) {
  const { userId, dishId } = route.query
  if (typeof userId !== 'string' || typeof dishId !== 'string') return null

  return restaurantData.order_.find(order =>
    order.order_id === route.params.orderId &&
    String(order.user_id) === userId &&
    String(order.dish_id) === dishId
  ) || null
}

export function resolveOrderNames(order) {
  const dish = restaurantData.dish.find(dish => dish.dish_id === order.dish_id)
  const customer = restaurantData.Users.find(user => user.user_id === order.user_id)

  return {
    ...order,
    dishName: dish ? dish.dish_name : 'Unknown dish',
    customerName: customer ? customer.user_name : 'Unknown customer'
  }
}
