export interface CartItem {
  id: number
  name: string
  code: string
  weight: string
  sellPrice: number
  buyPrice: number
  image: string
  category: string
  quantity: number
  addedAt: string
}

export function getCartItems(): CartItem[] {
  if (typeof window === "undefined") return []

  try {
    const cart = localStorage.getItem("nganluong_cart")
    return cart ? JSON.parse(cart) : []
  } catch (error) {
    console.error("Error parsing cart:", error)
    return []
  }
}

export function addToCart(product: Omit<CartItem, "quantity" | "addedAt">): CartItem[] {
  const cart = getCartItems()
  const existingItemIndex = cart.findIndex((item) => item.id === product.id)

  if (existingItemIndex > -1) {
    cart[existingItemIndex].quantity += 1
  } else {
    cart.push({
      ...product,
      quantity: 1,
      addedAt: new Date().toISOString(),
    })
  }

  localStorage.setItem("nganluong_cart", JSON.stringify(cart))
  return cart
}

export function updateCartItemQuantity(productId: number, newQuantity: number): CartItem[] {
  const cart = getCartItems()
  const itemIndex = cart.findIndex((item) => item.id === productId)

  if (itemIndex > -1) {
    if (newQuantity <= 0) {
      cart.splice(itemIndex, 1)
    } else {
      cart[itemIndex].quantity = newQuantity
    }
  }

  localStorage.setItem("nganluong_cart", JSON.stringify(cart))
  return cart
}

export function removeFromCart(productId: number): CartItem[] {
  const cart = getCartItems().filter((item) => item.id !== productId)
  localStorage.setItem("nganluong_cart", JSON.stringify(cart))
  return cart
}

export function clearCart(): void {
  localStorage.removeItem("nganluong_cart")
}

export function getCartSubtotal(cartItems: CartItem[]): number {
  return cartItems.reduce((total, item) => {
    return total + item.sellPrice * item.quantity
  }, 0)
}

export function getShippingFee(subtotal: number): number {
  // Shipping fee will be negotiated with sales staff
  return 0
}

export function getCartTotal(cartItems: CartItem[]): number {
  const subtotal = getCartSubtotal(cartItems)
  const shippingFee = getShippingFee(subtotal)
  return subtotal + shippingFee
}

export function getCartItemCount(): number {
  const cart = getCartItems()
  return cart.reduce((total, item) => total + item.quantity, 0)
}
