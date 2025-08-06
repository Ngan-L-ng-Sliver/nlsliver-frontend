"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tag } from "lucide-react"
import type { CouponSectionProps } from "./types"

export function CouponSection({ couponCode, setCouponCode, onApplyCoupon }: CouponSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-base sm:text-lg">
          <Tag className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
          Mã giảm giá
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            placeholder="Nhập mã giảm giá"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="flex-1 h-10 text-sm"
          />
          <Button
            onClick={onApplyCoupon}
            variant="outline"
            className="h-10 px-4 text-sm whitespace-nowrap bg-transparent"
          >
            Áp dụng
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
