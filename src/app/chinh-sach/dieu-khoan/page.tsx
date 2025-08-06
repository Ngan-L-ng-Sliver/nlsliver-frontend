"use client"

import { useEffect } from "react"
import { CommonHeader } from "@/components/common/common-header"
import { CommonFooter } from "@/components/common/common-footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Scale, AlertCircle, CheckCircle, XCircle, Info } from "lucide-react"

export default function DieuKhoanPage() {
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
              <Scale className="w-12 h-12 text-indigo-600 mr-3" />
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Điều Khoản Sử Dụng</h1>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Quy định và điều kiện sử dụng dịch vụ tại Ngân Lượng Silver
            </p>
          </div>

          {/* Introduction */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="w-6 h-6 text-blue-600 mr-2" />
                Điều Khoản Chung
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Chào mừng bạn đến với Ngân Lượng Silver. Bằng việc truy cập và sử dụng website, dịch vụ của chúng tôi,
                  bạn đồng ý tuân thủ và bị ràng buộc bởi các điều khoản và điều kiện sau đây.
                </p>
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <p className="text-gray-700 dark:text-gray-300 font-medium">
                    <strong>Lưu ý quan trọng:</strong> Nếu bạn không đồng ý với bất kỳ điều khoản nào, vui lòng không sử
                    dụng dịch vụ của chúng tôi.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Service Terms */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="w-6 h-6 text-green-600 mr-2" />
                Điều Khoản Dịch Vụ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-blue-600 mb-3">1. Phạm Vi Dịch Vụ</h4>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                    <li>• Mua bán bạc nguyên chất, trang sức bạc</li>
                    <li>• Tư vấn đầu tư bạc</li>
                    <li>• Dịch vụ giao hàng tận nơi</li>
                    <li>• Dịch vụ bảo hành và hậu mãi</li>
                    <li>• Thông tin giá bạc thời gian thực</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-green-600 mb-3">2. Đăng Ký Tài Khoản</h4>
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                      <li>• Cung cấp thông tin chính xác và đầy đủ</li>
                      <li>• Bảo mật thông tin đăng nhập</li>
                      <li>• Chịu trách nhiệm về mọi hoạt động trong tài khoản</li>
                      <li>• Thông báo ngay khi phát hiện truy cập trái phép</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-purple-600 mb-3">3. Quy Định Giao Dịch</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <h5 className="font-medium mb-2">Đơn Hàng</h5>
                      <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                        <li>• Xác nhận đơn hàng qua email/SMS</li>
                        <li>• Giá cả có thể thay đổi theo thị trường</li>
                        <li>• Đơn hàng có thể bị hủy nếu hết hàng</li>
                      </ul>
                    </div>
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <h5 className="font-medium mb-2">Thanh Toán</h5>
                      <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                        <li>• Thanh toán trước khi giao hàng</li>
                        <li>• Hỗ trợ nhiều phương thức thanh toán</li>
                        <li>• Hóa đơn VAT theo yêu cầu</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* User Responsibilities */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Info className="w-6 h-6 text-orange-600 mr-2" />
                Trách Nhiệm Người Dùng
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-green-600 mb-3 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Được Phép
                  </h4>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li>• Sử dụng dịch vụ cho mục đích hợp pháp</li>
                    <li>• Cung cấp thông tin chính xác</li>
                    <li>• Tuân thủ các quy định của pháp luật</li>
                    <li>• Báo cáo các vấn đề kỹ thuật</li>
                    <li>• Đánh giá và phản hồi dịch vụ</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-red-600 mb-3 flex items-center">
                    <XCircle className="w-5 h-5 mr-2" />
                    Nghiêm Cấm
                  </h4>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li>• Sử dụng cho mục đích bất hợp pháp</li>
                    <li>• Tấn công, hack hệ thống</li>
                    <li>• Spam, gửi thông tin rác</li>
                    <li>• Sao chép, sử dụng trái phép nội dung</li>
                    <li>• Giả mạo thông tin, lừa đảo</li>
                    <li>• Chia sẻ tài khoản cho người khác</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pricing and Payment */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Giá Cả và Thanh Toán</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Lưu Ý Về Giá Cả</h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Giá bạc thay đổi liên tục theo thị trường quốc tế. Giá hiển thị trên website chỉ mang tính chất tham
                    khảo. Giá chính thức sẽ được xác nhận khi đặt hàng.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <h5 className="font-semibold mb-2">Phương Thức Thanh Toán</h5>
                    <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>• Tiền mặt khi nhận hàng</li>
                      <li>• Chuyển khoản ngân hàng</li>
                      <li>• Ví điện tử (Momo, ZaloPay)</li>
                      <li>• Thẻ tín dụng/ghi nợ</li>
                    </ul>
                  </div>
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <h5 className="font-semibold mb-2">Chính Sách Hoàn Trả</h5>
                    <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>• Hoàn trả trong 7 ngày</li>
                      <li>• Sản phẩm còn nguyên seal</li>
                      <li>• Có hóa đơn mua hàng</li>
                      <li>• Phí vận chuyển khách trả</li>
                    </ul>
                  </div>
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <h5 className="font-semibold mb-2">Thuế và Phí</h5>
                    <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>• VAT 10% (nếu xuất hóa đơn)</li>
                      <li>• Phí giao hàng theo khu vực</li>
                      <li>• Phí bảo hiểm (tùy chọn)</li>
                      <li>• Miễn phí từ 10 triệu VNĐ</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Liability */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertCircle className="w-6 h-6 text-red-600 mr-2" />
                Giới Hạn Trách Nhiệm
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                  <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">Tuyên Bố Miễn Trừ Trách Nhiệm</h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Ngân Lượng Silver không chịu trách nhiệm về các thiệt hại gián tiếp, ngẫu nhiên hoặc do hậu quả phát
                    sinh từ việc sử dụng dịch vụ.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-semibold mb-2">Chúng Tôi Chịu Trách Nhiệm</h5>
                    <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>• Chất lượng sản phẩm như cam kết</li>
                      <li>• Giao hàng đúng thời gian</li>
                      <li>• Bảo mật thông tin khách hàng</li>
                      <li>• Hỗ trợ kỹ thuật và tư vấn</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold mb-2">Chúng Tôi Không Chịu Trách Nhiệm</h5>
                    <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>• Biến động giá bạc trên thị trường</li>
                      <li>• Sự cố do nhà cung cấp dịch vụ</li>
                      <li>• Thiệt hại do sử dụng sai mục đích</li>
                      <li>• Force majeure (thiên tai, dịch bệnh)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Intellectual Property */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Quyền Sở Hữu Trí Tuệ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-700 dark:text-gray-300">
                  Tất cả nội dung trên website bao gồm văn bản, hình ảnh, logo, thiết kế đều thuộc quyền sở hữu của Ngân
                  Lượng Silver hoặc được cấp phép sử dụng hợp pháp.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <h5 className="font-semibold mb-2 text-green-600">Được Phép</h5>
                    <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>• Xem và sử dụng cho mục đích cá nhân</li>
                      <li>• In ấn thông tin sản phẩm</li>
                      <li>• Chia sẻ link website</li>
                    </ul>
                  </div>
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <h5 className="font-semibold mb-2 text-red-600">Nghiêm Cấm</h5>
                    <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <li>• Sao chép, phân phối nội dung</li>
                      <li>• Sử dụng logo, thương hiệu</li>
                      <li>• Tạo website tương tự</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Termination */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Chấm Dứt Dịch Vụ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-700 dark:text-gray-300">
                  Chúng tôi có quyền tạm ngừng hoặc chấm dứt dịch vụ mà không cần thông báo trước trong các trường hợp
                  sau:
                </p>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li>• Vi phạm điều khoản sử dụng</li>
                    <li>• Hoạt động bất hợp pháp</li>
                    <li>• Gây tổn hại đến hệ thống</li>
                    <li>• Không thanh toán đúng hạn</li>
                    <li>• Yêu cầu từ cơ quan pháp luật</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Changes to Terms */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Thay Đổi Điều Khoản</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  Ngân Lượng Silver có quyền thay đổi, cập nhật các điều khoản này bất kỳ lúc nào. Các thay đổi sẽ có
                  hiệu lực ngay khi được đăng tải trên website.
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  <strong>Khuyến nghị:</strong> Vui lòng kiểm tra điều khoản định kỳ để cập nhật những thay đổi mới
                  nhất.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact and Dispute */}
          <Card>
            <CardHeader>
              <CardTitle>Giải Quyết Tranh Chấp</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">Quy Trình Giải Quyết</h4>
                  <div className="grid md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-blue-600 dark:text-blue-400 font-bold">1</span>
                      </div>
                      <h5 className="font-semibold text-sm">Thương Lượng</h5>
                      <p className="text-xs text-gray-600 dark:text-gray-300">Liên hệ trực tiếp để giải quyết</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-green-600 dark:text-green-400 font-bold">2</span>
                      </div>
                      <h5 className="font-semibold text-sm">Hòa Giải</h5>
                      <p className="text-xs text-gray-600 dark:text-gray-300">Qua trung tâm hòa giải</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-yellow-600 dark:text-yellow-400 font-bold">3</span>
                      </div>
                      <h5 className="font-semibold text-sm">Trọng Tài</h5>
                      <p className="text-xs text-gray-600 dark:text-gray-300">Trọng tài thương mại</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-red-600 dark:text-red-400 font-bold">4</span>
                      </div>
                      <h5 className="font-semibold text-sm">Tòa Án</h5>
                      <p className="text-xs text-gray-600 dark:text-gray-300">Tòa án có thẩm quyền</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                  <h4 className="font-semibold mb-4">Thông Tin Liên Hệ</h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-medium mb-2">Bộ Phận Pháp Chế</h5>
                      <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                        <p>📧 legal@nganluongsilver.com</p>
                        <p>📞 0763 600 889 (ext. 102)</p>
                        <p>🕒 8:00 - 18:00 (Thứ 2 - Thứ 7)</p>
                      </div>
                    </div>
                    <div>
                      <h5 className="font-medium mb-2">Địa Chỉ Pháp Lý</h5>
                      <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                        <p>45 Bàu Hạc 8, Thạc Gián</p>
                        <p>Thanh Khê, Đà Nẵng</p>
                        <p>Việt Nam</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                  <p>
                    <strong>Điều khoản này có hiệu lực từ ngày 01/01/2025</strong>
                    <br />
                    Phiên bản cập nhật lần cuối: 25/07/2025
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
