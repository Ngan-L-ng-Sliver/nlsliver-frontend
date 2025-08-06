"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingCart, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CommonHeader } from "@/components/common/common-header"
import { CommonFooter } from "@/components/common/common-footer"
import { getFavorites, removeFromFavorites, type FavoriteItem } from "@/lib/favorites"
import { addToCart } from "@/lib/cart"
import { formatPrice } from "@/data/products"
import { toast } from "sonner"


export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([])

  useEffect(() => {
    setFavorites(getFavorites())

    // Listen for favorites updates
    const handleFavoritesUpdate = () => {
      setFavorites(getFavorites())
    }

    window.addEventListener("favoritesUpdated", handleFavoritesUpdate)
    return () => window.removeEventListener("favoritesUpdated", handleFavoritesUpdate)
  }, [])

  const handleRemoveFromFavorites = (itemId: number, itemName: string) => {
    removeFromFavorites(itemId)
    toast("Đã xóa khỏi yêu thích", {
      description: `${itemName} đã được xóa khỏi danh sách yêu thích`,
    })
  }

  const handleAddToCart = (item: FavoriteItem) => {
    const cartItem = {
      id: item.id,
      name: item.name,
      code: item.code,
      weight: item.weight,
      sellPrice: item.sellPrice,
      buyPrice: item.buyPrice,
      image: item.image,
      category: item.category,
    }

    addToCart(cartItem)

    // Dispatch custom event to update cart icon
    window.dispatchEvent(new Event("cartUpdated"))

    toast("Đã thêm vào giỏ hàng",{
      description: `${item.name} đã được thêm vào giỏ hàng`,
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <CommonHeader currentPage="favorites" />

      {/* Spacer for fixed header */}
      <div className="h-14 sm:h-16"></div>

      {/* Page Header */}
      <div className="bg-white dark:bg-slate-800 border-b dark:border-slate-700">
        <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-6">
          <div className="flex items-center space-x-3">
            <Heart className="w-6 h-6 text-red-500" />
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-200">Sản phẩm yêu thích</h1>
            <span className="bg-red-500 text-white text-sm px-2 py-1 rounded-full">{favorites.length}</span>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-2 sm:px-4 py-6 sm:py-8">
        {favorites.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-slate-600 dark:text-slate-400 mb-2">
              Chưa có sản phẩm yêu thích
            </h2>
            <p className="text-slate-500 dark:text-slate-500 mb-6">
              Hãy thêm những sản phẩm bạn quan tâm vào danh sách yêu thích
            </p>
            <Link href="/">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">Khám phá sản phẩm</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {favorites.map((item) => (
              <Card
                key={item.id}
                className="group hover:shadow-lg dark:hover:shadow-slate-700/50 transition-all duration-300 dark:bg-slate-800 dark:border-slate-700 overflow-hidden"
              >
                <CardContent className="p-0">
                  {/* Product Image Container */}
                  <div className="relative aspect-square bg-gray-100 dark:bg-gray-800 overflow-hidden">
                    <Link href={`/product/${item.id}`} className="block w-full h-full">
                      <div className="relative w-full h-full p-2">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-contain hover:scale-105 transition-transform duration-300 cursor-pointer"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                        />
                      </div>
                    </Link>

                    {/* Remove from favorites button */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 z-10 bg-red-500 hover:bg-red-600 text-white w-8 h-8 transition-all duration-300"
                      onClick={() => handleRemoveFromFavorites(item.id, item.name)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Product Info */}
                  <div className="p-4 space-y-3">
                    {/* Product Name */}
                    <Link
                      href={`/product/${item.id}`}
                      className="block hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      <h3 className="font-semibold text-sm sm:text-base line-clamp-2 min-h-[2.5rem] sm:min-h-[3rem] dark:text-slate-200 cursor-pointer">
                        {item.name}
                      </h3>
                    </Link>

                    {/* Product Details */}
                    <div className="space-y-1">
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                        ({item.weight}) - {item.code}
                      </p>
                    </div>

                    {/* Pricing */}
                    <div className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-xs sm:text-sm font-medium text-blue-600 dark:text-blue-400">BÁN RA:</span>
                        <span className="text-sm sm:text-base font-bold text-blue-600 dark:text-blue-400">
                          {formatPrice(item.sellPrice)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs sm:text-sm font-medium text-red-600 dark:text-red-400">MUA VÀO:</span>
                        <span className="text-sm sm:text-base font-bold text-red-600 dark:text-red-400">
                          {formatPrice(item.buyPrice)}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-2">
                      <Link href={`/product/${item.id}`} className="flex-1">
                        <Button
                          variant="outline"
                          className="w-full text-xs sm:text-sm bg-transparent dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:hover:bg-slate-600 hover:bg-slate-50 transition-colors"
                        >
                          CHI TIẾT
                        </Button>
                      </Link>

                      <Button
                        size="sm"
                        className="flex-1 text-xs sm:text-sm bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white"
                        onClick={() => handleAddToCart(item)}
                      >
                        <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                        THÊM
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <CommonFooter />
    </div>
  )
}
