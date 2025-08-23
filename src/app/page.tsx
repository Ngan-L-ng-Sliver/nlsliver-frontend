"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { CommonHeader } from "@/components/common/common-header"
import { CommonFooter } from "@/components/common/common-footer"
import { FloatingContact } from "@/components/common/floating-contact"
import { HeroSection } from "@/components/home/hero-section"
import { MobileSearch } from "@/components/home/mobile-search"
import { ActiveFiltersDisplay } from "@/components/home/active-filters-display"
import { FiltersSection } from "@/components/home/filters-section"
import { ProductGrid } from "@/components/home/product-grid"
import { Pagination } from "@/components/home/pagination"
import { FAQSection } from "@/components/home/faq-section"
import { PriceUpdateIndicator } from "@/components/common/price-update-indicator"
import {
  refreshProductsFromStorage,
  getAllBrands,
  getAllPriceRanges,
  getAllCategories,
  getAllStatuses,
  getPriceRange,
  forceRefreshFromJSON,
} from "@/data/products"
import { usePriceUpdater } from "@/hooks/use-price-updater"

interface FilterState {
  brands: string[]
  priceRanges: string[]
  silverTypes: string[]
  statuses: string[]
  showPromotions: boolean
}

export default function HomePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState<FilterState>({
    brands: [],
    priceRanges: [],
    silverTypes: [],
    statuses: [],
    showPromotions: false,
  })
  const [sortBy, setSortBy] = useState("newest")
  const [currentPage, setCurrentPage] = useState(1)
  const [products, setProducts] = useState(() => refreshProductsFromStorage())
  const itemsPerPage = 12
  const [activeBrandTab, setActiveBrandTab] = useState<string>("phu-quy")

  const { checkAndUpdateIfNeeded } = usePriceUpdater()

  // Initialize state from URL parameters
  useEffect(() => {
    const page = searchParams.get('page')
    const brand = searchParams.get('brand')
    const search = searchParams.get('search')
    
    if (page) {
      const pageNum = parseInt(page, 10)
      if (pageNum > 0) {
        setCurrentPage(pageNum)
      }
    }
    
    if (brand && ['phu-quy', 'ancarat', 'ngan-luong'].includes(brand)) {
      setActiveBrandTab(brand)
    }
    
    if (search) {
      setSearchTerm(decodeURIComponent(search))
    }
  }, [searchParams])

  // Update URL when state changes
  const updateURL = (page: number, brandTab: string, searchTerm: string) => {
    const params = new URLSearchParams()
    
    if (page > 1) {
      params.set('page', page.toString())
    }
    
    if (brandTab !== 'phu-quy') {
      params.set('brand', brandTab)
    }
    
    if (searchTerm.trim()) {
      params.set('search', encodeURIComponent(searchTerm.trim()))
    }
    
    const newURL = params.toString() ? `/?${params.toString()}` : '/'
    router.replace(newURL, { scroll: false })
  }

  // Scroll to filters section
  const scrollToFilters = () => {
    const filtersElement = document.getElementById('filters-section')
    if (filtersElement) {
      filtersElement.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start',
        inline: 'nearest'
      })
    }
  }

  // Refresh products when component mounts and after updates
  useEffect(() => {
    const refreshProducts = () => {
      const updatedProducts = refreshProductsFromStorage()
      setProducts(updatedProducts)
    }

    // Initial load - this will automatically check and update from JSON if needed
    refreshProducts()

    // Listen for storage changes (when prices are updated)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "ngan-luong-products-updated" || e.key === "ngan-luong-products-initial") {
        console.log("Products updated in localStorage, refreshing...")
        const updatedProducts = refreshProductsFromStorage()
        setProducts(updatedProducts)
        console.log("Updated products count:", updatedProducts.length)
      }
    }

    // Listen for localStorage refresh events
    const handleLocalStorageRefresh = () => {
      console.log("LocalStorage refresh triggered, updating products...")
      const refreshedProducts = refreshProductsFromStorage()
      setProducts(refreshedProducts)
      console.log("Refreshed products count:", refreshedProducts.length)
    }

    // Listen for price update events
    const handlePricesUpdated = () => {
      console.log("Prices updated event triggered, refreshing products...")
      const refreshedProducts = refreshProductsFromStorage()
      setProducts(refreshedProducts)
      console.log("Price updated products count:", refreshedProducts.length)
    }

    // Listen for keyboard shortcut to force refresh from JSON (for development)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === "R") {
        e.preventDefault()
        console.log("Force refreshing from JSON...")
        const freshProducts = forceRefreshFromJSON()
        setProducts(freshProducts)
        console.log("Force refreshed products count:", freshProducts.length)
      }
    }

    window.addEventListener("storage", handleStorageChange)
    window.addEventListener("localStorageRefresh", handleLocalStorageRefresh)
    window.addEventListener("pricesUpdated", handlePricesUpdated)
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("localStorageRefresh", handleLocalStorageRefresh)
      window.removeEventListener("pricesUpdated", handlePricesUpdated)
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  // Get dynamic filter options based on current products
  const brands = getAllBrands()
  const priceRanges = getAllPriceRanges()
  const silverTypes = getAllCategories()
  const statuses = getAllStatuses()

  // Load filters from localStorage on component mount
  useEffect(() => {
    const savedFilters = localStorage.getItem("ngan-luong-filters")
    if (savedFilters) {
      try {
        const parsedFilters = JSON.parse(savedFilters)
        setFilters(parsedFilters)
      } catch (error) {
        console.error("Error loading filters from localStorage:", error)
      }
    }
  }, [])

  // Save filters to localStorage whenever filters change
  useEffect(() => {
    localStorage.setItem("ngan-luong-filters", JSON.stringify(filters))
  }, [filters])

  // Update URL when page, brand tab, or search changes
  useEffect(() => {
    updateURL(currentPage, activeBrandTab, searchTerm)
  }, [currentPage, activeBrandTab, searchTerm])

  // Auto-check and update prices every 1 minute
  useEffect(() => {
    // Initial check after 3 seconds
    const initialTimer = setTimeout(() => {
      checkAndUpdateIfNeeded(products).catch((error) => {
        console.error("Initial price update failed:", error)
      })
    }, 3000)

    // Then check every 1 minute
    const interval = setInterval(() => {
      checkAndUpdateIfNeeded(products).catch((error) => {
        console.error("Periodic price update failed:", error)
      })
    }, 60000) // 1 minute

    return () => {
      clearTimeout(initialTimer)
      clearInterval(interval)
    }
  }, [checkAndUpdateIfNeeded]) // Remove products dependency to avoid recreating interval

  const handleBrandChange = (brand: string, checked: boolean) => {
    setFilters((prev) => ({
      ...prev,
      brands: checked ? [...prev.brands, brand] : prev.brands.filter((b) => b !== brand),
    }))
    setCurrentPage(1)
  }

  const handlePriceRangeChange = (priceRange: string, checked: boolean) => {
    setFilters((prev) => ({
      ...prev,
      priceRanges: checked ? [...prev.priceRanges, priceRange] : prev.priceRanges.filter((p) => p !== priceRange),
    }))
    setCurrentPage(1)
  }

  const handleSilverTypeChange = (silverType: string, checked: boolean) => {
    setFilters((prev) => ({
      ...prev,
      silverTypes: checked ? [...prev.silverTypes, silverType] : prev.silverTypes.filter((s) => s !== silverType),
    }))
    setCurrentPage(1)
  }

  const handleStatusChange = (status: string, checked: boolean) => {
    setFilters((prev) => ({
      ...prev,
      statuses: checked ? [...prev.statuses, status] : prev.statuses.filter((s) => s !== status),
    }))
    setCurrentPage(1)
  }

  const handlePromotionChange = (checked: boolean) => {
    setFilters((prev) => ({
      ...prev,
      showPromotions: checked,
    }))
    setCurrentPage(1)
  }

  const clearAllFilters = () => {
    setFilters({
      brands: [],
      priceRanges: [],
      silverTypes: [],
      statuses: [],
      showPromotions: false,
    })
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // Scroll to filters section when changing pages
    setTimeout(() => {
      scrollToFilters()
    }, 100)
  }

  const handleBrandTabChange = (brandTab: string) => {
    setActiveBrandTab(brandTab)
    setCurrentPage(1)
    // Scroll to filters section when changing brand tabs
    setTimeout(() => {
      scrollToFilters()
    }, 100)
  }

  const handleSearchChange = (search: string) => {
    setSearchTerm(search)
    setCurrentPage(1)
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.code.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesBrand = filters.brands.length === 0 || filters.brands.includes(product.brand)
    const matchesPriceRange =
      filters.priceRanges.length === 0 || filters.priceRanges.includes(getPriceRange(product.sellPrice))
    const matchesSilverType = filters.silverTypes.length === 0 || filters.silverTypes.includes(product.category)
    const matchesStatus = filters.statuses.length === 0 || filters.statuses.includes(product.status)

    // Brand tab filtering
    const matchesBrandTab =
      activeBrandTab === "all" ||
      (activeBrandTab === "phu-quy" && product.brand !== "Ancarat" && product.brand !== "Ngân Lượng Silver") ||
      (activeBrandTab === "ancarat" && product.brand === "Ancarat") ||
      (activeBrandTab === "ngan-luong" && product.brand === "Ngân Lượng Silver")

    return matchesSearch && matchesBrand && matchesPriceRange && matchesSilverType && matchesStatus && matchesBrandTab
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.sellPrice - b.sellPrice
      case "price-high":
        return b.sellPrice - a.sellPrice
      case "name":
        return a.name.localeCompare(b.name)
      case "newest":
      default:
        // Sắp xếp theo ngày tạo (mới nhất trước)
        return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
    }
  })

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentProducts = sortedProducts.slice(startIndex, startIndex + itemsPerPage)

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Đại Lý Bạc Phú Quý Đà Nẵng",
    description: "Chuyên cung cấp dịch vụ đầu tư bạc tích trữ uy tín, an toàn hàng đầu tại Đà Nẵng. Hotline: 0763600889 | Địa Chỉ: 45 Bàu Hạc 8, Thanh Khê, Đà Nẵng",
    url: "https://nganluongsilver.com",
    telephone: "+84763600889",
    address: {
      "@type": "PostalAddress",
      streetAddress: "45 Bàu Hạc 8, Thanh Khê, Đà Nẵng",
      addressLocality: "Đà Nẵng",
      addressRegion: "Đà Nẵng",
      postalCode: "550000",
      addressCountry: "VN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 16.0544,
      longitude: 108.2022,
    },
    openingHours: "Mo-Sa 08:00-18:00",
    priceRange: "$$",
    image: "/cover fanpage nls phu quy 2.png",
    sameAs: ["https://facebook.com/bacphuquydanang", "https://zalo.me/0763600889"],
    serviceType: "Đầu tư bạc tích trữ",
    areaServed: {
      "@type": "City",
      name: "Đà Nẵng",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Dịch vụ đầu tư bạc",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Tư vấn đầu tư bạc miếng",
            description: "Tư vấn chuyên nghiệp về đầu tư bạc miếng an toàn",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Mua bán bạc thỏi",
            description: "Dịch vụ mua bán bạc thỏi chất lượng cao",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Tích trữ bạc an toàn",
            description: "Dịch vụ tích trữ bạc an toàn, bảo mật",
          },
        },
      ],
    },
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      {/* Header */}
      <CommonHeader searchTerm={searchTerm} onSearchChange={handleSearchChange} showSearch={true} currentPage="home" />

      {/* Spacer for fixed header */}
      <div className="h-14 sm:h-16"></div>

      {/* Hero Section */}
      <HeroSection />

      {/* Order feature notice */}
      <div className="w-full bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100 text-center py-2 px-4 text-sm font-medium">
      Tính năng đặt hàng trên website chưa chính thức mở, vui lòng nhắn qua <a href="https://zalo.me/0763600889" target="_blank" rel="noopener noreferrer" className="underline font-semibold">Zalo 0763 600 889</a> hoặc <a href="https://www.facebook.com/nganluongsilver" target="_blank" rel="noopener noreferrer" className="underline font-semibold">Fanpage</a> để được đặt hàng giá chính xác nhất.
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-2 sm:px-4 py-4 sm:py-6 lg:py-8">
        {/* Mobile Search */}
        <MobileSearch searchTerm={searchTerm} onSearchChange={handleSearchChange} />

        {/* Brand Tabs */}
        <div id="filters-section" className="bg-white dark:bg-slate-800 rounded-lg p-4 mb-6 shadow-sm border dark:border-slate-700">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleBrandTabChange("phu-quy")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeBrandTab === "phu-quy"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-600"
              }`}
            >
              Phú Quý
            </button>
            <button
              onClick={() => handleBrandTabChange("ancarat")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeBrandTab === "ancarat"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-600"
              }`}
            >
              Ancarat
            </button>
            <button
              onClick={() => handleBrandTabChange("ngan-luong")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeBrandTab === "ngan-luong"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-600"
              }`}
            >
              Ngân Lượng Silver
            </button>
          </div>
        </div>

        {/* Active Filters Display */}
        <ActiveFiltersDisplay filters={filters} onClearFilters={clearAllFilters} />

        {/* Filters Section */}
        <FiltersSection
          filters={filters}
          brands={brands}
          priceRanges={priceRanges}
          silverTypes={silverTypes}
          statuses={statuses}
          sortBy={sortBy}
          onBrandChange={handleBrandChange}
          onPriceRangeChange={handlePriceRangeChange}
          onSilverTypeChange={handleSilverTypeChange}
          onStatusChange={handleStatusChange}
          onPromotionChange={handlePromotionChange}
          onSortChange={setSortBy}
        />

        {/* Products Grid */}
        <ProductGrid products={currentProducts} />

        {/* Pagination */}
        <div className="mt-8">
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>

        {/* Development Helper */}
        {process.env.NODE_ENV === "development" && (
          <div className="fixed bottom-4 right-4 bg-black/80 text-white p-2 rounded text-xs">
            Press Ctrl+Shift+R to force refresh from JSON
          </div>
        )}
      </main>

      {/* FAQ Section */}
      <FAQSection />

      {/* Footer */}
      <CommonFooter />

      {/* Floating Contact Widget */}
      <FloatingContact />

      {/* Price Update Indicator (hidden by default) */}
      <PriceUpdateIndicator />
    </div>
  )
}
