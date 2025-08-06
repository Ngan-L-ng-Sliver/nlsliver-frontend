"use client"
import { CommonHeader } from "@/components/common/common-header"
import { CommonFooter } from "@/components/common/common-footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, Clock, Phone, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"

export default function SilverPricePage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <CommonHeader currentPage="prices" />

      <main className="pt-14 sm:pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-slate-800 to-slate-900 text-white py-12 sm:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Giá Bạc Hôm Nay</h1>
              <p className="text-lg sm:text-xl text-slate-300 mb-6 max-w-3xl mx-auto">
                Cập nhật giá bạc mới nhất từ các nguồn uy tín, giúp bạn đưa ra quyết định đầu tư thông minh
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Badge variant="secondary" className="text-sm px-3 py-1">
                  <Clock className="w-4 h-4 mr-1" />
                  Cập nhật liên tục
                </Badge>
                <Badge variant="secondary" className="text-sm px-3 py-1">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  Giá thị trường
                </Badge>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-8 sm:py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-blue-600">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Phú Quý Group
                  </CardTitle>
                  <CardDescription>
                    Bảng giá bạc từ Công ty Cổ phần Đầu tư Vàng Phú Quý - một trong những đơn vị uy tín hàng đầu
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Cập nhật theo thời gian thực</li>
                    <li>• Giá mua vào và bán ra rõ ràng</li>
                    <li>• Đa dạng sản phẩm bạc miếng, bạc thỏi</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-purple-600">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Ancarat Silver
                  </CardTitle>
                  <CardDescription>
                    Bảng giá từ Ancarat Silver - chuyên gia về bạc đầu tư và bạc mỹ nghệ cao cấp
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Sản phẩm bạc đầu tư chất lượng cao</li>
                    <li>• Bạc mỹ nghệ và trang sức</li>
                    <li>• Giá cạnh tranh, uy tín lâu năm</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Price Tables */}
            <Card>
              <CardHeader>
                <CardTitle>Bảng Giá Chi Tiết</CardTitle>
                <CardDescription>Chọn nguồn thông tin để xem bảng giá chi tiết</CardDescription>
              </CardHeader>
              <CardContent className="p-0 sm:p-6 sm:pt-0">
                <Tabs defaultValue="phuquy" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="phuquy" className="text-blue-600">
                      Phú Quý Group
                    </TabsTrigger>
                    <TabsTrigger value="ancarat" className="text-purple-600">
                      Ancarat Silver
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="phuquy" className="mt-6">
                    <div className="rounded-lg border overflow-hidden">
                      <iframe
                        src="https://giabac.phuquygroup.vn/"
                        className="w-full h-[400px] sm:h-[500px] lg:h-[600px] border-0"
                        title="Bảng giá bạc Phú Quý Group"
                        loading="lazy"
                        sandbox="allow-scripts allow-same-origin"
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="ancarat" className="mt-6">
                    <div className="rounded-lg border overflow-hidden">
                      <iframe
                        src="https://giabac.ancarat.com/"
                        className="w-full h-[400px] sm:h-[500px] lg:h-[600px] border-0"
                        title="Bảng giá bạc Ancarat Silver"
                        loading="lazy"
                        sandbox="allow-scripts allow-same-origin"
                      />
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Important Notice */}
            <Card className="mt-8 border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950">
              <CardHeader>
                <CardTitle className="flex items-center text-amber-800 dark:text-amber-200">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  Lưu Ý Quan Trọng
                </CardTitle>
              </CardHeader>
              <CardContent className="text-amber-700 dark:text-amber-300">
                <ul className="space-y-2 text-sm">
                  <li>• Giá bạc có thể thay đổi liên tục theo thị trường</li>
                </ul>
              </CardContent>
            </Card>

            {/* Contact CTA */}
            <Card className="mt-8 bg-gradient-to-r from-slate-800 to-slate-900 text-white">
              <CardContent className="text-center py-8">
                <h3 className="text-xl font-bold mb-4">Cần Tư Vấn Về Giá Bạc?</h3>
                <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
                  Đội ngũ chuyên gia của chúng tôi sẵn sàng tư vấn và cung cấp báo giá chính xác nhất cho bạn
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
                  <Button asChild size="lg" className="bg-white text-slate-900 hover:bg-slate-100 w-full sm:w-auto">
                    <Link href="/lien-he" className="flex items-center justify-center">
                      <Phone className="w-4 h-4 mr-2" />
                      Liên Hệ Ngay
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-white text-white hover:bg-white hover:text-slate-900 bg-transparent w-full sm:w-auto"
                  >
                    <Link href="tel:0763600889" className="flex items-center justify-center">
                      Gọi: 0763 600 889
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <CommonFooter />
    </div>
  )
}
