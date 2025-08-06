"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface MobileSearchProps {
  searchTerm: string
  onSearchChange: (value: string) => void
}

export function MobileSearch({ searchTerm, onSearchChange }: MobileSearchProps) {
  return (
    <div className="lg:hidden mb-4 sm:mb-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
        <Input
          placeholder="Tìm kiếm sản phẩm..."
          className="pl-10 h-10 sm:h-11 text-sm sm:text-base dark:bg-slate-800 dark:border-slate-700 dark:text-white"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </div>
  )
}
