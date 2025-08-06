"use client"

import { useEffect } from "react"
import { CommonHeader } from "@/components/common/common-header"
import { CommonFooter } from "@/components/common/common-footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Database, Users, FileText, Clock, Shield, AlertTriangle } from "lucide-react"

export default function XuLyDuLieuPage() {
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
              <Database className="w-12 h-12 text-purple-600 mr-3" />
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Chính Sách Xử Lý Dữ Liệu Cá Nhân</h1>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Quy định về việc thu thập, xử lý và bảo vệ dữ liệu cá nhân theo pháp luật Việt Nam
            </p>
          </div>

          {/* Legal Basis */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="w-6 h-6 text-blue-600 mr-2" />
                Cơ Sở Pháp Lý
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Chính sách này được xây dựng dựa trên các văn bản pháp luật của Việt Nam:
              </p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>• Nghị định 13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân</li>
                <li>• Luật An toàn thông tin mạng 2015</li>
                <li>• Luật Bảo vệ quyền lợi người tiêu dùng 2010</li>
                <li>• Nghị định 52/2013/NĐ-CP về thương mại điện tử</li>
              </ul>
            </CardContent>
          </Card>

          {/* Data Categories */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-6 h-6 text-green-600 mr-2" />
                Phân Loại Dữ Liệu Cá Nhân
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-blue-600">Dữ Liệu Cơ Bản</h4>
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                      <li>• Họ và tên</li>
                      <li>• Số điện thoại</li>
                      <li>• Địa chỉ email</li>
                      <li>• Địa chỉ liên lạc</li>
                      <li>• Giới tính (tùy chọn)</li>
                    </ul>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-red-600">Dữ Liệu Nhạy Cảm</h4>
                  <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                      <li>• Thông tin tài chính</li>
                      <li>• Lịch sử giao dịch</li>
                      <li>• Số CMND/CCCD (nếu cần)</li>
                      <li>• Thông tin ngân hàng</li>
                      <li>• Dữ liệu sinh trắc học</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Processing Purposes */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-6 h-6 text-orange-600 mr-2" />
                Mục Đích Xử Lý Dữ Liệu
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-600 mb-2">1. Thực Hiện Hợp Đồng</h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                    Xử lý đơn hàng, giao hàng, thanh toán và cung cấp dịch vụ hậu mãi
                  </p>
                  <div className="text-xs text-gray-500">Cơ sở pháp lý: Thực hiện hợp đồng</div>
                </div>

                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h4 className="font-semibold text-green-600 mb-2">2. Lợi Ích Hợp Pháp</h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                    Cải thiện sản phẩm, dịch vụ, phân tích thị trường và phòng chống gian lận
                  </p>
                  <div className="text-xs text-gray-500">Cơ sở pháp lý: Lợi ích hợp pháp của doanh nghiệp</div>
                </div>

                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-600 mb-2">3. Sự Đồng Ý</h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                    Gửi thông tin marketing, khuyến mãi và các hoạt động quảng cáo
                  </p>
                  <div className="text-xs text-gray-500">Cơ sở pháp lý: Sự đồng ý của chủ thể dữ liệu</div>
                </div>

                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h4 className="font-semibold text-red-600 mb-2">4. Nghĩa Vụ Pháp Lý</h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                    Tuân thủ yêu cầu của cơ quan nhà nước, báo cáo thuế và kế toán
                  </p>
                  <div className="text-xs text-gray-500">Cơ sở pháp lý: Tuân thủ nghĩa vụ pháp lý</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Retention */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="w-6 h-6 text-indigo-600 mr-2" />
                Thời Gian Lưu Trữ Dữ Liệu
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-800">
                      <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Loại Dữ Liệu</th>
                      <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
                        Thời Gian Lưu Trữ
                      </th>
                      <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Lý Do</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Thông tin tài khoản</td>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                        Đến khi khách hàng yêu cầu xóa
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                        Cung cấp dịch vụ liên tục
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Lịch sử giao dịch</td>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">5 năm</td>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                        Yêu cầu pháp lý về kế toán
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Dữ liệu marketing</td>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                        Đến khi rút lại sự đồng ý
                      </td>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Dựa trên sự đồng ý</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Log hệ thống</td>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">12 tháng</td>
                      <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                        Bảo mật và khắc phục sự cố
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Data Subject Rights */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Quyền Của Chủ Thể Dữ Liệu</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-3 mt-1">
                      <span className="text-blue-600 dark:text-blue-400 text-sm font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Quyền Được Thông Báo</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Được thông báo về việc xử lý dữ liệu cá nhân
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-3 mt-1">
                      <span className="text-green-600 dark:text-green-400 text-sm font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Quyền Truy Cập</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Yêu cầu xem dữ liệu cá nhân đang được xử lý
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mr-3 mt-1">
                      <span className="text-purple-600 dark:text-purple-400 text-sm font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Quyền Sửa Đổi</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Yêu cầu sửa đổi dữ liệu cá nhân không chính xác
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mr-3 mt-1">
                      <span className="text-red-600 dark:text-red-400 text-sm font-bold">4</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Quyền Xóa</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Yêu cầu xóa dữ liệu cá nhân trong một số trường hợp
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mr-3 mt-1">
                      <span className="text-orange-600 dark:text-orange-400 text-sm font-bold">5</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Quyền Hạn Chế</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Yêu cầu hạn chế việc xử lý dữ liệu cá nhân
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-gray-100 dark:bg-gray-900 rounded-full flex items-center justify-center mr-3 mt-1">
                      <span className="text-gray-600 dark:text-gray-400 text-sm font-bold">6</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Quyền Khiếu Nại</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Khiếu nại lên cơ quan có thẩm quyền</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Breach */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="w-6 h-6 text-red-600 mr-2" />
                Xử Lý Sự Cố Dữ Liệu
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
                <p className="text-gray-700 dark:text-gray-300 font-medium mb-2">Cam kết xử lý sự cố trong 72 giờ</p>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Trong trường hợp xảy ra sự cố rò rỉ dữ liệu, chúng tôi cam kết thông báo cho cơ quan chức năng và
                  khách hàng bị ảnh hưởng trong vòng 72 giờ.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-red-600 dark:text-red-400 font-bold">1</span>
                  </div>
                  <h4 className="font-semibold text-sm">Phát Hiện</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-300">Hệ thống giám sát 24/7</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-yellow-600 dark:text-yellow-400 font-bold">2</span>
                  </div>
                  <h4 className="font-semibold text-sm">Ứng Phó</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-300">Ngăn chặn và khắc phục</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-green-600 dark:text-green-400 font-bold">3</span>
                  </div>
                  <h4 className="font-semibold text-sm">Thông Báo</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-300">Báo cáo và thông báo</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardHeader>
              <CardTitle>Liên Hệ Về Xử Lý Dữ Liệu</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Người Bảo Vệ Dữ Liệu (DPO)</h4>
                    <div className="space-y-2 text-gray-700 dark:text-gray-300">
                      <p>📧 dpo@nganluongsilver.com</p>
                      <p>📞 0763 600 889 (ext. 101)</p>
                      <p>🕒 8:00 - 18:00 (Thứ 2 - Thứ 7)</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Địa Chỉ Liên Hệ</h4>
                    <div className="space-y-2 text-gray-700 dark:text-gray-300">
                      <p>45 Bàu Hạc 8, Thạc Gián</p>
                      <p>Thanh Khê, Đà Nẵng</p>
                      <p>Việt Nam</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <strong>Lưu ý:</strong> Chúng tôi sẽ phản hồi yêu cầu của bạn trong vòng 30 ngày kể từ khi nhận được
                    yêu cầu hợp lệ.
                  </p>
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
