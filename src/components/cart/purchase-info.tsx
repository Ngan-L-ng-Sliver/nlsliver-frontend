import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CreditCard, Phone, MapPin } from "lucide-react"

export function PurchaseInfo() {
  return (
    <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
      <CardHeader>
        <CardTitle className="flex items-center text-lg text-blue-800 dark:text-blue-200">
          <CreditCard className="w-5 h-5 mr-2" />
          Thông tin thanh toán
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Chuyển khoản ngân hàng:</h4>
            <div className="space-y-1 text-blue-700 dark:text-blue-300">
              <p>
                <strong>Ngân hàng:</strong> MB Bank (Quân Đội)
              </p>
              <p>
                <strong>Số tài khoản:</strong> 5552223456
              </p>
              <p>
                <strong>Chủ tài khoản:</strong> CONG TY TNHH MTV VANG BAC NGAN LUONG
              </p>
              <p>
                <strong>Chi nhánh:</strong> Đà Nẵng
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2 flex items-center">
              <Phone className="w-4 h-4 mr-1" />
              Liên hệ:
            </h4>
            <div className="space-y-1 text-blue-700 dark:text-blue-300">
              <p>
                <strong>Hotline:</strong> 0763 600 889
              </p>
              <p>
                <strong>Zalo:</strong> 0763 600 889
              </p>
              <p>
                <strong>Email:</strong> nganluongsilver@gmail.com
              </p>
            </div>
          </div>
        </div>

        <div className="pt-2 border-t border-blue-200 dark:border-blue-700">
          <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2 flex items-center">
            <MapPin className="w-4 h-4 mr-1" />
            Địa chỉ cửa hàng:
          </h4>
          <p className="text-blue-700 dark:text-blue-300">45 Bàu Hạc 8, Thanh Khê, Đà Nẵng</p>
          <p className="text-blue-700 dark:text-blue-300 mt-1">
            <strong>Giờ làm việc:</strong> 8:00 - 18:00 (Thứ 2 - Thứ 7)
          </p>
        </div>

        <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
          <p className="text-blue-800 dark:text-blue-200 text-xs">
            <strong>Lưu ý:</strong> Vui lòng ghi rõ họ tên và số điện thoại khi chuyển khoản để chúng tôi xác nhận đơn
            hàng nhanh chóng.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
