"use client"

import { useEffect } from "react"
import { CommonHeader } from "@/components/common/common-header"
import { CommonFooter } from "@/components/common/common-footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Clock, CheckCircle, AlertCircle } from "lucide-react"

export default function BaoHanhPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <CommonHeader />

      <main className="container mx-auto px-4 py-8 pt-24">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Shield className="w-12 h-12 text-blue-600 mr-3" />
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Chính Sách Bảo Hành</h1>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Cam kết chất lượng và dịch vụ hậu mãi tốt nhất cho khách hàng
            </p>
          </div>

          {/* Overview */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="w-6 h-6 text-green-600 mr-2" />
                Tổng Quan Chính Sách
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Ngân Lượng Silver cam kết cung cấp sản phẩm bạc chất lượng cao và dịch vụ bảo hành toàn diện. Chúng tôi
                hiểu rằng sự tin tưởng của khách hàng là tài sản quý giá nhất, vì vậy mọi sản phẩm đều được bảo hành
                theo tiêu chuẩn nghiêm ngặt.
              </p>
            </CardContent>
          </Card>

          {/* Warranty Terms */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 text-blue-600 mr-2" />
                  Thời Gian Bảo Hành
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Bạc nguyên chất 999</h4>
                  <p className="text-gray-600 dark:text-gray-300">Bảo hành vĩnh viễn về độ tinh khiết</p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Trang sức bạc</h4>
                  <p className="text-gray-600 dark:text-gray-300">Bảo hành 12 tháng về chất lượng gia công</p>
                </div>
                <div className="border-l-4 border-yellow-500 pl-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Bạc thỏi, miếng</h4>
                  <p className="text-gray-600 dark:text-gray-300">Bảo hành vĩnh viễn về trọng lượng và độ tinh khiết</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="w-5 h-5 text-green-600 mr-2" />
                  Phạm Vi Bảo Hành
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">Lỗi về độ tinh khiết bạc</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">Sai lệch trọng lượng</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">Lỗi gia công, chế tác</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">Bảo hành miễn phí lần đầu</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Warranty Process */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Quy Trình Bảo Hành</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-blue-600 dark:text-blue-400 font-bold">1</span>
                  </div>
                  <h4 className="font-semibold mb-2">Liên Hệ</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Gọi hotline hoặc đến cửa hàng với sản phẩm cần bảo hành
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-green-600 dark:text-green-400 font-bold">2</span>
                  </div>
                  <h4 className="font-semibold mb-2">Kiểm Tra</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Chuyên viên kiểm tra và xác định tình trạng sản phẩm
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-yellow-600 dark:text-yellow-400 font-bold">3</span>
                  </div>
                  <h4 className="font-semibold mb-2">Xử Lý</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Sửa chữa, thay thế hoặc hoàn tiền theo chính sách
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-purple-600 dark:text-purple-400 font-bold">4</span>
                  </div>
                  <h4 className="font-semibold mb-2">Hoàn Thành</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Giao sản phẩm đã được bảo hành cho khách hàng
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Exclusions */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertCircle className="w-6 h-6 text-red-600 mr-2" />
                Trường Hợp Không Bảo Hành
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span className="text-gray-700 dark:text-gray-300">
                      Hư hỏng do tác động vật lý mạnh (va đập, rơi vỡ)
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span className="text-gray-700 dark:text-gray-300">Tự ý sửa chữa, cải tạo sản phẩm</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span className="text-gray-700 dark:text-gray-300">Hao mòn tự nhiên theo thời gian</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span className="text-gray-700 dark:text-gray-300">
                      Không có hóa đơn mua hàng hoặc phiếu bảo hành
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span className="text-gray-700 dark:text-gray-300">
                      Sản phẩm không phải do Ngân Lượng Silver cung cấp
                    </span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card>
            <CardHeader>
              <CardTitle>Thông Tin Liên Hệ Bảo Hành</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Cửa Hàng Chính</h4>
                  <div className="space-y-2 text-gray-700 dark:text-gray-300">
                    <p>📍 45 Bàu Hạc 8, Thanh Khê, Đà Nẵng</p>
                    <p>📞 0763 600 889</p>
                    <p>🕒 8:00 - 18:00 (Thứ 2 - Thứ 7)</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Hỗ Trợ Online</h4>
                  <div className="space-y-2 text-gray-700 dark:text-gray-300">
                    <p>📧 baohanh@nganluongsilver.com</p>
                    <p>💬 Chat qua Zalo: Ngân Lượng Silver</p>
                    <p>📱 Messenger: @nganluongsilver</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <CommonFooter />
    </div>
  )
}
