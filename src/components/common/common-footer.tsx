"use client"

import Image from "next/image"
import Link from "next/link"
import { Facebook, Phone, Mail, MapPin, Clock, Youtube, Instagram } from "lucide-react"

export function CommonFooter() {
  return (
    <footer className="bg-slate-800 dark:bg-slate-900 text-white">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-6 sm:py-8 lg:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8">
          {/* Company Info */}
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start mb-4">
              <Link href="/" className="flex items-center space-x-2 sm:space-x-3">
                <Image
                  src="/nl-sliver_logo.jpeg"
                  alt="Ngân Lượng Silver"
                  width={32}
                  height={32}
                  className="w-10 h-10 sm:w-10 sm:h-10 rounded-full"
                />
                <div>
                  <h3 className="text-base sm:text-lg font-bold">NGÂN LƯỢNG</h3>
                  <p className="text-xs sm:text-sm text-slate-300 dark:text-slate-400">Silver</p>
                </div>
              </Link>
            </div>
            <p className="text-slate-300 dark:text-slate-400 text-xs sm:text-sm">
              Chuyên cung cấp bạc mỹ nghệ cao cấp, uy tín và chất lượng hàng đầu Việt Nam.
            </p>
            <div className="mt-3 text-xs text-slate-400 dark:text-slate-500">
              <p className="font-medium">CÔNG TY TNHH MTV VÀNG BẠC NGÂN LƯỢNG</p>
              <p>Mã số thuế: 0402287923</p>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-3 sm:space-y-4">
            <h4 className="text-sm sm:text-base font-semibold">Điều hướng</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/" className="text-slate-300 dark:text-slate-400 hover:text-white transition-colors">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link
                  href="/diem-ban"
                  className="text-slate-300 dark:text-slate-400 hover:text-white transition-colors"
                >
                  Điểm bán
                </Link>
              </li>
              <li>
                <Link href="/lien-he" className="text-slate-300 dark:text-slate-400 hover:text-white transition-colors">
                  Liên hệ
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-slate-300 dark:text-slate-400 hover:text-white transition-colors">
                  Giỏ hàng
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-3 sm:space-y-4">
            <h4 className="text-sm sm:text-base font-semibold">Dịch vụ</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/" className="text-slate-300 dark:text-slate-400 hover:text-white transition-colors">
                  Mua bán bạc
                </Link>
              </li>
              <li>
                <Link href="/lien-he" className="text-slate-300 dark:text-slate-400 hover:text-white transition-colors">
                  Tư vấn đầu tư
                </Link>
              </li>
              <li>
                <Link
                  href="/gia-bac-hom-nay"
                  className="text-slate-300 dark:text-slate-400 hover:text-white transition-colors"
                >
                  Giá bạc hôm nay
                </Link>
              </li>
              <li>
                <Link
                  href="/chinh-sach/bao-hanh"
                  className="text-slate-300 dark:text-slate-400 hover:text-white transition-colors"
                >
                  Chính sách bảo hành
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div className="space-y-3 sm:space-y-4">
            <h4 className="text-sm sm:text-base font-semibold">Chính sách</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link
                  href="/chinh-sach/bao-hanh"
                  className="text-slate-300 dark:text-slate-400 hover:text-white transition-colors"
                >
                  Chính sách bảo hành
                </Link>
              </li>
              <li>
                <Link
                  href="/chinh-sach/bao-mat"
                  className="text-slate-300 dark:text-slate-400 hover:text-white transition-colors"
                >
                  Chính sách bảo mật thông tin
                </Link>
              </li>
              <li>
                <Link
                  href="/chinh-sach/xu-ly-du-lieu"
                  className="text-slate-300 dark:text-slate-400 hover:text-white transition-colors"
                >
                  Chính sách xử lý dữ liệu cá nhân
                </Link>
              </li>
              <li>
                <Link
                  href="/chinh-sach/dieu-khoan"
                  className="text-slate-300 dark:text-slate-400 hover:text-white transition-colors"
                >
                  Điều khoản sử dụng
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-3 sm:space-y-4">
            <h4 className="text-sm sm:text-base font-semibold">Liên hệ</h4>
            <div className="space-y-2 text-xs sm:text-sm">
              <div className="flex items-start space-x-2">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mt-0.5 flex-shrink-0" />
                <span className="text-slate-300 dark:text-slate-400">45 Bàu Hạc 8, Thanh Khê, Đà Nẵng</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span className="text-slate-300 dark:text-slate-400">0763 600 889</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span className="text-slate-300 dark:text-slate-400">nganluongsilver@gmail.com</span>
              </div>
              <div className="flex items-start space-x-2">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4 mt-0.5 flex-shrink-0" />
                <span className="text-slate-300 dark:text-slate-400">8:00 - 18:30 (Thứ 2 - Thứ 7), 8:00 - 17:00 (Chủ Nhật)</span>
              </div>

              {/* Social Media Icons */}
              <div>
                <div className="flex items-center space-x-3">
                  <Link
                    href="https://www.facebook.com/nganluongsilver"
                    className="text-[#1877F2] hover:text-[#4267B2] transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Link>
                  <Link href="#" className="text-[#FF0000] hover:text-[#CC0000] transition-colors" aria-label="YouTube">
                    <Youtube className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Link>
                  <Link
                    href="#"
                    className="text-[#E4405F] hover:text-[#C13584] transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Link>
                  <Link href="#" className="text-[#000000] hover:text-[#333333] transition-colors" aria-label="TikTok">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-700 dark:border-slate-600 mt-6 sm:mt-8 pt-4 sm:pt-6">
          <div className="text-center">
            <p className="text-xs sm:text-sm text-slate-400 dark:text-slate-500">
              © 2025 Ngân Lượng Silver. Tất cả quyền được bảo lưu.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
