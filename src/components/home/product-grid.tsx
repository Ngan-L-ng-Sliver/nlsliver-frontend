"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatPrice, type Product } from "@/data/products"
import { addToCart } from "@/lib/cart"
import { toggleFavorite, isFavorite } from "@/lib/favorites"
import { toast } from "sonner"

interface ProductGridProps {
  products: Product[]
  // currentPage: number
  // totalPages: number
}

// export function ProductGrid({ products, currentPage, totalPages }: ProductGridProps) {
  export function ProductGrid({ products }: ProductGridProps) {
  const [favoriteStates, setFavoriteStates] = useState<Record<number, boolean>>({})

  // Initialize favorite states
  useEffect(() => {
    const states: Record<number, boolean> = {}
    products.forEach((product) => {
      states[product.id] = isFavorite(product.id)
    })
    setFavoriteStates(states)
  }, [products])

  // Listen for favorites updates
  useEffect(() => {
    const handleFavoritesUpdate = () => {
      const states: Record<number, boolean> = {}
      products.forEach((product) => {
        states[product.id] = isFavorite(product.id)
      })
      setFavoriteStates(states)
    }

    window.addEventListener("favoritesUpdated", handleFavoritesUpdate)
    return () => window.removeEventListener("favoritesUpdated", handleFavoritesUpdate)
  }, [products])

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.preventDefault() // Prevent navigation when clicking the button
    e.stopPropagation()

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

    addToCart(cartItem)

    // Dispatch custom event to update cart icon
    window.dispatchEvent(new Event("cartUpdated"))

    toast("Đã thêm vào giỏ hàng",{
      description: `${product.name} đã được thêm vào giỏ hàng`,
    })
  }

  const handleToggleFavorite = (product: Product, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

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

    // Update local state immediately for better UX
    setFavoriteStates((prev) => ({
      ...prev,
      [product.id]: isNowFavorite,
    }))

    toast(isNowFavorite ? "Đã thêm vào yêu thích" : "Đã xóa khỏi yêu thích",{
      description: isNowFavorite
        ? `${product.name} đã được thêm vào danh sách yêu thích`
        : `${product.name} đã được xóa khỏi danh sách yêu thích`,
    })
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-600 dark:text-slate-400 text-lg">Không tìm thấy sản phẩm nào.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      {products.map((product) => (
        <Card
          key={product.id}
          className="group hover:shadow-lg dark:hover:shadow-slate-700/50 transition-all duration-300 dark:bg-slate-800 dark:border-slate-700 overflow-hidden p-0"
        >
          <CardContent className="p-0">
            {/* Product Image Container */}
            <div className="relative aspect-square bg-gray-100 dark:bg-gray-800 overflow-hidden">
              <Link href={`/product/${product.id}`} className="block w-full h-full">
                <div className="relative w-full h-full p-2">
                  <Image
                    src={product.images[0] || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-contain hover:scale-105 transition-transform duration-300 cursor-pointer"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    priority={false}
                  />
                </div>
              </Link>

              {/* Status Badge */}
              {product.status !== "available" && (
                <Badge
                  variant="secondary"
                  className="absolute top-2 left-2 z-10 bg-red-500 text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
                >
                  Hết hàng
                </Badge>
              )}

              {/* Favorite Button */}
              <Button
                variant="ghost"
                size="icon"
                className={`absolute top-2 right-2 z-10 w-8 h-8 opacity-0 group-hover:opacity-100 transition-all duration-300 ${
                  favoriteStates[product.id]
                    ? "bg-red-500 hover:bg-red-600 text-white opacity-100"
                    : "bg-white/80 hover:bg-white dark:bg-slate-800/80 dark:hover:bg-slate-800"
                }`}
                onClick={(e) => handleToggleFavorite(product, e)}
              >
                <Heart
                  className={`w-4 h-4 transition-all duration-300 ${
                    favoriteStates[product.id] ? "fill-current text-white" : "dark:text-white"
                  }`}
                />
              </Button>
            </div>

            {/* Product Info */}
            <div className="p-4 space-y-3">
              {/* Product Name */}
              <Link
                href={`/product/${product.id}`}
                className="block hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <h3 className="font-semibold text-sm sm:text-base line-clamp-2 min-h-[2.5rem] sm:min-h-[3rem] dark:text-slate-200 cursor-pointer">
                  {product.name}
                </h3>
              </Link>

              {/* Product Details */}
              <div className="space-y-1">
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  ({product.weight}) - {product.code}
                </p>
              </div>

              {/* Pricing */}
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-xs sm:text-sm font-medium text-blue-600 dark:text-blue-400">BÁN RA:</span>
                  <span className="text-sm sm:text-base font-bold text-blue-600 dark:text-blue-400">
                    {formatPrice(product.sellPrice)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs sm:text-sm font-medium text-red-600 dark:text-red-400">MUA VÀO:</span>
                  <span className="text-sm sm:text-base font-bold text-red-600 dark:text-red-400">
                    {formatPrice(product.buyPrice)}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <Link href={`/product/${product.id}`} className="flex-1">
                  <Button
                    variant="outline"
                    className="w-full text-xs sm:text-sm bg-transparent dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:hover:bg-slate-600 hover:bg-slate-50 transition-colors"
                  >
                    CHI TIẾT
                  </Button>
                </Link>

                {product.status === "available" ? (
                  <Button
                    size="sm"
                    className="flex-1 text-xs sm:text-sm bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white"
                    onClick={(e) => handleAddToCart(product, e)}
                  >
                    <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    THÊM
                  </Button>
                ) : (
                  <Button size="sm" variant="secondary" disabled className="flex-1 text-xs sm:text-sm">
                    HẾT HÀNG
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
