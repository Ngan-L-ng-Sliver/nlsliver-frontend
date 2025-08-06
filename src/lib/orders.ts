export interface CustomerInfo {
  fullName: string
  phoneNumber: string
  email: string
  address: string
  ward: string
  district: string
  province: string
}

export interface OrderItem {
  id: number
  name: string
  code: string
  weight: string
  sellPrice: string
  buyPrice: string
  image: string
  category: string
  quantity: number
  addedAt: string
}

export interface OrderData {
  id: string
  items: OrderItem[]
  customerInfo: CustomerInfo
  deliveryMethod: string
  paymentMethod: string
  notes: string
  couponCode: string
  subtotal: number
  shippingFee: number
  discount: number
  total: number
  createdAt: string
  status: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled"
  completedAt?: string
  storeAddress?: string
  completedCustomerInfo?: {
    fullName: string
    phoneNumber: string
    email: string
    address: string
    notes: string
  }
}

// Generate unique order ID
export function generateOrderId(): string {
  const timestamp = Date.now().toString(36)
  const randomStr = Math.random().toString(36).substring(2, 8).toUpperCase()
  return `NL${timestamp}${randomStr}`.toUpperCase()
}

// Save order to localStorage
export function saveOrder(order: OrderData): void {
  try {
    const existingOrders = getOrders()
    const updatedOrders = [...existingOrders, order]
    localStorage.setItem("orders", JSON.stringify(updatedOrders))
  } catch (error) {
    console.error("Error saving order:", error)
  }
}

// Get all orders from localStorage
export function getOrders(): OrderData[] {
  try {
    const orders = localStorage.getItem("orders")
    return orders ? JSON.parse(orders) : []
  } catch (error) {
    console.error("Error getting orders:", error)
    return []
  }
}

// Get order by ID
export function getOrderById(orderId: string): OrderData | null {
  try {
    const orders = getOrders()
    return orders.find((order) => order.id === orderId) || null
  } catch (error) {
    console.error("Error getting order by ID:", error)
    return null
  }
}

// Update order status
export function updateOrderStatus(orderId: string, status: OrderData["status"]): void {
  try {
    const orders = getOrders()
    const updatedOrders = orders.map((order) => (order.id === orderId ? { ...order, status } : order))
    localStorage.setItem("orders", JSON.stringify(updatedOrders))
  } catch (error) {
    console.error("Error updating order status:", error)
  }
}

// Complete order with customer info
export function completeOrder(
  orderId: string,
  customerInfo: {
    fullName: string
    phoneNumber: string
    email: string
    address: string
    notes: string
  },
): void {
  try {
    const orders = getOrders()
    const updatedOrders = orders.map((order) =>
      order.id === orderId
        ? {
            ...order,
            status: "confirmed" as const,
            completedAt: new Date().toISOString(),
            completedCustomerInfo: customerInfo,
          }
        : order,
    )
    localStorage.setItem("orders", JSON.stringify(updatedOrders))
  } catch (error) {
    console.error("Error completing order:", error)
  }
}

// Check if order is completed
export function isOrderCompleted(orderId: string): boolean {
  try {
    const order = getOrderById(orderId)
    return order ? !!order.completedAt : false
  } catch (error) {
    console.error("Error checking order completion:", error)
    return false
  }
}

// Delete order
export function deleteOrder(orderId: string): void {
  try {
    const orders = getOrders()
    const updatedOrders = orders.filter((order) => order.id !== orderId)
    localStorage.setItem("orders", JSON.stringify(updatedOrders))
  } catch (error) {
    console.error("Error deleting order:", error)
  }
}
