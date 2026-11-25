import { apiGet } from '@/services/api'

// An order ID can cover several rows. Keep the original IDs and identify the row
// with its customer and dish in the URL, including when the page is refreshed.
export function orderLocation(name, order) {
  return {
    name,
    params: { orderId: order.order_id },
    query: { userId: String(order.user_id), dishId: String(order.dish_id) }
  }
}

export async function fetchOrderRow(route) {
  const { userId, dishId } = route.query
  if (typeof userId !== 'string' || typeof dishId !== 'string') return null

  const order = await apiGet(`/orders/${encodeURIComponent(userId)}/${encodeURIComponent(dishId)}`)
  return order && order.order_id === route.params.orderId ? order : null
}