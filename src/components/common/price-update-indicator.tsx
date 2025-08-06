"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RefreshCw, Clock, CheckCircle, AlertCircle } from "lucide-react"
import { usePriceUpdater } from "@/hooks/use-price-updater"
import { products } from "@/data/products"

export function PriceUpdateIndicator() {
  const { isUpdating, lastUpdate, updateCount, error, updatePrices } = usePriceUpdater()
  const [showIndicator, setShowIndicator] = useState(false)

  // Show indicator only when updating or when there's an error
  useEffect(() => {
    setShowIndicator(isUpdating || !!error)
  }, [isUpdating, error])

  // Auto-hide after successful update
  useEffect(() => {
    if (!isUpdating && !error && updateCount > 0) {
      const timer = setTimeout(() => {
        setShowIndicator(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [isUpdating, error, updateCount])

  const handleManualUpdate = () => {
    setShowIndicator(true)
    updatePrices(products)
  }

  const formatLastUpdate = (date: Date | null) => {
    if (!date) return "Chưa cập nhật"
    const now = new Date()
    const diffMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

    if (diffMinutes < 1) return "Vừa xong"
    if (diffMinutes < 60) return `${diffMinutes} phút trước`
    if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)} giờ trước`
    return date.toLocaleDateString("vi-VN")
  }

  if (!showIndicator && !isUpdating) {
    // Hidden manual update button (for admin/testing)
    return (
      <div className="fixed bottom-4 left-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={handleManualUpdate}
          className="opacity-20 hover:opacity-100 transition-opacity bg-transparent"
          title="Cập nhật giá thủ công"
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border p-3 min-w-[200px]">
        <div className="flex items-center gap-2 mb-2">
          {isUpdating && (
            <>
              <RefreshCw className="h-4 w-4 animate-spin text-blue-500" />
              <span className="text-sm font-medium">Đang cập nhật giá...</span>
            </>
          )}

          {!isUpdating && error && (
            <>
              <AlertCircle className="h-4 w-4 text-red-500" />
              <span className="text-sm font-medium text-red-600">Lỗi cập nhật</span>
            </>
          )}

          {!isUpdating && !error && updateCount > 0 && (
            <>
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium text-green-600">Đã cập nhật</span>
            </>
          )}
        </div>

        {!isUpdating && (
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Clock className="h-3 w-3" />
            <span>{formatLastUpdate(lastUpdate)}</span>
            {updateCount > 0 && <Badge variant="secondary">{updateCount}</Badge>}
          </div>
        )}

        {error && (
          <div className="mt-2">
            <p className="text-xs text-red-600 mb-2">{error}</p>
            <Button size="sm" variant="outline" onClick={handleManualUpdate} className="w-full bg-transparent">
              Thử lại
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
