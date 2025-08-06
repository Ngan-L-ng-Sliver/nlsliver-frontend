"use client"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface FilterState {
  brands: string[]
  priceRanges: string[]
  silverTypes: string[]
  statuses: string[]
  showPromotions: boolean
}

interface ActiveFiltersDisplayProps {
  filters: FilterState
  onClearFilters: () => void
}

export function ActiveFiltersDisplay({ filters, onClearFilters }: ActiveFiltersDisplayProps) {
  const hasActiveFilters =
    filters.brands.length > 0 ||
    filters.priceRanges.length > 0 ||
    filters.silverTypes.length > 0 ||
    filters.statuses.length > 0 ||
    filters.showPromotions

  if (!hasActiveFilters) return null

  const getStatusDisplayText = (status: string): string => {
    switch (status) {
      case "available":
        return "Còn hàng"
      case "out_of_stock":
        return "Hết hàng"
      case "discontinued":
        return "Dừng bán"
      default:
        return "Không xác định"
    }
  }

  return (
    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        <span className="text-xs sm:text-sm font-medium text-blue-800 dark:text-blue-200">Bộ lọc đang áp dụng:</span>

        {/* Brand filters */}
        {/*{filters.brands.map((brand) => (
          <Badge key={brand} variant="secondary" className="text-xs">
            Thương hiệu: {brand}
          </Badge>
        ))}*/}

        {/* Price range filters */}
        {filters.priceRanges.map((range) => (
          <Badge key={range} variant="secondary" className="text-xs">
            Giá: {range}
          </Badge>
        ))}

        {/* Silver type filters */}
        {filters.silverTypes.map((type) => (
          <Badge key={type} variant="secondary" className="text-xs">
            Loại: {type}
          </Badge>
        ))}

        {/* Status filters */}
        {filters.statuses.map((status) => (
          <Badge key={status} variant="secondary" className="text-xs">
            Trạng thái: {getStatusDisplayText(status)}
          </Badge>
        ))}

        {/* Promotion filter */}
        {filters.showPromotions && (
          <Badge variant="secondary" className="text-xs">
            Khuyến mãi
          </Badge>
        )}

        <Button
          variant="ghost"
          size="sm"
          onClick={onClearFilters}
          className="h-6 px-2 text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
        >
          <X className="h-3 w-3 mr-1" />
          Xóa tất cả
        </Button>
      </div>
    </div>
  )
}
