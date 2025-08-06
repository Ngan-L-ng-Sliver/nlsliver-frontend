import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Receipt } from "lucide-react"
import type { OrderSummaryProps } from "./types"

export function OrderSummary({ subtotal, shippingFee, discount, total }: OrderSummaryProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-base sm:text-lg">
          <Receipt className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
          Tổng đơn hàng
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-slate-600 dark:text-slate-400">Tạm tính:</span>
          <span className="font-medium">{formatCurrency(subtotal)}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-slate-600 dark:text-slate-400">Phí vận chuyển:</span>
          <span className="font-medium text-orange-600">Thương lượng</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-slate-600 dark:text-slate-400">Giảm giá:</span>
            <span className="font-medium text-green-600">-{formatCurrency(discount)}</span>
          </div>
        )}

        <Separator />

        <div className="flex justify-between text-base sm:text-lg font-bold">
          <span>Tạm tính:</span>
          <span className="text-red-600">{formatCurrency(total)}</span>
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400 text-center sm:text-left">
          (Giá tham khảo đã bao gồm VAT)
        </p>

        <p className="text-xs text-orange-600 dark:text-orange-400 text-center sm:text-left">
          *Phí vận chuyển sẽ được thương lượng với nhân viên bán hàng
        </p>
      </CardContent>
    </Card>
  )
}
