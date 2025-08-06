"use client"
import Image from "next/image"
import { Minus, Plus, Trash2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatPrice } from "@/data/products"
import type { CartItem } from "@/lib/cart"

interface CartItemsProps {
  cartItems: CartItem[]
  onQuantityChange: (productId: number, newQuantity: number) => void
  onRemoveItem: (productId: number) => void
  onClearCart: () => void
}

export function CartItems({ cartItems, onQuantityChange, onRemoveItem, onClearCart }: CartItemsProps) {
  const handleQuantityInputChange = (productId: number, value: string) => {
    const numValue = Number.parseInt(value)
    if (!isNaN(numValue) && numValue >= 1 && numValue <= 99999) {
      onQuantityChange(productId, numValue)
    } else if (value === "") {
      // Allow empty input temporarily, will default to 1 on blur
      return
    }
  }

  const handleInputBlur = (productId: number, value: string) => {
    const numValue = Number.parseInt(value)
    if (isNaN(numValue) || numValue < 1) {
      onQuantityChange(productId, 1)
    }
  }

  return (
    <Card className="dark:bg-slate-800 dark:border-slate-700">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg sm:text-xl dark:text-slate-200">Giỏ hàng ({cartItems.length} sản phẩm)</CardTitle>
        {cartItems.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearCart}
            className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20"
          >
            <Trash2 className="w-4 h-4 mr-1" />
            Xóa tất cả
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row gap-4 p-3 sm:p-4 border border-gray-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700/50"
          >
            {/* Product Image */}
            <div className="flex-shrink-0 mx-auto sm:mx-0">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                width={80}
                height={80}
                className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg"
              />
            </div>

            {/* Product Info */}
            <div className="flex-1 space-y-2 text-center sm:text-left">
              <div>
                <h3 className="font-semibold text-slate-800 dark:text-slate-200 text-sm sm:text-base line-clamp-2">
                  {item.name}
                </h3>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-1">
                  <Badge variant="secondary" className="text-xs dark:bg-slate-600 dark:text-slate-300">
                    {item.category}
                  </Badge>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {item.weight} - {item.code}
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-center sm:justify-start space-x-4 text-sm">
                  <div>
                    <span className="text-slate-600 dark:text-slate-400">Bán ra: </span>
                    <span className="font-semibold text-blue-600 dark:text-blue-400">
                      {formatPrice(item.sellPrice)}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-600 dark:text-slate-400">Mua vào: </span>
                    <span className="font-semibold text-red-600 dark:text-red-400">{formatPrice(item.buyPrice)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quantity Controls and Remove Button */}
            <div className="flex flex-col items-center space-y-3 sm:space-y-4">
              {/* Quantity Controls */}
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 dark:bg-slate-600 dark:border-slate-500 dark:text-white dark:hover:bg-slate-500 bg-transparent"
                  onClick={() => onQuantityChange(item.id, Math.max(1, item.quantity - 1))}
                  disabled={item.quantity <= 1}
                >
                  <Minus className="w-3 h-3" />
                </Button>

                <Input
                  type="number"
                  min="1"
                  max="99999"
                  value={item.quantity}
                  onChange={(e) => handleQuantityInputChange(item.id, e.target.value)}
                  onBlur={(e) => handleInputBlur(item.id, e.target.value)}
                  className="w-16 h-8 text-center text-sm dark:bg-slate-600 dark:border-slate-500 dark:text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />

                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 dark:bg-slate-600 dark:border-slate-500 dark:text-white dark:hover:bg-slate-500 bg-transparent"
                  onClick={() => onQuantityChange(item.id, Math.min(99999, item.quantity + 1))}
                  disabled={item.quantity >= 99999}
                >
                  <Plus className="w-3 h-3" />
                </Button>
              </div>

              {/* Remove Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemoveItem(item.id)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20 h-8 px-2"
              >
                <X className="w-4 h-4 mr-1" />
                <span className="text-xs">Xóa</span>
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
