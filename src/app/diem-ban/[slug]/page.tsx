"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { MapPin, Phone, Clock, Navigation, ArrowLeft, ExternalLink, Star, Users, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CommonHeader } from "@/components/common/common-header"
import { CommonFooter } from "@/components/common/common-footer"
import { getStoreBySlug } from "@/data/stores"
import { isStoreOpen } from "@/lib/store-utils"

export default function StoreDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  // Find store by slug using utility function
  const store = getStoreBySlug(slug)
  const currentStoreStatus = store ? isStoreOpen(store) : false // Determine real-time status

  const handleGetDirections = () => {
    if (!store) return
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${store.coordinates.lat},${store.coordinates.lng}`
    window.open(googleMapsUrl, "_blank")
  }

  const handleViewOnMap = () => {
    if (!store) return
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${store.coordinates.lat},${store.coordinates.lng}`
    window.open(googleMapsUrl, "_blank")
  }

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  // 404 if store not found
  if (!store) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <CommonHeader currentPage="stores" />
        <div className="h-14 sm:h-16"></div>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">Không tìm thấy cửa hàng</h1>
          <p className="text-slate-600 dark:text-slate-400 mb-6">Cửa hàng bạn đang tìm kiếm không tồn tại.</p>
          <Link href="/diem-ban">
            <Button className="bg-slate-800 hover:bg-slate-700 dark:bg-slate-600 dark:hover:bg-slate-500 dark:text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại danh sách cửa hàng
            </Button>
          </Link>
        </div>
        <CommonFooter />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <CommonHeader currentPage="stores" />

      {/* Spacer for fixed header */}
      <div className="h-14 sm:h-16"></div>

      {/* Breadcrumb */}
      <div className="bg-white dark:bg-slate-800 border-b dark:border-slate-700">
        <div className="container mx-auto px-2 sm:px-4 py-2 sm:py-3">
          <div className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm overflow-x-auto">
            <Link
              href="/"
              className="text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 whitespace-nowrap"
            >
              Trang chủ
            </Link>
            <span className="text-slate-400 dark:text-slate-500">/</span>
            <Link
              href="/diem-ban"
              className="text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 whitespace-nowrap"
            >
              Hệ thống điểm bán
            </Link>
            <span className="text-slate-400 dark:text-slate-500">/</span>
            <span className="text-slate-800 dark:text-slate-200 font-medium truncate">{store.name}</span>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-2 sm:px-4 py-4 sm:py-6 lg:py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/diem-ban">
            <Button
              variant="outline"
              className="dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:hover:bg-slate-600 bg-transparent"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại danh sách cửa hàng
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {/* Store Images */}
          <div className="space-y-4">
            <div className="relative">
              <Image
                src={(store.gallery?.[selectedImageIndex]?.split("&text=")[0]) || store.image}
                alt={store.name}
                width={600}
                height={400}
                className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-lg shadow-lg"
              />
              <div className="absolute top-2 left-2 flex gap-2">
                <Badge
                  className={`text-xs ${
                    store.type === "Cửa hàng chính"
                      ? "bg-blue-600 hover:bg-blue-600"
                      : "bg-slate-600 hover:bg-slate-600"
                  }`}
                >
                  {store.type}
                </Badge>
                <Badge
                  className={`text-xs ${
                    currentStoreStatus ? "bg-green-600 hover:bg-green-600" : "bg-red-600 hover:bg-red-600"
                  }`}
                >
                  {currentStoreStatus ? "Đang hoạt động" : "Tạm đóng cửa"}
                </Badge>
              </div>
            </div>

            {/* Gallery Thumbnails */}
            <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
              {store.gallery?.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImageIndex === index
                      ? "border-slate-800 dark:border-slate-400"
                      : "border-gray-200 dark:border-slate-600"
                  }`}
                >
                  <Image
                    src={image?.split("&text=")[0] || "/placeholder.svg"}
                    alt={`${store.name} ${index + 1}`}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Store Information */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 dark:text-slate-200 mb-4">
                {store.name}
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
                {store.description}
              </p>
            </div>

            {/* Contact Information */}
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-slate-600 dark:text-slate-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-slate-800 dark:text-slate-200 mb-1">Địa chỉ</p>
                  <p className="text-slate-600 dark:text-slate-400">{store.address}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-slate-600 dark:text-slate-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-slate-800 dark:text-slate-200 mb-1">Số điện thoại</p>
                  <a
                    href={`tel:${store.phone}`}
                    className="text-blue-600 dark:text-blue-400 hover:underline text-lg font-medium"
                  >
                    {store.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-slate-600 dark:text-slate-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-slate-800 dark:text-slate-200 mb-1">Giờ làm việc</p>
                  <p className="text-slate-600 dark:text-slate-400">{store.hours}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <div className={`w-2 h-2 rounded-full ${currentStoreStatus ? "bg-green-500" : "bg-red-500"}`}></div>
                    <span
                      className={`text-sm font-medium ${
                        currentStoreStatus ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {currentStoreStatus ? "Đang hoạt động" : "Tạm đóng cửa"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Services */}
            <div>
              <p className="font-medium text-slate-800 dark:text-slate-200 mb-3">Dịch vụ</p>
              <div className="flex flex-wrap gap-2">
                {store.services.map((service, index) => (
                  <Badge key={index} variant="outline" className="dark:border-slate-600 dark:text-slate-300">
                    {service}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                onClick={handleGetDirections}
                className="w-full sm:flex-1 bg-slate-800 hover:bg-slate-700 dark:bg-slate-600 dark:hover:bg-slate-500 dark:text-white"
              >
                <Navigation className="w-4 h-4 mr-2" />
                Chỉ đường
              </Button>
              <Button
                variant="outline"
                onClick={handleViewOnMap}
                className="w-full sm:flex-1 dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:hover:bg-slate-600 bg-transparent"
              >
                <MapPin className="w-4 h-4 mr-2" />
                Xem trên bản đồ
              </Button>
            </div>
          </div>
        </div>

        {/* Features */}
        {store.features && store.features.length > 0 && (
          <Card className="mb-8 sm:mb-12 dark:bg-slate-800 dark:border-slate-700">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 dark:text-slate-200">
                <Star className="w-5 h-5" />
                <span>Đặc điểm nổi bật</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-3 sm:gap-4">
                {store.features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300">{feature}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Google Maps */}
        <Card className="mb-8 sm:mb-12 dark:bg-slate-800 dark:border-slate-700">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 dark:text-slate-200">
              <MapPin className="w-5 h-5" />
              <span>Vị trí trên bản đồ</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative w-full h-64 sm:h-80 lg:h-96 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
              <iframe
                src={`${store.iframe}`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Bản đồ ${store.name}`}
                className="w-full h-full"
              />
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              * Bản đồ có thể mất vài giây để tải. Nếu không hiển thị, vui lòng thử lại sau.
            </p>
          </CardContent>
        </Card>

        {/* Contact & Additional Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Contact Card */}
          <Card className="dark:bg-slate-800 dark:border-slate-700">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 dark:text-slate-200">
                <Phone className="w-5 h-5" />
                <span>Liên hệ trực tiếp</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between p-2 sm:p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm sm:text-base font-medium text-blue-800 dark:text-blue-200">Gọi điện thoại</p>
                    <p className="text-xs sm:text-sm text-blue-600 dark:text-blue-400">Tư vấn trực tiếp</p>
                  </div>
                </div>
                <a
                  href={`tel:${store.phone}`}
                  className="flex items-center space-x-1 text-blue-600 dark:text-blue-400 hover:underline"
                >
                  <span className="text-sm sm:text-base font-medium">Gọi ngay</span>
                  <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                </a>
              </div>

              <div className="flex items-center justify-between p-2 sm:p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-600 rounded-lg flex items-center justify-center">
                    <Users className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm sm:text-base font-medium text-green-800 dark:text-green-200">Zalo</p>
                    <p className="text-xs sm:text-sm text-green-600 dark:text-green-400">Chat trực tiếp</p>
                  </div>
                </div>
                <a
                  href="https://zalo.me/nganluongsilver"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 text-green-600 dark:text-green-400 hover:underline"
                >
                  <span className="text-sm sm:text-base font-medium">Chat ngay</span>
                  <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Additional Info */}
          <Card className="dark:bg-slate-800 dark:border-slate-700">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 dark:text-slate-200">
                <Award className="w-5 h-5" />
                <span>Thông tin thêm</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Miễn phí tư vấn và định giá bạc</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Bảo hành chính hãng 12 tháng</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p>Đổi trả trong 7 ngày nếu có lỗi</p>
                </div>
                {store.type === "Cửa hàng chính" && (
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p>Trung tâm bảo hành và dịch vụ chính</p>
                  </div>
                )}
                <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-3 mt-4">
                  <p className="text-slate-700 dark:text-slate-300 font-medium mb-2">Lưu ý quan trọng:</p>
                  <p className="text-xs">
                    Để tránh rủi ro, vui lòng chỉ giao dịch tại các cửa hàng chính thức của Ngân Lượng Silver. Kiểm tra
                    kỹ địa chỉ và số điện thoại trước khi đến.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <CommonFooter />
    </div>
  )
}
