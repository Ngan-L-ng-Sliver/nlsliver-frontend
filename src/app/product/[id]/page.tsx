"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Heart, Share2, ShoppingCart, Plus, Minus, Copy, MessageCircle, X, ZoomIn, ZoomOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog"
import { CommonHeader } from "@/components/common/common-header"
import { CommonFooter } from "@/components/common/common-footer"
import { toast } from "sonner"


// Import cart functions and product data
import { addToCart } from "@/lib/cart"
import { toggleFavorite, isFavorite } from "@/lib/favorites"
import { getProductById, getRelatedProducts, formatPrice, getStatusDisplay, type Product } from "@/data/products"

export default function ProductDetailPage() {
  const params = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [shareOpen, setShareOpen] = useState(false)
  const [imageModalOpen, setImageModalOpen] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [isFavoriteState, setIsFavoriteState] = useState(false)

  useEffect(() => {
    // Scroll to top when component mounts or product changes
    window.scrollTo({ top: 0, behavior: "smooth" })

    // Reset states
    setSelectedImage(0)
    setQuantity(1)

    // Get product ID from params
    const productId = Number.parseInt(params.id as string)

    if (productId) {
      const foundProduct = getProductById(productId)
      const related = getRelatedProducts(productId, 3)

      setProduct(foundProduct || null)
      setRelatedProducts(related)

      // Set favorite state
      if (foundProduct) {
        setIsFavoriteState(isFavorite(foundProduct.id))
      }
    }
  }, [params.id]) // Re-run when product ID changes

  // Refresh product data when localStorage changes
  useEffect(() => {
    const refreshProduct = () => {
      const productId = Number.parseInt(params.id as string)
      if (productId) {
        const updatedProduct = getProductById(productId)
        const updatedRelated = getRelatedProducts(productId, 3)
        setProduct(updatedProduct || null)
        setRelatedProducts(updatedRelated)

        // Update favorite state
        if (updatedProduct) {
          setIsFavoriteState(isFavorite(updatedProduct.id))
        }
      }
    }

    // Listen for storage changes (when prices are updated)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "ngan-luong-products-updated") {
        console.log("Products updated in localStorage, refreshing product...")
        refreshProduct()
      }
    }

    // Listen for favorites updates
    const handleFavoritesUpdate = () => {
      const productId = Number.parseInt(params.id as string)
      if (productId) {
        setIsFavoriteState(isFavorite(productId))
      }
    }

    window.addEventListener("storage", handleStorageChange)
    window.addEventListener("favoritesUpdated", handleFavoritesUpdate)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("favoritesUpdated", handleFavoritesUpdate)
    }
  }, [params.id])

  // Listen for localStorage refresh events
  useEffect(() => {
    const handleLocalStorageRefresh = () => {
      const productId = Number.parseInt(params.id as string)
      if (productId) {
        console.log("LocalStorage refresh triggered, updating product detail...")
        const updatedProduct = getProductById(productId)
        const updatedRelated = getRelatedProducts(productId, 3)
        setProduct(updatedProduct || null)
        setRelatedProducts(updatedRelated)

        // Update favorite state
        if (updatedProduct) {
          setIsFavoriteState(isFavorite(updatedProduct.id))
        }
      }
    }

    const handlePricesUpdated = () => {
      const productId = Number.parseInt(params.id as string)
      if (productId) {
        console.log("Prices updated event triggered, updating product detail...")
        const updatedProduct = getProductById(productId)
        const updatedRelated = getRelatedProducts(productId, 3)
        setProduct(updatedProduct || null)
        setRelatedProducts(updatedRelated)

        // Update favorite state
        if (updatedProduct) {
          setIsFavoriteState(isFavorite(updatedProduct.id))
        }
      }
    }

    window.addEventListener("localStorageRefresh", handleLocalStorageRefresh)
    window.addEventListener("pricesUpdated", handlePricesUpdated)

    return () => {
      window.removeEventListener("localStorageRefresh", handleLocalStorageRefresh)
      window.removeEventListener("pricesUpdated", handlePricesUpdated)
    }
  }, [params.id])

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change
    if (newQuantity >= 1) {
      setQuantity(newQuantity)
    }
  }

  const handleQuantityInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value)
    if (!isNaN(value) && value >= 1) {
      setQuantity(value)
    } else if (e.target.value === "") {
      setQuantity(1)
    }
  }

  const calculateSubtotal = () => {
    if (!product) return 0
    return product.sellPrice * quantity
  }

  const calculateTotal = () => {
    return calculateSubtotal()
  }

  const handleToggleFavorite = () => {
    if (!product) return

    const favoriteItem = {
      id: product.id,
      name: product.name,
      code: product.code,
      weight: product.weight,
      sellPrice: product.sellPrice,
      buyPrice: product.buyPrice,
      image: product.images[0],
      category: product.category,
    }

    const isNowFavorite = toggleFavorite(favoriteItem)
    setIsFavoriteState(isNowFavorite)

    toast(isNowFavorite ? "Đã thêm vào yêu thích" : "Đã xóa khỏi yêu thích", {
      description: isNowFavorite
        ? `${product.name} đã được thêm vào danh sách yêu thích`
        : `${product.name} đã được xóa khỏi danh sách yêu thích`,
    })
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      toast("Đã sao chép liên kết",{
        description: "Liên kết sản phẩm đã được sao chép vào clipboard",
      })
      setShareOpen(false)
    } catch (error) {
      // Fallback for older browsers
      const textArea = document.createElement("textarea")
      textArea.value = window.location.href
      document.body.appendChild(textArea)
      textArea.select()
      try {
        document.execCommand("copy")
        toast("Đã sao chép liên kết", {
          description: "Liên kết sản phẩm đã được sao chép vào clipboard",
        })
        setShareOpen(false)
      } catch (fallbackError) {
        toast("Không thể sao chép", {
          description: "Vui lòng sao chép URL từ thanh địa chỉ",
          // variant: "destructive",
        })
      }
      document.body.removeChild(textArea)
    }
  }

  const handleShareFacebook = () => {
    const url = encodeURIComponent(window.location.href)
    const title = encodeURIComponent(product?.name || "")
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${title}`
    window.open(facebookUrl, "_blank", "width=600,height=400")
    setShareOpen(false)
  }

  const handleShareMessenger = () => {
    const url = encodeURIComponent(window.location.href)
    const messengerUrl = `https://www.facebook.com/dialog/send?link=${url}&app_id=YOUR_APP_ID&redirect_uri=${url}`
    window.open(messengerUrl, "_blank", "width=600,height=400")
    setShareOpen(false)
  }

  const handleOrder = () => {
    if (!product) return

    const cartItem = {
      id: product.id,
      name: product.name,
      code: product.code,
      weight: product.weight,
      sellPrice: product.sellPrice, // Store as number
      buyPrice: product.buyPrice, // Store as number
      image: product.images[0],
      category: product.category,
    }

    // Add multiple items to cart based on quantity
    for (let i = 0; i < quantity; i++) {
      addToCart(cartItem)
    }

    // Dispatch custom event to update cart icon
    window.dispatchEvent(new Event("cartUpdated"))

    // Redirect to cart page
    window.location.href = "/cart"
  }

  const handleAddToCart = () => {
    if (!product) return

    const cartItem = {
      id: product.id,
      name: product.name,
      code: product.code,
      weight: product.weight,
      sellPrice: product.sellPrice,
      buyPrice: product.buyPrice,
      image: product.images[0],
      category: product.category,
    }

    // Add multiple items to cart based on quantity
    for (let i = 0; i < quantity; i++) {
      addToCart(cartItem)
    }

    // Dispatch custom event to update cart icon
    window.dispatchEvent(new Event("cartUpdated"))

    // Show success toast
    toast("Đã thêm vào giỏ hàng",{
      description: `${quantity} sản phẩm đã được thêm vào giỏ hàng`,
    })
  }

  const handleImageClick = () => {
    setImageModalOpen(true)
    setZoomLevel(1)
  }

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.5, 3))
  }

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.5, 0.5))
  }

  const handleModalClose = () => {
    setImageModalOpen(false)
    setZoomLevel(1)
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <CommonHeader currentPage="products" />
        <div className="h-14 sm:h-16"></div>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">Không tìm thấy sản phẩm</h1>
            <p className="text-slate-600 dark:text-slate-400 mb-6">Sản phẩm bạn đang tìm kiếm không tồn tại.</p>
            <Link href="/">
              <Button>Quay về trang chủ</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <CommonHeader currentPage="products" />

      {/* Spacer for fixed header */}
      <div className="h-14 sm:h-16"></div>

      {/* Breadcrumb */}
      <div className="bg-white dark:bg-slate-800 border-b dark:border-slate-700">
        <div className="container mx-auto px-2 sm:px-4 py-2 sm:py-3">
          <div className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm overflow-x-auto">
            <Link
              href="/"
              className="text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 whitespace-nowrap"
            >
              Trang chủ
            </Link>
            <span className="text-slate-400 dark:text-slate-500">/</span>
            <span className="text-slate-600 dark:text-slate-400 whitespace-nowrap">Sản phẩm</span>
            <span className="text-slate-400 dark:text-slate-500">/</span>
            <span className="text-slate-800 dark:text-slate-200 font-medium truncate">{product.name}</span>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-2 sm:px-4 py-4 sm:py-6 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
          {/* Product Images */}
          <div className="space-y-3 sm:space-y-4">
            <div className="relative aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg">
              <div className="relative w-full h-full p-4 cursor-pointer group" onClick={handleImageClick}>
                <Image
                  src={product.images[selectedImage] || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {/* Click to zoom indicator */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full p-3 shadow-lg border border-gray-200 dark:border-slate-600">
                    <ZoomIn className="w-6 h-6 text-slate-700 dark:text-slate-300 drop-shadow-sm" />
                  </div>
                </div>
              </div>

              {/* Favorite Button */}
              <Button
                variant="ghost"
                size="icon"
                className={`absolute top-2 sm:top-4 right-2 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 z-10 transition-all duration-300 ${
                  isFavoriteState
                    ? "bg-red-500 hover:bg-red-600 text-white"
                    : "bg-white/80 hover:bg-white dark:bg-slate-800/80 dark:hover:bg-slate-800"
                }`}
                onClick={handleToggleFavorite}
              >
                <Heart
                  className={`w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 ${
                    isFavoriteState ? "fill-current text-white" : "dark:text-white"
                  }`}
                />
              </Button>

              {/* Share Button with Popover */}
              <Popover open={shareOpen} onOpenChange={setShareOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 sm:top-4 right-12 sm:right-16 bg-white/80 hover:bg-white dark:bg-slate-800/80 dark:hover:bg-slate-800 w-8 h-8 sm:w-10 sm:h-10 z-10"
                  >
                    <Share2 className="w-4 h-4 sm:w-5 sm:h-5 dark:text-white" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-48 p-2 dark:bg-slate-800 dark:border-slate-700" align="end">
                  <div className="space-y-1">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-sm dark:text-white dark:hover:bg-slate-700"
                      onClick={handleCopyLink}
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Sao chép liên kết
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-sm dark:text-white dark:hover:bg-slate-700"
                      onClick={handleShareFacebook}
                    >
                      <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                      Chia sẻ Facebook
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-sm dark:text-white dark:hover:bg-slate-700"
                      onClick={handleShareMessenger}
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Chia sẻ Messenger
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 ${
                      selectedImage === index
                        ? "border-slate-800 dark:border-slate-400"
                        : "border-gray-200 dark:border-slate-600"
                    } bg-gray-100 dark:bg-gray-800`}
                  >
                    <div className="relative w-full h-full p-1">
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${product.name} ${index + 1}`}
                        fill
                        className="object-contain"
                        sizes="80px"
                      />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-4 sm:space-y-6">
            <div>
              <Badge className="mb-2 text-xs sm:text-sm dark:bg-slate-700 dark:text-slate-200">
                {product.category}
              </Badge>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800 dark:text-slate-200 mb-2">
                {product.name}
              </h1>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">Mã sản phẩm: {product.code}</p>
            </div>

            {/* Price */}
            <div className="bg-slate-50 dark:bg-slate-800 p-3 sm:p-4 rounded-lg">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm sm:text-base lg:text-lg font-medium text-blue-600 dark:text-blue-400">
                    Giá bán ra:
                  </span>
                  <span className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {formatPrice(product.sellPrice)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm sm:text-base lg:text-lg font-medium text-red-600 dark:text-red-400">
                    Giá mua vào:
                  </span>
                  <span className="text-base sm:text-lg lg:text-xl font-bold text-red-600 dark:text-red-400">
                    {formatPrice(product.buyPrice)}
                  </span>
                </div>
              </div>
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              <div
                className={`w-3 h-3 rounded-full ${
                  product.status === "available"
                    ? "bg-green-500"
                    : product.status === "out_of_stock"
                      ? "bg-red-500"
                      : "bg-gray-500"
                }`}
              />
              <span className={getStatusDisplay(product.status).color}>{getStatusDisplay(product.status).text}</span>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-2">
              <Label htmlFor="quantity" className="dark:text-slate-200">
                Số lượng:
              </Label>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className="dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:hover:bg-slate-600"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <Input
                  type="number"
                  min="1"
                  max="99999"
                  value={quantity}
                  onChange={handleQuantityInputChange}
                  className="w-20 text-center dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(1)}
                  className="dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:hover:bg-slate-600"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg space-y-3">
              <h4 className="font-semibold text-slate-800 dark:text-slate-200">Tóm tắt đơn hàng</h4>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Tạm tính ({quantity} sản phẩm):</span>
                  <span className="font-medium text-slate-800 dark:text-slate-200">
                    {formatPrice(calculateSubtotal())}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Phí vận chuyển:</span>
                  <span className="font-medium text-slate-800 dark:text-slate-200 text-orange-600">Thương lượng</span>
                </div>

                <div className="border-t border-slate-200 dark:border-slate-600 pt-2">
                  <div className="flex justify-between">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">Tạm tính:</span>
                    <span className="font-bold text-lg text-blue-600 dark:text-blue-400">
                      {formatPrice(calculateTotal())}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 text-center">(Giá tham khảo đã bao gồm VAT)</p>
                <p className="text-xs text-orange-600 dark:text-orange-400 text-center">
                  *Phí vận chuyển sẽ được thương lượng với nhân viên bán hàng
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                size="lg"
                className="w-full h-12 sm:h-14 text-sm sm:text-base bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white"
                disabled={product.status !== "available"}
                onClick={handleAddToCart}
              >
                <Plus className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                {product.status === "available"
                  ? "THÊM VÀO GIỎ HÀNG"
                  : getStatusDisplay(product.status).text.toUpperCase()}
              </Button>

              <Button
                size="lg"
                className="w-full h-12 sm:h-14 text-sm sm:text-base bg-slate-800 hover:bg-slate-700 dark:bg-slate-600 dark:hover:bg-slate-500 dark:text-white"
                disabled={product.status !== "available"}
                onClick={handleOrder}
              >
                <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                {product.status === "available" ? "ĐẶT HÀNG NGAY" : getStatusDisplay(product.status).text.toUpperCase()}
              </Button>
            </div>

            {/* Purchase Information */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mt-4">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-3">Thông tin mua hàng</h4>
              <div className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
                <p>
                  <span className="font-medium">Liên hệ tư vấn:</span>{" "}
                  <a
                    href="https://zalo.me/nganluongsilver"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                  >
                    Zalo
                  </a>
                  {" hoặc "}
                  <a
                    href="https://facebook.com/nganluongsilver"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                  >
                    Fanpage
                  </a>
                </p>
                <p className="font-medium text-red-600 dark:text-red-400">
                  Quý khách vui lòng lưu ý về số tài khoản thanh toán
                </p>
                <p>
                  <span className="font-medium">Để tránh rủi ro:</span> Từ ngày 01/08/2025, Ngân Lượng Sliver - Đại lý
                  uỷ quyền của Phú Quý/Ancarat chỉ nhận thanh toán online vào tài khoản duy nhất
                </p>
                <div className="bg-white dark:bg-slate-800 rounded p-3 mt-3 border border-blue-200 dark:border-blue-700">
                  <p>
                    <span className="font-medium">Ngân hàng:</span> MB Bank (Quân Đội)
                  </p>
                  <p>
                    <span className="font-medium">Chủ tài khoản:</span> CONG TY TNHH MTV VANG BAC NGAN LUONG
                  </p>
                  <p>
                    <span className="font-medium">Số tài khoản:</span> 5552223456
                  </p>
                </div>
                <p>
                  <span className="font-medium">Hệ thống điểm bán:</span>{" "}
                  <a
                    href="/diem-ban"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    nganluongsilver.vercel.app/diem-ban
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Tabs defaultValue="description" className="mb-12">
          <TabsList className="grid w-full grid-cols-2 dark:bg-slate-800">
            <TabsTrigger value="description" className="dark:data-[state=active]:bg-slate-700 dark:text-slate-300">
              Mô tả sản phẩm
            </TabsTrigger>
            <TabsTrigger value="specifications" className="dark:data-[state=active]:bg-slate-700 dark:text-slate-300">
              Thông số kỹ thuật
            </TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-6">
            <Card className="dark:bg-slate-800 dark:border-slate-700">
              <CardContent className="p-6">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4">{product.description}</p>
                <h4 className="font-semibold mb-3 dark:text-slate-200">Đặc điểm nổi bật:</h4>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-green-600 dark:text-green-400 mt-1">✓</span>
                      <span className="text-slate-700 dark:text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="specifications" className="mt-6">
            <Card className="dark:bg-slate-800 dark:border-slate-700">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-gray-100 dark:border-slate-700">
                      <span className="font-medium text-slate-600 dark:text-slate-400">{key}:</span>
                      <span className="text-slate-800 dark:text-slate-200">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-6">Sản phẩm liên quan</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Card
                  key={relatedProduct.id}
                  className="group hover:shadow-lg dark:hover:shadow-slate-700/50 transition-shadow dark:bg-slate-800 dark:border-slate-700"
                >
                  <CardContent className="p-0">
                    {/* Clickable Image */}
                    <Link href={`/product/${relatedProduct.id}`} className="block">
                      <div className="relative aspect-square bg-gray-100 dark:bg-gray-800 overflow-hidden rounded-t-lg">
                        <div className="relative w-full h-full p-2">
                          <Image
                            src={relatedProduct.images[0] || "/placeholder.svg"}
                            alt={relatedProduct.name}
                            fill
                            className="object-contain hover:scale-105 transition-transform duration-300 cursor-pointer"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        </div>
                      </div>
                    </Link>
                    <div className="p-4">
                      {/* Clickable Product Name */}
                      <Link
                        href={`/product/${relatedProduct.id}`}
                        className="block hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        <h3 className="font-semibold mb-2 line-clamp-2 dark:text-slate-200 cursor-pointer">
                          {relatedProduct.name}
                        </h3>
                      </Link>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                        ({relatedProduct.weight}) - {relatedProduct.code}
                      </p>
                      <p className="font-bold text-blue-600 dark:text-blue-400">
                        {formatPrice(relatedProduct.sellPrice)}
                      </p>
                    </div>
                  </CardContent>
                  <div className="p-4 pt-0">
                    {/* Clickable Button */}
                    <Link href={`/product/${relatedProduct.id}`}>
                      <Button
                        variant="outline"
                        className="w-full bg-transparent dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:hover:bg-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors"
                      >
                        Xem chi tiết
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Image Modal with Zoom */}
      <Dialog open={imageModalOpen} onOpenChange={handleModalClose}>
        <DialogContent className="max-w-4xl w-full h-[90vh] p-0 bg-black/95 border-none">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Close Button */}
            <DialogClose asChild>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 z-20 bg-black/50 hover:bg-black/70 text-white border border-white/20 backdrop-blur-sm shadow-lg hover:text-white"
              >
                <X className="w-6 h-6 drop-shadow-sm" />
              </Button>
            </DialogClose>

            {/* Zoom Controls */}
            <div className="absolute top-4 left-4 z-20 flex space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleZoomOut}
                disabled={zoomLevel <= 0.5}
                className="bg-black/50 hover:bg-black/70 text-white border border-white/20 backdrop-blur-sm shadow-lg hover:text-white"
              >
                <ZoomOut className="w-5 h-5 drop-shadow-sm" />
              </Button>
              <div className="bg-black/50 px-3 py-2 rounded text-white text-sm font-medium border border-white/20 backdrop-blur-sm shadow-lg">
                {Math.round(zoomLevel * 100)}%
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleZoomIn}
                disabled={zoomLevel >= 3}
                className="bg-black/50 hover:bg-black/70 text-white border border-white/20 backdrop-blur-sm shadow-lg hover:text-white"
              >
                <ZoomIn className="w-5 h-5 drop-shadow-sm" />
              </Button>
            </div>

            {/* Image Container */}
            <div
              className="relative w-full h-full overflow-auto"
              style={{
                transform: `scale(${zoomLevel})`,
                transformOrigin: "center center",
                transition: "transform 0.3s ease-in-out",
              }}
            >
              <div className="relative w-full h-full flex items-center justify-center p-8">
                <Image
                  src={product.images[selectedImage] || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>
            </div>

            {/* Navigation for multiple images */}
            {product.images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
                <div className="flex space-x-2 bg-white/20 rounded-lg p-2">
                  {product.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        selectedImage === index ? "bg-white" : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <CommonFooter />
    </div>
  )
}
