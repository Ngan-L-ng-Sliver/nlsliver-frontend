"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { MapPin, Phone, Clock, Navigation } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CommonHeader } from "@/components/common/common-header"
import { CommonFooter } from "@/components/common/common-footer"
import { storeLocations, getAllDistricts, getAllStoreTypes, getAllStatuses, type Store } from "@/data/stores"
import { isStoreOpen } from "@/lib/store-utils"

export default function DiemBanPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDistrict, setSelectedDistrict] = useState("Tất cả")
  const [selectedType, setSelectedType] = useState("Tất cả")
  const [selectedStatus, setSelectedStatus] = useState("Tất cả")

  // Get filter options from data
  const districts = getAllDistricts()
  const storeTypes = getAllStoreTypes()
  const statusOptions = getAllStatuses()

  // Filter stores based on search criteria
  const filteredStores = storeLocations.filter((store) => {
    const matchesSearch =
      store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.address.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDistrict = selectedDistrict === "Tất cả" || store.address.includes(selectedDistrict)
    const matchesType = selectedType === "Tất cả" || store.type === selectedType
    const matchesStatus = selectedStatus === "Tất cả" || store.status === selectedStatus

    return matchesSearch && matchesDistrict && matchesType && matchesStatus
  })

  const handleGetDirections = (store: Store) => {
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${store.coordinates.lat},${store.coordinates.lng}`
    window.open(googleMapsUrl, "_blank")
  }

  const handleViewOnMap = (store: Store) => {
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${store.coordinates.lat},${store.coordinates.lng}`
    window.open(googleMapsUrl, "_blank")
  }

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

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
            <span className="text-slate-800 dark:text-slate-200 font-medium">Hệ thống điểm bán</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-800 to-slate-700 dark:from-slate-900 dark:to-slate-800 text-white py-8 sm:py-12">
        <div className="container mx-auto px-2 sm:px-4 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4">Hệ thống điểm bán</h1>
          <p className="text-base sm:text-lg text-slate-300 dark:text-slate-400 mb-4 sm:mb-6">
            Tìm cửa hàng Ngân Lượng Silver gần bạn nhất
          </p>
          <div className="flex items-center space-x-4 text-sm sm:text-base">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>{storeLocations.filter((store) => isStoreOpen(store)).length} cửa hàng đang hoạt động</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>Đà Nẵng</span>
            </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-2 sm:px-4 py-4 sm:py-6 lg:py-8">
        {/* Search and Filters */}
        <div className="mb-6 sm:mb-8">
          <div className="grid grid-cols-1 gap-4 mb-4">
            {/* Search */}
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Tìm kiếm theo tên cửa hàng hoặc địa chỉ..."
                className="pl-10 h-10 sm:h-11 text-sm sm:text-base dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 sm:gap-4">
              <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                <SelectTrigger className="h-10 sm:h-11 text-sm sm:text-base dark:bg-slate-800 dark:border-slate-700 dark:text-white w-full">
                  <SelectValue placeholder="Chọn quận/huyện" />
                </SelectTrigger>
                <SelectContent className="dark:bg-slate-800 dark:border-slate-700">
                  {districts.map((district) => (
                    <SelectItem key={district} value={district} className="dark:text-white dark:hover:bg-slate-700">
                      {district}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Loại cửa hàng: full width on all breakpoints */}
              <div className="col-span-1 lg:col-span-1 w-full">
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="h-10 sm:h-11 text-sm sm:text-base dark:bg-slate-800 dark:border-slate-700 dark:text-white w-full">
                    <SelectValue placeholder="Loại cửa hàng" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-slate-800 dark:border-slate-700">
                    {storeTypes.map((type) => (
                      <SelectItem key={type} value={type} className="dark:text-white dark:hover:bg-slate-700">
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="h-10 sm:h-11 text-sm sm:text-base dark:bg-slate-800 dark:border-slate-700 dark:text-white w-full">
                  <SelectValue placeholder="Trạng thái" />
                </SelectTrigger>
                <SelectContent className="dark:bg-slate-800 dark:border-slate-700">
                  {statusOptions.map((status) => (
                    <SelectItem key={status} value={status} className="dark:text-white dark:hover:bg-slate-700">
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Results count */}
          <p className="text-sm text-slate-600 dark:text-slate-400">Tìm thấy {filteredStores.length} cửa hàng</p>
        </div>

        {/* Store List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
          {filteredStores.map((store) => (
            <Card
              key={store.id}
              className="group hover:shadow-lg dark:hover:shadow-slate-700/50 transition-all duration-300 dark:bg-slate-800 dark:border-slate-700"
            >
              <CardContent className="p-0">
                <Link href={`/diem-ban/${store.slug}`}>
                  <div className="relative cursor-pointer">
                    <Image
                      src={store.image || "/placeholder.svg"}
                      alt={store.name}
                      width={300}
                      height={200}
                      className="w-full h-40 sm:h-48 object-cover rounded-t-lg hover:opacity-90 transition-opacity"
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
                          isStoreOpen(store) ? "bg-green-600 hover:bg-green-600" : "bg-red-600 hover:bg-red-600"
                        }`}
                      >
                        {isStoreOpen(store) ? "Đang hoạt động" : "Tạm đóng cửa"}
                      </Badge>
                    </div>
                  </div>
                </Link>

                <div className="p-4 space-y-3">
                  <div>
                    <Link href={`/diem-ban/${store.slug}`}>
                      <h3 className="font-semibold text-base sm:text-lg mb-2 line-clamp-2 dark:text-slate-200 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        {store.name}
                      </h3>
                    </Link>
                    <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                      <div className="flex items-start space-x-2">
                        <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <span className="line-clamp-2">{store.address}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 flex-shrink-0" />
                        <a
                          href={`tel:${store.phone}`}
                          className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                          {store.phone}
                        </a>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 flex-shrink-0" />
                        <span>{store.hours}</span>
                      </div>
                    </div>
                  </div>

                  {/* Services */}
                  <div>
                    <p className="text-xs font-medium text-slate-700 dark:text-slate-300 mb-2">Dịch vụ:</p>
                    <div className="flex flex-wrap gap-1">
                      {store.services.map((service, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs dark:border-slate-600 dark:text-slate-300"
                        >
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-3 gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewOnMap(store)}
                      className="text-xs dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:hover:bg-slate-600 bg-transparent"
                    >
                      <MapPin className="w-3 h-3 mr-1" />
                      Bản đồ
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleGetDirections(store)}
                      className="text-xs bg-slate-800 hover:bg-slate-700 dark:bg-slate-600 dark:hover:bg-slate-500 dark:text-white"
                      disabled={!isStoreOpen(store)}
                    >
                      <Navigation className="w-3 h-3 mr-1" />
                      Chỉ đường
                    </Button>
                    <Link href={`/diem-ban/${store.slug}`}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full text-xs dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:hover:bg-slate-600 bg-transparent"
                      >
                        Chi tiết
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No results */}
        {filteredStores.length === 0 && (
          <div className="text-center py-16">
            <MapPin className="w-24 h-24 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-slate-600 dark:text-slate-400 mb-2">
              Không tìm thấy cửa hàng nào
            </h2>
            <p className="text-slate-500 dark:text-slate-500 mb-6">Vui lòng thử lại với từ khóa hoặc bộ lọc khác</p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setSelectedDistrict("Tất cả")
                setSelectedType("Tất cả")
                setSelectedStatus("Tất cả")
              }}
              className="bg-slate-800 hover:bg-slate-700 dark:bg-slate-600 dark:hover:bg-slate-500 dark:text-white"
            >
              Xóa bộ lọc
            </Button>
          </div>
        )}

        {/* Google Maps Integration Info */}
        <div className="mt-12">
          <Card className="dark:bg-slate-800 dark:border-slate-700">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 dark:text-slate-200">
                <MapPin className="w-5 h-5" />
                <span>Hướng dẫn sử dụng bản đồ</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-slate-800 dark:text-slate-200 mb-2">Xem bản đồ:</h4>
                  <p>Nhấn nút "Xem bản đồ" để mở vị trí cửa hàng trên Google Maps trong tab mới.</p>
                </div>
                <div>
                  <h4 className="font-medium text-slate-800 dark:text-slate-200 mb-2">Chỉ đường:</h4>
                  <p>Nhấn nút "Chỉ đường" để mở Google Maps với hướng dẫn đường đi từ vị trí hiện tại của bạn.</p>
                </div>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <p className="text-blue-700 dark:text-blue-300">
                  <strong>Lưu ý:</strong> Để sử dụng tính năng chỉ đường, vui lòng cho phép trình duyệt truy cập vị trí
                  của bạn hoặc nhập địa chỉ xuất phát trên Google Maps.
                </p>
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
