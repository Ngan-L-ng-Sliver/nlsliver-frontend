"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { MultiSelect } from "./multi-select"

interface FilterState {
  brands: string[]
  priceRanges: string[]
  silverTypes: string[]
  statuses: string[]
  showPromotions: boolean
}

interface FiltersSectionProps {
  filters: FilterState
  brands: string[]
  priceRanges: string[]
  silverTypes: string[]
  statuses: string[]
  sortBy: string
  onBrandChange: (brand: string, checked: boolean) => void
  onPriceRangeChange: (priceRange: string, checked: boolean) => void
  onSilverTypeChange: (silverType: string, checked: boolean) => void
  onStatusChange: (status: string, checked: boolean) => void
  onPromotionChange: (checked: boolean) => void
  onSortChange: (value: string) => void
}

export function FiltersSection({
  filters,
  brands,
  priceRanges,
  silverTypes,
  statuses,
  sortBy,
  onBrandChange,
  onPriceRangeChange,
  onSilverTypeChange,
  onStatusChange,
  onPromotionChange,
  onSortChange,
}: FiltersSectionProps) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8 shadow-sm border dark:border-slate-700">
      {/* Header row with Bộ lọc and Sắp xếp titles */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 mb-3 sm:mb-4">
        <div className="lg:col-span-3">
          <h3 className="text-sm sm:text-base font-medium text-slate-700 dark:text-slate-300">Bộ lọc:</h3>
        </div>
        <div className="lg:col-span-1">
          <h3 className="text-sm sm:text-base font-medium text-slate-700 dark:text-slate-300">Sắp xếp:</h3>
        </div>
      </div>

      {/* Filter controls row */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Filter multi-selects - 3 columns */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {/*<div>
              <label className="block text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 mb-1 sm:mb-2">
                Thương hiệu
              </label>
              <MultiSelect
                options={brands}
                selectedValues={filters.brands}
                onSelectionChange={onBrandChange}
                placeholder="Thương hiệu"
              />
            </div>*/}

            <div>
              <label className="block text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 mb-1 sm:mb-2">
                Giá
              </label>
              <MultiSelect
                options={priceRanges}
                selectedValues={filters.priceRanges}
                onSelectionChange={onPriceRangeChange}
                placeholder="Giá"
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 mb-1 sm:mb-2">
                Loại bạc
              </label>
              <MultiSelect
                options={silverTypes}
                selectedValues={filters.silverTypes}
                onSelectionChange={onSilverTypeChange}
                placeholder="Loại bạc"
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 mb-1 sm:mb-2">
                Trạng thái
              </label>
              <MultiSelect
                options={statuses.map((status) => {
                  switch (status) {
                    case "available":
                      return "Còn hàng"
                    case "pre_order":
                      return "Đặt hàng"
                    case "out_of_stock":
                      return "Hết hàng"
                    case "discontinued":
                      return "Dừng bán"
                    default:
                      return "Không xác định"
                  }
                })}
                selectedValues={filters.statuses.map((status) => {
                  switch (status) {
                    case "available":
                      return "Còn hàng"
                    case "pre_order":
                      return "Đặt hàng"
                    case "out_of_stock":
                      return "Hết hàng"
                    case "discontinued":
                      return "Dừng bán"
                    default:
                      return "Không xác định"
                  }
                })}
                onSelectionChange={(displayStatus: string, checked: boolean) => {
                  let actualStatus = displayStatus
                  switch (displayStatus) {
                    case "Còn hàng":
                      actualStatus = "available"
                      break
                    case "Đặt hàng":
                      actualStatus = "pre_order"
                      break
                    case "Hết hàng":
                      actualStatus = "out_of_stock"
                      break
                    case "Dừng bán":
                      actualStatus = "discontinued"
                      break
                    default:
                      actualStatus = displayStatus
                  }
                  onStatusChange(actualStatus, checked)
                }}
                placeholder="Trạng thái"
              />
            </div>
          </div>
        </div>

        {/* Sort dropdown - 1 column */}
        <div className="lg:col-span-1">
          <label className="block text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-400 mb-1 sm:mb-2">
            Sản phẩm
          </label>
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="h-9 sm:h-10 text-xs sm:text-sm dark:bg-slate-700 dark:border-slate-600 dark:text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="dark:bg-slate-700 dark:border-slate-600">
              <SelectItem value="newest" className="dark:text-white dark:hover:bg-slate-600">
                Sản phẩm mới nhất
              </SelectItem>
              <SelectItem value="name" className="dark:text-white dark:hover:bg-slate-600">
                Tên A-Z
              </SelectItem>
              <SelectItem value="price-low" className="dark:text-white dark:hover:bg-slate-600">
                Giá thấp đến cao
              </SelectItem>
              <SelectItem value="price-high" className="dark:text-white dark:hover:bg-slate-600">
                Giá cao đến thấp
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Khuyến mãi checkbox */}
      <div className="flex items-center space-x-2 mt-3 sm:mt-4">
        <Checkbox
          id="promotions"
          checked={filters.showPromotions}
          onCheckedChange={onPromotionChange}
          className="dark:border-slate-600"
        />
        <label
          htmlFor="promotions"
          className="text-xs sm:text-sm font-medium text-blue-600 dark:text-blue-400 cursor-pointer"
        >
          KHUYẾN MÃI
        </label>
      </div>
    </div>
  )
}
