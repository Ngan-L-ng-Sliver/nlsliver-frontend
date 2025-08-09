"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CommonHeader } from "@/components/common/common-header"
import { CommonFooter } from "@/components/common/common-footer"
import { TransactionSteps } from "@/components/common/transaction-steps"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import {
  getCartItems,
  updateCartItemQuantity,
  removeFromCart,
  clearCart,
  getCartSubtotal,
  getShippingFee,
  type CartItem,
} from "@/lib/cart"
import { generateOrderId, saveOrder, type OrderData } from "@/lib/orders"

import { CartItems } from "./cart-items"
import { OrderSummary } from "./order-summary"
import { CustomerInfoForm } from "./customer-info-form"
import { DeliveryMethod } from "./delivery-method"
import { PaymentMethod } from "./payment-method"
import { OrderNotes } from "./order-notes"
import { customerInfoSchema, type CustomerInfoFormType } from "./types"

export function CartPage() {
  const router = useRouter()
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [couponCode, setCouponCode] = useState("")

  const form = useForm<CustomerInfoFormType>({
    resolver: yupResolver(customerInfoSchema),
    mode: "onChange",
    defaultValues: {
      gender: "",
      name: "",
      phone: "",
      email: "",
      birthDate: "",
      deliveryMethod: "delivery", // Default to home delivery
      province: "",
      district: "",
      ward: "",
      address: "",
      store: "",
      paymentMethod: "bank", // Default to bank transfer
      note: "",
      agreeTerms: true, // Default checked
      agreePromotion: false,
      agreeCompany: false,
    },
  })

  const {
    handleSubmit,
    formState: { isValid },
    reset,
    watch,
  } = form
  const watchedValues = watch()

  useEffect(() => {
    const loadCartItems = () => {
      const items = getCartItems()
      setCartItems(items)
      setIsLoading(false)
    }

    loadCartItems()

    // Listen for cart updates
    const handleCartUpdate = () => loadCartItems()
    window.addEventListener("cartUpdated", handleCartUpdate)

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate)
    }
  }, [])

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    console.log(`CartPage: Received quantity change request for product ${productId} to ${newQuantity}`)

    // Additional validation at parent level
    if (newQuantity < 1) {
      console.log("CartPage: Quantity cannot be less than 1")
      return
    }

    if (newQuantity > 99999) {
      console.log("CartPage: Quantity exceeds maximum of 99999")
      alert("Số lượng tối đa là 99999 sản phẩm")
      return
    }

    console.log("CartPage: Updating cart item quantity")
    const updatedItems = updateCartItemQuantity(productId, newQuantity)
    setCartItems(updatedItems)
    window.dispatchEvent(new Event("cartUpdated"))
  }

  const handleRemoveItem = (productId: number) => {
    const updatedItems = removeFromCart(productId)
    setCartItems(updatedItems)
    window.dispatchEvent(new Event("cartUpdated"))
  }

  const handleClearCart = () => {
    if (confirm("Bạn có chắc chắn muốn xóa tất cả sản phẩm trong giỏ hàng?")) {
      clearCart()
      setCartItems([])
      window.dispatchEvent(new Event("cartUpdated"))
    }
  }

  const handleApplyCoupon = () => {
    if (couponCode.trim()) {
      // Simulate coupon validation
      alert(`Mã giảm giá "${couponCode}" đã được áp dụng!`)
    }
  }

  const onSubmit = async (data: CustomerInfoFormType) => {
    if (cartItems.length === 0) {
      alert("Giỏ hàng của bạn đang trống!")
      return
    }

    setIsSubmitting(true)

    try {
      // Generate order ID
      const orderId = generateOrderId()

      // Convert cart items to order items
      const orderItems = cartItems.map((item) => ({
        id: item.id,
        name: item.name,
        code: item.code,
        weight: item.weight,
        sellPrice: item.sellPrice,
        buyPrice: item.buyPrice,
        image: item.image,
        category: item.category,
        quantity: item.quantity,
        addedAt: item.addedAt,
      }))

      // Calculate totals
      const subtotal = getCartSubtotal(cartItems)
      const shippingFee = getShippingFee(subtotal)
      const discount = 0 // Can be implemented later
      const total = subtotal + shippingFee - discount

      // Get store address if pickup method
      let storeAddress = undefined
      if (data.deliveryMethod === "pickup" && data.store === "da-nang") {
        storeAddress = "45 Bàu Hạc 8, Thanh Khê, Đà Nẵng"
      }

      // Create order data
      const orderData: OrderData = {
        id: orderId,
        items: orderItems,
        customerInfo: {
          fullName: data.name,
          phoneNumber: data.phone,
          email: data.email,
          address: data.address,
          ward: data.ward,
          district: data.district,
          province: data.province,
        },
        deliveryMethod: data.deliveryMethod,
        paymentMethod: data.paymentMethod,
        notes: data.note,
        couponCode,
        subtotal,
        shippingFee,
        discount,
        total,
        createdAt: new Date().toISOString(),
        status: "pending",
        storeAddress,
      }

      // Save order to localStorage
      saveOrder(orderData)

      // Clear cart
      clearCart()
      setCartItems([])
      window.dispatchEvent(new Event("cartUpdated"))

      // Redirect to confirmation page with order ID
      router.push(`/xac-nhan-don-hang/${orderId}`)
    } catch (error) {
      console.error("Checkout error:", error)
      alert("Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại!")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Calculate order totals
  const subtotal = getCartSubtotal(cartItems)
  const shippingFee = getShippingFee(subtotal)
  const discount = 0 // Can be implemented later
  const total = subtotal + shippingFee - discount

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-800 dark:border-slate-200 mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Đang tải giỏ hàng...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <CommonHeader />

      {/* Spacer for fixed header */}
      <div className="h-14 sm:h-16"></div>

      {/* Transaction Steps */}
      <TransactionSteps currentStep={1} />

      {/* Breadcrumb */}
      <div className="bg-white dark:bg-slate-800 border-b dark:border-slate-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center space-x-2 text-sm">
            <Link
              href="/"
              className="text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
            >
              Trang chủ
            </Link>
            <span className="text-slate-400 dark:text-slate-500">/</span>
            <span className="text-slate-800 dark:text-slate-200 font-medium">Giỏ hàng</span>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 max-w-7xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-4">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button
                variant="outline"
                className="h-10 text-sm dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:hover:bg-slate-600 bg-transparent"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Quay lại
              </Button>
            </Link>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-12 sm:py-16">
            <ShoppingBag className="w-16 h-16 sm:w-24 sm:h-24 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
            <h2 className="text-xl sm:text-2xl font-semibold text-slate-600 dark:text-slate-400 mb-2">
              Giỏ hàng của bạn đang trống
            </h2>
            <p className="text-sm sm:text-base text-slate-500 dark:text-slate-500 mb-6 px-4">
              Hãy thêm một số sản phẩm bạc mỹ nghệ cao cấp vào giỏ hàng
            </p>
            <Link href="/">
              <Button className="bg-slate-800 hover:bg-slate-700 dark:bg-slate-600 dark:hover:bg-slate-500 dark:text-white">
                Khám phá sản phẩm
              </Button>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
            {/* Page Title */}
            <div className="text-center">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">
                Thông tin đặt hàng
              </h1>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
              {/* Left Column - Cart Items and Forms */}
              <div className="space-y-4 sm:space-y-6">
                {/* Cart Items */}
                <CartItems
                  cartItems={cartItems}
                  onQuantityChange={handleQuantityChange}
                  onRemoveItem={handleRemoveItem}
                  onClearCart={handleClearCart}
                />

                {/* Coupon Code */}
                {/*<CouponSection
                  couponCode={couponCode}
                  setCouponCode={setCouponCode}
                  onApplyCoupon={handleApplyCoupon}
                />*/}

                {/* Customer Information Form */}
                <CustomerInfoForm form={form} />

                {/* Combined Delivery Method & Address */}
                <DeliveryMethod form={form} />

                {/* Payment Methods */}
                <PaymentMethod form={form} />

                {/* Order Notes */}
                <OrderNotes form={form} />
              </div>

              {/* Right Column - Order Summary */}
              <div className="space-y-4 sm:space-y-6 lg:sticky lg:top-4">
                {/* Order Summary */}
                <OrderSummary subtotal={subtotal} shippingFee={shippingFee} discount={discount} total={total} />

                {/* Purchase Information */}
                {/*<PurchaseInfo />*/}

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full h-12 sm:h-14 text-sm sm:text-base bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  //disabled={cartItems.length === 0 || !isValid || isSubmitting}
                  disabled
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Đang xử lý...
                    </>
                  ) : (
                    <>ĐẶT HÀNG</>
                  )}
                </Button>

                {/* Form Status Info */}
                <div className="text-xs text-slate-500 dark:text-slate-400 text-center px-2">
                  <p>* Các trường có dấu sao là bắt buộc</p>
                  {isValid && Object.values(watchedValues).some((value) => value) && (
                    <p className="text-green-600 dark:text-green-400 mt-1">✓ Thông tin hợp lệ, sẵn sàng đặt hàng</p>
                  )}
                </div>
              </div>
            </div>
          </form>
        )}
      </main>

      {/* Footer */}
      <CommonFooter />
    </div>
  )
}
