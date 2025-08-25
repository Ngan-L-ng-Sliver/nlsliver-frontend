import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-white py-16 sm:py-20 lg:py-24 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-amber-400/15 to-yellow-300/15 rounded-full blur-3xl animate-pulse delay-1000"></div>

        {/* Shimmer Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 animate-shimmer"></div>

        {/* Floating Particles */}
        <div className="absolute top-1/3 left-1/6 w-2 h-2 bg-white/30 rounded-full animate-float"></div>
        <div className="absolute top-2/3 right-1/5 w-1 h-1 bg-amber-300/40 rounded-full animate-float delay-500"></div>
        <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-blue-300/30 rounded-full animate-float delay-1000"></div>
        <div className="absolute bottom-1/3 left-1/2 w-1 h-1 bg-white/40 rounded-full animate-float delay-1500"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white via-gray-100 to-amber-100 bg-clip-text text-transparent animate-fade-in">
            Trang Sức - Bạc Miếng - Bạc Thỏi
          </h1>
          <p className="text-lg sm:text-lg md:text-xl lg:text-2xl text-slate-300 dark:text-slate-400 mb-6 sm:mb-8 animate-fade-in delay-300 max-w-3xl mx-auto">
            Đại lý bạc phú quý và ancarat đà nẵng chính thức, chuyên cung cấp bạc phú quý và ancarat tại đà nẵng
          </p>
          <p className="text-base sm:text-lg md:text-xl text-slate-400 dark:text-slate-500 mb-8 sm:mb-12 animate-fade-in delay-500 max-w-2xl mx-auto">
            Bạc miếng, bạc thỏi tại đà nẵng chất lượng 999/925, đầu tư bạc tích trữ an toàn
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center animate-fade-in delay-700">
            <Button
              size="lg"
              className="bg-gradient-to-r from-white to-gray-100 text-slate-800 hover:from-gray-100 hover:to-white dark:from-slate-200 dark:to-white dark:text-slate-900 dark:hover:from-white dark:hover:to-slate-100 text-base sm:text-lg py-3 sm:py-4 px-6 sm:px-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-semibold"
            >
              Xem Bộ Sưu Tập
            </Button>
            <Link href="/lien-he">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/80 text-white hover:bg-white/10 hover:text-white bg-transparent backdrop-blur-sm dark:border-slate-200/80 dark:text-slate-200 dark:hover:bg-slate-200/10 dark:hover:text-slate-200 text-base sm:text-lg py-3 sm:py-4 px-6 sm:px-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-semibold"
              >
                Liên Hệ Tư Vấn
              </Button>
            </Link>
          </div>

          {/* Additional Info */}
          <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 animate-fade-in delay-1000">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-amber-300 mb-2">999/925</div>
              <div className="text-sm sm:text-base text-slate-400">Độ Tinh Khiết</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-blue-300 mb-2">1+</div>
              <div className="text-sm sm:text-base text-slate-400">Năm Kinh Nghiệm</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-purple-300 mb-2">100%</div>
              <div className="text-sm sm:text-base text-slate-400">Chất Lượng Đảm Bảo</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
