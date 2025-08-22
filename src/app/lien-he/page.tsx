"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  MapPin,
  Phone,
  Clock,
  Mail,
  MessageCircle,
  Facebook,
  ExternalLink,
  Store,
  Users,
  Award,
  Shield,
  Star,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CommonHeader } from "@/components/common/common-header"
import { CommonFooter } from "@/components/common/common-footer"

// Cập nhật thông tin liên hệ
const contactInfo = {
  address: "45 Bàu Hạc 8, Thanh Khê, Đà Nẵng",
  phone: "0763 600 889",
  email: "nganluongsilver@gmail.com",
  hours: "8:00 - 18:30 (Thứ 2 - Thứ 7), 8:00 - 17:00 (Chủ Nhật)",
  timezone: "Giờ Việt Nam (GMT+7)",
  zalo: "https://zalo.me/nganluongsilver",
  facebook: "https://facebook.com/nganluongsilver",
  website: "https://nganluongsilver.vercel.app",
}

// Cập nhật business stats
const businessStats = [
  {
    icon: Store,
    number: "1",
    label: "Cửa hàng",
    description: "Tại Đà Nẵng",
  },
  {
    icon: Users,
    number: "1,000+",
    label: "Khách hàng",
    description: "Tin tưởng sử dụng",
  },
  {
    icon: Award,
    number: "1+",
    label: "Năm kinh nghiệm",
    description: "Trong ngành bạc mỹ nghệ",
  },
  {
    icon: Shield,
    number: "100%",
    label: "Bảo hành",
    description: "Chính hãng uy tín",
  },
]

