"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, ArrowLeft, Send, MessageCircle, Facebook, Loader2, Package } from "lucide-react"
import Link from "next/link"
import emailjs from "@emailjs/browser"
import Image from "next/image"

import { CommonHeader } from "@/components/common/common-header"
import { CommonFooter } from "@/components/common/common-footer"
import { FloatingContact } from "@/components/common/floating-contact"
import { TransactionSteps } from "@/components/common/transaction-steps"
import { PDFViewer } from "@/components/order/pdf-viewer"
import { getOrderById, completeOrder, isOrderCompleted, type OrderData } from "@/lib/orders"

export default function OrderConfirmationPage() {
  const EMAILJS_SERVICE_ID = "service_78o9tuh" // Replace with your EmailJS service ID
  const EMAILJS_TEMPLATE_ID = "template_03j8z03" // Replace with your EmailJS template ID
  const EMAILJS_PUBLIC_KEY = "o_15hh5ZGWRGATlXi" // Replace with your EmailJS public key

  const params = useParams()
  const router = useRouter()
  const orderId = params.orderId as string

  const [order, setOrder] = useState<OrderData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [currentStep, setCurrentStep] = useState(2)

  // Form state
  const [customerName, setCustomerName] = useState("")
  const [customerPhone, setCustomerPhone] = useState("")
  const [customerEmail, setCustomerEmail] = useState("")
  const [customerAddress, setCustomerAddress] = useState("")
  const [notes, setNotes] = useState("")

  useEffect(() => {
    if (orderId) {
      const orderData = getOrderById(orderId)
      if (orderData) {
        setOrder(orderData)

        // Check if order is already completed
        const completed = isOrderCompleted(orderId)
        if (completed) {
          setIsSuccess(true)
          setCurrentStep(3)

          // Use completed customer info if available
          if (orderData.completedCustomerInfo) {
            setCustomerName(orderData.completedCustomerInfo.fullName)
            setCustomerPhone(orderData.completedCustomerInfo.phoneNumber)
            setCustomerEmail(orderData.completedCustomerInfo.email)
            setCustomerAddress(orderData.completedCustomerInfo.address)
            setNotes(orderData.completedCustomerInfo.notes)
          } else {
            // Fallback to original customer info
            setCustomerName(orderData.customerInfo.fullName)
            setCustomerPhone(orderData.customerInfo.phoneNumber)
            setCustomerEmail(orderData.customerInfo.email)
            setCustomerAddress(
              orderData.deliveryMethod === "pickup" && orderData.storeAddress
                ? orderData.storeAddress
                : `${orderData.customerInfo.address}`,
            )
            setNotes(orderData.notes)
          }
        } else {
          // Pre-fill form with order data for new confirmation
          setCustomerName(orderData.customerInfo.fullName)
          setCustomerPhone(orderData.customerInfo.phoneNumber)
          setCustomerEmail(orderData.customerInfo.email)
          setCustomerAddress(
            orderData.deliveryMethod === "pickup" && orderData.storeAddress
              ? orderData.storeAddress
              : `${orderData.customerInfo.address}`,
          )
          setNotes(orderData.notes)
        }
      }
      setIsLoading(false)
    }
  }, [orderId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!order) return

    setIsSubmitting(true)

    try {
      // Prepare order summary for email
      const orderSummary = order.items
        .map((item) => `${item.name} (${item.code}) - SL: ${item.quantity} - Giá: ${item.sellPrice}`)
        .join("\n")

      const isPickup = order.deliveryMethod === "pickup"

      const emailData = {
        customer_name: customerName,
        customer_phone: customerPhone,
        customer_email: customerEmail || "thanhxam001@gmail.com",
        customer_address: customerAddress,
        order_id: order.id,
        order_date: new Date(order.createdAt).toLocaleString("vi-VN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
        //order_items: orderSummary,
        subtotal: order.subtotal.toLocaleString("vi-VN"),
        shipping_fee: order.shippingFee.toLocaleString("vi-VN"),
        total: order.total.toLocaleString("vi-VN"),
        payment_method: order.paymentMethod === "bank" ? "Chuyển khoản ngân hàng" : "Thanh toán khi nhận hàng",
        delivery_method: order.deliveryMethod === "delivery" ? "Giao hàng tận nơi" : "Nhận tại cửa hàng",
        isPickup: isPickup ? true : "",
        store_address: isPickup ? order.storeAddress : "",
        notes: notes || "Không có ghi chú",

        orders: order.items.map((item, index) => ({
          stt: index + 1,
          product_name: item.name,
          product_code: item.code,
          quantity: item.quantity,
          unit_price: Number(item.sellPrice).toLocaleString("vi-VN"),
          total_price: (Number(item.quantity) * Number(item.sellPrice)).toLocaleString("vi-VN"),
        })),
      }

      // Send email using EmailJS
      await emailjs.send(
        EMAILJS_SERVICE_ID, // Replace with your EmailJS service ID
        EMAILJS_TEMPLATE_ID, // Replace with your EmailJS template ID
        emailData,
        EMAILJS_PUBLIC_KEY, // Replace with your EmailJS public key
      )

      // Complete order and save customer info to localStorage
      const customerInfo = {
        fullName: customerName,
        phoneNumber: customerPhone,
        email: customerEmail,
        address: customerAddress,
        notes: notes,
      }

      completeOrder(order.id, customerInfo)

      // Update local state
      setIsSuccess(true)
      setCurrentStep(3)

      // Update order data with completion info
      const updatedOrder = getOrderById(order.id)
      if (updatedOrder) {
        setOrder(updatedOrder)
      }
    } catch (error) {
      console.error("Error sending order:", error)
      alert("Có lỗi xảy ra khi gửi đơn hàng. Vui lòng thử lại!")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSendZalo = () => {
    if (!order) return

    const orderSummary = order.items.map((item) => `${item.name} - SL: ${item.quantity} - ${item.sellPrice}`).join("\n")

    const message = `🛍️ ĐƠN HÀNG MỚI - ${order.id}
    
👤 Khách hàng: ${customerName}
📞 Điện thoại: ${customerPhone}
📧 Email: ${customerEmail}
📍 Địa chỉ: ${customerAddress}

📦 Chi tiết đơn hàng:
${orderSummary}

💰 Tổng tiền: ${order.total.toLocaleString("vi-VN")}đ
💳 Thanh toán: ${order.paymentMethod === "bank" ? "Chuyển khoản" : "COD"}
🚚 Giao hàng: ${order.deliveryMethod === "delivery" ? "Tận nơi" : "Nhận tại shop"}

📝 Ghi chú: ${notes || "Không có"}

Ngày đặt: ${new Date(order.createdAt).toLocaleString("vi-VN")}`

    const zaloUrl = `https://zalo.me/0763600889?text=${encodeURIComponent(message)}`
    window.open(zaloUrl, "_blank")
  }

  const handleSendFacebook = () => {
    if (!order) return

    const orderSummary = order.items.map((item) => `${item.name} - SL: ${item.quantity} - ${item.sellPrice}`).join("\n")

    const message = `🛍️ ĐƠN HÀNG MỚI - ${order.id}
    
👤 Khách hàng: ${customerName}
📞 Điện thoại: ${customerPhone}
📧 Email: ${customerEmail}
📍 Địa chỉ: ${customerAddress}

📦 Chi tiết đơn hàng:
${orderSummary}

💰 Tổng tiền: ${order.total.toLocaleString("vi-VN")}đ
💳 Thanh toán: ${order.paymentMethod === "bank" ? "Chuyển khoản" : "COD"}
🚚 Giao hàng: ${order.deliveryMethod === "delivery" ? "Tận nơi" : "Nhận tại shop"}

📝 Ghi chú: ${notes || "Không có"}

Ngày đặt: ${new Date(order.createdAt).toLocaleString("vi-VN")}`

    const facebookUrl = `https://m.me/nganluongsilver?text=${encodeURIComponent(message)}`
    window.open(facebookUrl, "_blank")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Đang tải thông tin đơn hàng...</p>
        </div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <CommonHeader />
        <div className="pt-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Không tìm thấy đơn hàng
            </h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-8">
              Đơn hàng với mã {orderId} không tồn tại hoặc đã bị xóa.
            </p>
            <Link href="/cart">
              <Button className="bg-blue-600 hover:bg-blue-700 h-10 sm:h-12">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Quay lại giỏ hàng
              </Button>
            </Link>
          </div>
        </div>
        <CommonFooter />
      </div>
    )
  }

  const customerInfo = {
    fullName: customerName,
    phoneNumber: customerPhone,
    email: customerEmail,
    address: customerAddress,
    notes: notes,
  }

  // Determine address label based on delivery method
  const addressLabel = order.deliveryMethod === "pickup" ? "Địa chỉ cửa hàng đến nhận" : "Địa chỉ giao hàng"

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <CommonHeader />

      <div className="pt-16">
        {/* Transaction Steps */}
        <TransactionSteps currentStep={currentStep} />

        {/* Breadcrumb */}
        <div className="bg-white dark:bg-slate-800 border-b dark:border-slate-700">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center space-x-2 text-xs sm:text-sm">
              <button
                onClick={() => router.push("/cart")}
                className="text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
              >
                Giỏ hàng
              </button>
              <span className="text-slate-400 dark:text-slate-500">/</span>
              <span className="text-slate-800 dark:text-slate-200 font-medium">Xác nhận đơn hàng</span>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-7xl">
          {/* Page Header */}
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">Xác nhận đơn hàng</h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
              Mã đơn hàng:{" "}
              <Badge variant="secondary" className="ml-2 text-xs sm:text-sm">
                {order.id}
              </Badge>
            </p>
            {order.completedAt && (
              <p className="text-xs sm:text-sm text-green-600 dark:text-green-400 mt-2">
                Đã xác nhận lúc: {new Date(order.completedAt).toLocaleString("vi-VN")}
              </p>
            )}
          </div>

          {isSuccess ? (
            // Success State
            <div className="max-w-2xl mx-auto">
              <Card className="text-center p-4 sm:p-8">
                <CheckCircle className="h-12 w-12 sm:h-16 sm:w-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Đơn hàng đã được gửi thành công!
                </h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-6 sm:mb-8">
                  Cảm ơn bạn đã đặt hàng. Chúng tôi sẽ liên hệ với bạn sớm nhất để xác nhận đơn hàng.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-6 sm:mb-8">
                  <Button
                    onClick={handleSendZalo}
                    className="bg-blue-500 hover:bg-blue-600 text-white h-10 sm:h-12 w-full sm:w-auto"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Gửi đơn hàng qua Zalo
                  </Button>

                  <Button
                    onClick={handleSendFacebook}
                    className="bg-blue-600 hover:bg-blue-700 text-white h-10 sm:h-12 w-full sm:w-auto"
                  >
                    <Facebook className="h-4 w-4 mr-2" />
                    Gửi đơn hàng qua Facebook
                  </Button>
                </div>

                {/* PDF Viewer in Success State */}
                <div className="mb-6 sm:mb-8">
                  <PDFViewer order={order} customerInfo={customerInfo} />
                </div>

                <div>
                  <Link href="/">
                    <Button variant="outline" className="h-10 sm:h-12 w-full sm:w-auto bg-transparent">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Về trang chủ
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>
          ) : (
            // Form State - 2 Column Layout
            <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
              {/* Left Column - Order Summary & PDF */}
              <div className="space-y-4 sm:space-y-6">
                {/* Order Summary */}
                <Card>
                  <CardHeader className="pb-3 sm:pb-6">
                    <CardTitle className="text-base sm:text-lg">Chi tiết đơn hàng</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 sm:space-y-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex gap-3 sm:gap-4">
                        {/* Product Image */}
                        <div className="flex-shrink-0">
                          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              width={80}
                              height={80}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-xs sm:text-sm break-words line-clamp-2">{item.name}</h4>
                          <p className="text-xs text-gray-500 mt-1">Mã: {item.code}</p>
                          <p className="text-xs text-gray-500">Trọng lượng: {item.weight}</p>
                          <div className="flex justify-between items-center mt-2">
                            <p className="text-xs text-gray-500">SL: {item.quantity}</p>
                            <p className="font-medium text-xs sm:text-sm">{item.sellPrice}</p>
                          </div>
                        </div>
                      </div>
                    ))}

                    <Separator />

                    <div className="space-y-2 text-xs sm:text-sm">
                      <div className="flex justify-between">
                        <span>Tạm tính:</span>
                        <span>{order.subtotal.toLocaleString("vi-VN")}đ</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Phí vận chuyển:</span>
                        <span>{order.shippingFee.toLocaleString("vi-VN")}đ</span>
                      </div>
                      {order.discount > 0 && (
                        <div className="flex justify-between text-green-600">
                          <span>Giảm giá:</span>
                          <span>-{order.discount.toLocaleString("vi-VN")}đ</span>
                        </div>
                      )}
                      <Separator />
                      <div className="flex justify-between font-bold text-sm sm:text-lg">
                        <span>Tổng cộng:</span>
                        <span className="text-red-600">{order.total.toLocaleString("vi-VN")}đ</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* PDF Viewer */}
                <PDFViewer order={order} customerInfo={customerInfo} />
              </div>

              {/* Right Column - Customer Form */}
              <div>
                <form onSubmit={handleSubmit}>
                  <Card>
                    <CardHeader className="pb-3 sm:pb-6">
                      <CardTitle className="text-base sm:text-lg">Thông tin xác nhận</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 sm:space-y-4">
                      <div>
                        <Label htmlFor="customerName" className="text-xs sm:text-sm">
                          Họ và tên *
                        </Label>
                        <Input
                          id="customerName"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          required
                          className="h-10 text-sm"
                        />
                      </div>

                      <div>
                        <Label htmlFor="customerPhone" className="text-xs sm:text-sm">
                          Số điện thoại *
                        </Label>
                        <Input
                          id="customerPhone"
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          required
                          className="h-10 text-sm"
                        />
                      </div>

                      <div>
                        <Label htmlFor="customerEmail" className="text-xs sm:text-sm">
                          Email
                        </Label>
                        <Input
                          id="customerEmail"
                          type="email"
                          value={customerEmail}
                          onChange={(e) => setCustomerEmail(e.target.value)}
                          placeholder="Nhập để nhận hoá đơn online"
                          className="h-10 text-sm"
                        />
                      </div>

                      <div>
                        <Label htmlFor="customerAddress" className="text-xs sm:text-sm">
                          {addressLabel} *
                        </Label>
                        <Textarea
                          id="customerAddress"
                          value={customerAddress}
                          onChange={(e) => setCustomerAddress(e.target.value)}
                          rows={3}
                          required
                          className="text-sm resize-none"
                          placeholder={
                            order.deliveryMethod === "pickup" ? "Địa chỉ cửa hàng đến nhận" : "Địa chỉ giao hàng"
                          }
                        />
                      </div>

                      <div>
                        <Label htmlFor="notes" className="text-xs sm:text-sm">
                          Ghi chú
                        </Label>
                        <Textarea
                          id="notes"
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          rows={3}
                          placeholder="Ghi chú thêm về đơn hàng..."
                          className="text-sm resize-none"
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-700 h-12 sm:h-14 text-sm sm:text-base"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Đang gửi...
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4 mr-2" />
                            Xác nhận đơn hàng
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>

      <FloatingContact />
      <CommonFooter />
    </div>
  )
}
