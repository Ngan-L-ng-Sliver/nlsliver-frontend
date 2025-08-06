"use client"

import { useEffect } from "react"
import { CommonHeader } from "@/components/common/common-header"
import { CommonFooter } from "@/components/common/common-footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Lock, Eye, Database, UserCheck } from "lucide-react"

export default function BaoMatPage() {
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
              <Lock className="w-12 h-12 text-green-600 mr-3" />
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Chính Sách Bảo Mật Thông Tin</h1>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Cam kết bảo vệ thông tin cá nhân và quyền riêng tư của khách hàng
            </p>
          </div>

          {/* Introduction */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-6 h-6 text-blue-600 mr-2" />
                Cam Kết Bảo Mật
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Ngân Lượng Silver cam kết bảo vệ thông tin cá nhân của khách hàng theo các tiêu chuẩn bảo mật cao nhất.
                Chúng tôi hiểu rằng thông tin cá nhân là tài sản quý giá và cần được bảo vệ một cách nghiêm ngặt.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Chính sách này áp dụng cho tất cả các hoạt động thu thập, xử lý, lưu trữ và sử dụng thông tin cá nhân
                tại Ngân Lượng Silver.
              </p>
            </CardContent>
          </Card>

          {/* Information Collection */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="w-6 h-6 text-purple-600 mr-2" />
                Thông Tin Chúng Tôi Thu Thập
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-blue-600">Thông Tin Cá Nhân</h4>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li>• Họ tên đầy đủ</li>
                    <li>• Số điện thoại</li>
                    <li>• Địa chỉ email</li>
                    <li>• Địa chỉ giao hàng</li>
                    <li>• Ngày sinh (nếu có)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-green-600">Thông Tin Giao Dịch</h4>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li>• Lịch sử mua hàng</li>
                    <li>• Phương thức thanh toán</li>
                    <li>• Giá trị giao dịch</li>
                    <li>• Thời gian giao dịch</li>
                    <li>• Trạng thái đơn hàng</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Usage Purpose */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Eye className="w-6 h-6 text-orange-600 mr-2" />
                Mục Đích Sử Dụng Thông Tin
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Xử Lý Đơn Hàng</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Xác nhận đơn hàng, giao hàng, thanh toán và hỗ trợ khách hàng
                  </p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Cải Thiện Dịch Vụ</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Phân tích hành vi mua sắm để cải thiện sản phẩm và dịch vụ
                  </p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Marketing</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Gửi thông tin khuyến mãi, sản phẩm mới (chỉ khi có sự đồng ý)
                  </p>
                </div>
                <div className="border-l-4 border-red-500 pl-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Tuân Thủ Pháp Luật</h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Đáp ứng yêu cầu của cơ quan pháp luật khi cần thiết
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Measures */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lock className="w-6 h-6 text-red-600 mr-2" />
                Biện Pháp Bảo Mật
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-3 mt-1">
                      <Lock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Mã Hóa Dữ Liệu</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Sử dụng SSL/TLS để mã hóa dữ liệu truyền tải
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-3 mt-1">
                      <Shield className="w-4 h-4 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Tường Lửa</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Hệ thống tường lửa bảo vệ máy chủ khỏi truy cập trái phép
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mr-3 mt-1">
                      <UserCheck className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Kiểm Soát Truy Cập</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Chỉ nhân viên được ủy quyền mới có thể truy cập dữ liệu
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mr-3 mt-1">
                      <Database className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Sao Lưu Định Kỳ</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Sao lưu dữ liệu thường xuyên để đảm bảo an toàn
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Sharing */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Chia Sẻ Thông Tin Với Bên Thứ Ba</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-4">
                <p className="text-gray-700 dark:text-gray-300 font-medium">
                  Ngân Lượng Silver cam kết KHÔNG bán, cho thuê hoặc trao đổi thông tin cá nhân của khách hàng với bên
                  thứ ba vì mục đích thương mại.
                </p>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Chúng tôi chỉ chia sẻ thông tin trong các trường hợp sau:
              </p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>• Với đối tác vận chuyển để giao hàng</li>
                <li>• Với ngân hàng/cổng thanh toán để xử lý giao dịch</li>
                <li>• Khi có yêu cầu từ cơ quan pháp luật có thẩm quyền</li>
                <li>• Khi có sự đồng ý rõ ràng từ khách hàng</li>
              </ul>
            </CardContent>
          </Card>

          {/* Customer Rights */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Quyền Của Khách Hàng</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    <span className="text-gray-700 dark:text-gray-300">Yêu cầu xem thông tin cá nhân</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-gray-700 dark:text-gray-300">Yêu cầu sửa đổi thông tin sai</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                    <span className="text-gray-700 dark:text-gray-300">Yêu cầu xóa thông tin cá nhân</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                    <span className="text-gray-700 dark:text-gray-300">Từ chối nhận email marketing</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                    <span className="text-gray-700 dark:text-gray-300">Khiếu nại về việc xử lý dữ liệu</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-gray-500 rounded-full mr-3"></div>
                    <span className="text-gray-700 dark:text-gray-300">Rút lại sự đồng ý đã cấp</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardHeader>
              <CardTitle>Liên Hệ Về Bảo Mật</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Nếu bạn có bất kỳ câu hỏi nào về chính sách bảo mật này hoặc muốn thực hiện các quyền của mình, vui lòng
                liên hệ:
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold mb-2">Bộ Phận Bảo Mật Dữ Liệu</p>
                    <p className="text-gray-700 dark:text-gray-300">📧 privacy@nganluongsilver.com</p>
                    <p className="text-gray-700 dark:text-gray-300">📞 0763 600 889</p>
                  </div>
                  <div>
                    <p className="font-semibold mb-2">Địa Chỉ</p>
                    <p className="text-gray-700 dark:text-gray-300">
                      45 Bàu Hạc 8, Thạc Gián
                      <br />
                      Thanh Khê, Đà Nẵng
                    </p>
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
