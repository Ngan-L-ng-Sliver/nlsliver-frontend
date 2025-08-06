"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"
import { CartIcon } from "@/components/common/cart-icon"
import { FavoritesIcon } from "@/components/common/favorites-icon"

interface CommonHeaderProps {
  searchTerm?: string
  onSearchChange?: (value: string) => void
  showSearch?: boolean
  currentPage?: string
}

export function CommonHeader({
  searchTerm = "",
  onSearchChange,
  showSearch = false,
  currentPage = "",
}: CommonHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { href: "/", label: "Trang chủ", key: "home" },
    { href: "/", label: "Sản phẩm", key: "products" },
    { href: "/gia-bac-hom-nay", label: "Giá bạc hôm nay", key: "prices" },
    { href: "/diem-ban", label: "Điểm bán", key: "stores" },
    { href: "/lien-he", label: "Liên hệ", key: "contact" },
  ]

  const isCurrentPage = (key: string) => {
    return currentPage === key
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-800 dark:bg-slate-900 text-white shadow-lg">
      <div className="container mx-auto px-2 sm:px-4">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 sm:space-x-3">
            <Image
              src="/nl-sliver_logo.jpeg"
              alt="Ngân Lượng Silver"
              width={32}
              height={32}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
            />
            <div className="hidden xs:block sm:block">
              <h1 className="text-lg sm:text-xl font-bold">NGÂN LƯỢNG</h1>
              <p className="text-xs sm:text-sm text-slate-300 dark:text-slate-400">Silver</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={`hover:text-slate-300 dark:hover:text-slate-200 transition-colors ${
                  isCurrentPage(item.key) ? "text-slate-300 dark:text-slate-200 font-medium" : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Search, Theme Toggle, Favorites & Cart */}
          <div className="flex items-center space-x-4">
            {showSearch && onSearchChange && (
              <div className="hidden lg:block">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    placeholder="Tìm kiếm sản phẩm..."
                    className="pl-10 w-64 bg-slate-700 dark:bg-slate-800 border-slate-600 dark:border-slate-700 text-white placeholder-slate-400"
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                  />
                </div>
              </div>
            )}
            <ThemeToggle />
            <FavoritesIcon />
            <CartIcon />

            {/* Mobile Menu Button */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden text-white hover:bg-slate-700 dark:hover:bg-slate-600 transition-colors"
                >
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-slate-800 dark:bg-slate-900 text-white">
                <SheetHeader>
                  <SheetTitle className="text-white">Menu</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col space-y-4 mt-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.key}
                      href={item.href}
                      className={`hover:text-slate-300 dark:hover:text-slate-200 transition-colors ${
                        isCurrentPage(item.key) ? "text-slate-300 dark:text-slate-200 font-medium" : ""
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