export default function LienHePage() {
  const [currentTime, setCurrentTime] = useState(new Date())

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)

    return () => clearInterval(timer)
  }, [])

  // Check if business is open
  const isBusinessOpen = () => {
    const now = new Date()
    const day = now.getDay() // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const hour = now.getHours()
    const minute = now.getMinutes()
    const currentTimeInMinutes = hour * 60 + minute

    // Store is open Monday to Sunday
    // Monday-Saturday: 8:00 - 18:30
    // Sunday: 8:00 - 17:00

    let openTimeInMinutes: number
    let closeTimeInMinutes: number

    if (day === 0) {
      // Sunday: 8:00 - 17:00
      openTimeInMinutes = 8 * 60 // 8:00 AM
      closeTimeInMinutes = 17 * 60 // 5:00 PM
    } else {
      // Monday-Saturday: 8:00 - 18:30
      openTimeInMinutes = 8 * 60 // 8:00 AM
      closeTimeInMinutes = 18 * 60 + 30 // 6:30 PM
    }

    // Check if current time is within operating hours
    return currentTimeInMinutes >= openTimeInMinutes && currentTimeInMinutes <= closeTimeInMinutes
  }

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <CommonHeader currentPage="contact" />

      {/* Spacer for fixed header */}
      <div className="h-14 sm:h-16"></div>

      {/* Breadcrumb */}
      <div className="bg-white dark:bg-slate-800 border-b dark:border-slate-700">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-2 sm:py-3">
          <div className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm overflow-x-auto">
            <Link
              href="/"
              className="text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 whitespace-nowrap"
            >
              Trang chủ
            </Link>
            <span className="text-slate-400 dark:text-slate-500">/</span>
            <span className="text-slate-800 dark:text-slate-200 font-medium">Liên hệ</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-800 to-slate-700 dark:from-slate-900 dark:to-slate-800 text-white py-6 sm:py-8 lg:py-12">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6 text-center">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4">Liên hệ với chúng tôi</h1>
          <p className="text-sm sm:text-base lg:text-lg text-slate-300 dark:text-slate-400 mb-4 sm:mb-6 px-2">
            Chúng tôi luôn sẵn sàng hỗ trợ và tư vấn cho bạn
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 text-xs sm:text-sm lg:text-base">
            <div className="flex items-center space-x-2">
              <div
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${isBusinessOpen() ? "bg-green-500" : "bg-red-500"}`}
              ></div>
              <span>{isBusinessOpen() ? "Đang mở cửa" : "Đang đóng cửa"}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>{currentTime.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })}</span>
            </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        {/* Business Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8 lg:mb-12">
          {businessStats.map((stat, index) => (
            <Card key={index} className="text-center dark:bg-slate-800 dark:border-slate-700">
              <CardContent className="p-3 sm:p-4 lg:p-6">
                <div className="flex justify-center mb-2 sm:mb-3">
                  <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="text-lg sm:text-2xl lg:text-3xl font-bold text-slate-800 dark:text-slate-200 mb-1">
                  {stat.number}
                </div>
                <div className="text-xs sm:text-sm lg:text-base font-medium text-slate-700 dark:text-slate-300 mb-1">
                  {stat.label}
                </div>
                <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">{stat.description}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Information - 2 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8 lg:mb-12">
          {/* Left Column */}
          <div className="space-y-4 sm:space-y-6">
            {/* Contact Information */}
            <Card className="dark:bg-slate-800 dark:border-slate-700">
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="flex items-center space-x-2 dark:text-slate-200 text-base sm:text-lg lg:text-xl">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Thông tin liên hệ</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4 pt-0">
                {/* Address */}
                <div className="flex items-start space-x-2 sm:space-x-3">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600 dark:text-slate-400 mt-0.5 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-slate-800 dark:text-slate-200 mb-1 text-sm sm:text-base">Địa chỉ</p>
                    <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm lg:text-base break-words">
                      {contactInfo.address}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start space-x-2 sm:space-x-3">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600 dark:text-slate-400 mt-0.5 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-slate-800 dark:text-slate-200 mb-1 text-sm sm:text-base">
                      Số điện thoại
                    </p>
                    <a
                      href={`tel:${contactInfo.phone}`}
                      className="text-blue-600 dark:text-blue-400 hover:underline text-xs sm:text-sm lg:text-base break-all"
                    >
                      {contactInfo.phone}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-2 sm:space-x-3">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600 dark:text-slate-400 mt-0.5 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-slate-800 dark:text-slate-200 mb-1 text-sm sm:text-base">Email</p>
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="text-blue-600 dark:text-blue-400 hover:underline text-xs sm:text-sm lg:text-base break-all"
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex items-start space-x-2 sm:space-x-3">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600 dark:text-slate-400 mt-0.5 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-slate-800 dark:text-slate-200 mb-1 text-sm sm:text-base">
                      Giờ làm việc
                    </p>
                    <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm lg:text-base">
                      {contactInfo.hours}
                    </p>
                    <p className="text-slate-500 dark:text-slate-500 text-xs sm:text-sm">{contactInfo.timezone}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <div className={`w-2 h-2 rounded-full ${isBusinessOpen() ? "bg-green-500" : "bg-red-500"}`}></div>
                      <span
                        className={`text-xs sm:text-sm font-medium ${
                          isBusinessOpen() ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                        }`}
                      >
                        {isBusinessOpen() ? "Hiện tại đang mở cửa" : "Hiện tại đang đóng cửa"}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Media & Quick Contact */}
            <Card className="dark:bg-slate-800 dark:border-slate-700">
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="flex items-center space-x-2 dark:text-slate-200 text-base sm:text-lg lg:text-xl">
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Kênh liên hệ chính</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4 pt-0">
                {/* Zalo */}
                <div className="flex items-center justify-between p-2 sm:p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-blue-800 dark:text-blue-200 text-sm sm:text-base">Zalo</p>
                      <p className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 truncate">
                        Chat trực tiếp với chúng tôi
                      </p>
                    </div>
                  </div>
                  <a
                    href={contactInfo.zalo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-blue-600 dark:text-blue-400 hover:underline flex-shrink-0 ml-2"
                  >
                    <span className="text-xs sm:text-sm font-medium">Chat ngay</span>
                    <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                  </a>
                </div>

                {/* Facebook */}
                <div className="flex items-center justify-between p-2 sm:p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Facebook className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-blue-800 dark:text-blue-200 text-sm sm:text-base">
                        Ngân Lượng Silver
                      </p>
                      <p className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 truncate">
                        Theo dõi tin tức mới nhất
                      </p>
                    </div>
                  </div>
                  <a
                    href={contactInfo.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-blue-600 dark:text-blue-400 hover:underline flex-shrink-0 ml-2"
                  >
                    <span className="text-xs sm:text-sm font-medium">Theo dõi</span>
                    <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-4 sm:space-y-6">
            {/* Official Fanpages */}
            <Card className="dark:bg-slate-800 dark:border-slate-700">
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="flex items-center space-x-2 dark:text-slate-200 text-base sm:text-lg lg:text-xl">
                  <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Fanpage chính thức</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 sm:space-y-3 pt-0">
                <div className="grid grid-cols-1 gap-2 sm:gap-3">
                  {/* Main Official Fanpage */}
                  <div className="flex items-center justify-between p-2 sm:p-3 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-lg border-2 border-blue-300 dark:border-blue-600 relative">
                    <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 relative">
                        <Facebook className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center">
                          <Star className="w-2.5 h-2.5 text-white fill-white" />
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center space-x-2">
                          <p className="font-bold text-blue-800 dark:text-blue-200 text-xs sm:text-sm break-words">
                            Ngân Lượng Silver
                          </p>
                          <span className="bg-yellow-500 text-white text-xs px-2 py-0.5 rounded-full font-medium whitespace-nowrap">
                            CHÍNH
                          </span>
                        </div>
                        <p className="text-xs text-blue-600 dark:text-blue-400">Fanpage chính của cửa hàng</p>
                      </div>
                    </div>
                    <a
                      href="https://www.facebook.com/nganluongsilver"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 text-blue-600 dark:text-blue-400 hover:underline flex-shrink-0 ml-2"
                    >
                      <span className="text-xs sm:text-sm font-medium">Theo dõi</span>
                      <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                    </a>
                  </div>

                  <div className="flex items-center justify-between p-2 sm:p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Facebook className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-blue-800 dark:text-blue-200 text-xs sm:text-sm break-words">
                          Ngân Lượng Silver - Đại Lý Bạc Phú Quý Đà Nẵng
                        </p>
                      </div>
                    </div>
                    <a
                      href="https://www.facebook.com/nganluongsilver.dailyphuquydannang"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 text-blue-600 dark:text-blue-400 hover:underline flex-shrink-0 ml-2"
                    >
                      <span className="text-xs sm:text-sm font-medium">Theo dõi</span>
                      <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                    </a>
                  </div>

                  <div className="flex items-center justify-between p-2 sm:p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Facebook className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-blue-800 dark:text-blue-200 text-xs sm:text-sm break-words">
                          Ngân Lượng Silver - Đại Lý Bạc Ancarat Đà Nẵng
                        </p>
                      </div>
                    </div>
                    <a
                      href="https://www.facebook.com/nganluongsilver.dailyancaratdanang"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 text-blue-600 dark:text-blue-400 hover:underline flex-shrink-0 ml-2"
                    >
                      <span className="text-xs sm:text-sm font-medium">Theo dõi</span>
                      <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                    </a>
                  </div>

                </div>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-2 sm:p-3 mt-3 sm:mt-4">
                  <p className="text-yellow-700 dark:text-yellow-300 text-xs sm:text-sm">
                    <strong>Lưu ý:</strong> Đây là danh sách các fanpage chính thức của Ngân Lượng Silver. Vui lòng chỉ
                    theo dõi và tương tác trên các trang này để đảm bảo thông tin chính xác và tránh các trang giả mạo.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Call to Action - Store Locations */}
            <div className="bg-gradient-to-r from-slate-800 to-slate-700 dark:from-slate-700 dark:to-slate-600 rounded-lg p-3 sm:p-4 text-white">
              <div className="flex items-center space-x-2 sm:space-x-3 mb-3">
                <Store className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-sm sm:text-base">Ghé thăm cửa hàng</h3>
                  <p className="text-xs sm:text-sm text-slate-300">Cửa hàng chính tại Đà Nẵng</p>
                </div>
              </div>
              <Link href="/diem-ban">
                <Button
                  variant="secondary"
                  className="w-full bg-white text-slate-800 hover:bg-gray-100 dark:bg-slate-200 dark:text-slate-900 dark:hover:bg-white text-sm sm:text-base py-2 sm:py-3"
                >
                  <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                  Xem thông tin cửa hàng
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <Card className="dark:bg-slate-800 dark:border-slate-700">
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="dark:text-slate-200 text-base sm:text-lg lg:text-xl">Câu hỏi thường gặp</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <h4 className="font-medium text-slate-800 dark:text-slate-200 mb-2 text-sm sm:text-base">
                    Làm thế nào để kiểm tra độ tinh khiết của bạc?
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                    Mỗi sản phẩm đều được điêu khắc tinh xảo và có giấy chứng nhận chất lượng uy tín từ thương hiệu Phú
                    Quý hoặc Ancarat.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-slate-800 dark:text-slate-200 mb-2 text-sm sm:text-base">
                    Chính sách bảo hành như thế nào?
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                    Tất cả sản phẩm được bảo hành 12 tháng về chất lượng và độ tinh khiết. Hỗ trợ đổi trả trong 7 ngày
                    nếu có lỗi từ nhà sản xuất.
                  </p>
                </div>
              </div>
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <h4 className="font-medium text-slate-800 dark:text-slate-200 mb-2 text-sm sm:text-base">
                    Có thể mua bán bạc cũ không?
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                    Có, chúng tôi nhận mua lại bạc cũ của Ngân Lượng Silver/Phú Quý/Ancarat với giá niêm yết mới nhất
                    theo từng thương hiệu. Liên hệ để được tư vấn và định giá chính xác.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <CommonFooter />
    </div>
  )
}
