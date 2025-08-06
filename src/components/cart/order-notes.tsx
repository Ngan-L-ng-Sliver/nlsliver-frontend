import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { FileText } from "lucide-react"
import { Controller } from "react-hook-form"
import type { OrderNotesProps } from "./types"

export function OrderNotes({ form }: OrderNotesProps) {
  const {
    register,
    control,
    formState: { errors },
  } = form

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-base sm:text-lg">
          <FileText className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
          Ghi chú và điều khoản
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="note" className="text-sm">
            Ghi chú đơn hàng
          </Label>
          <Textarea
            id="note"
            {...register("note")}
            placeholder="Ghi chú thêm về đơn hàng (tùy chọn)..."
            className="mt-1 text-sm"
            rows={3}
          />
          {errors.note && <p className="text-red-500 text-xs mt-1">{errors.note.message}</p>}
        </div>

        <div className="space-y-3 pt-4 border-t">
          <div className="flex items-start space-x-2">
            <Controller
              name="agreeTerms"
              control={control}
              render={({ field }) => (
                <Checkbox id="agreeTerms" checked={field.value} onCheckedChange={field.onChange} className="mt-1" />
              )}
            />
            <Label htmlFor="agreeTerms" className="text-xs sm:text-sm cursor-pointer leading-relaxed">
              Tôi đồng ý với{" "}
              <a href="/chinh-sach/dieu-khoan" className="text-blue-600 hover:underline">
                điều khoản sử dụng
              </a>{" "}
              và{" "}
              <a href="/chinh-sach/bao-mat" className="text-blue-600 hover:underline">
                chính sách bảo mật
              </a>{" "}
              của Ngân Lượng Silver *
            </Label>
          </div>
          {errors.agreeTerms && <p className="text-red-500 text-xs">{errors.agreeTerms.message}</p>}

          <div className="flex items-start space-x-2">
            <Controller
              name="agreePromotion"
              control={control}
              render={({ field }) => (
                <Checkbox id="agreePromotion" checked={field.value} onCheckedChange={field.onChange} className="mt-1" />
              )}
            />
            <Label htmlFor="agreePromotion" className="text-xs sm:text-sm cursor-pointer leading-relaxed">
              Tôi đồng ý nhận thông tin khuyến mãi và ưu đãi từ Ngân Lượng Silver
            </Label>
          </div>

          <div className="flex items-start space-x-2">
            <Controller
              name="agreeCompany"
              control={control}
              render={({ field }) => (
                <Checkbox id="agreeCompany" checked={field.value} onCheckedChange={field.onChange} className="mt-1" />
              )}
            />
            <Label htmlFor="agreeCompany" className="text-xs sm:text-sm cursor-pointer leading-relaxed">
              Tôi đồng ý cho Ngân Lượng Silver thu thập và xử lý thông tin cá nhân để phục vụ việc mua hàng
            </Label>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
